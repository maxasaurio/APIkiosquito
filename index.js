import express from 'express'
import pool from './config/conexion.js'
import 'dotenv/config'
// //test de conexion
// pool.getConnection()

const app = express()
const port = process.env.PORT||3000
app.use(express.json())
app.use(express.static('./public'))
// app.get('/', (req, res)=>{
//     res.send('API Rest mysql')
// })

app.get('/productos', async (req, res)=>{
    const sql = 'SELECT * FROM productos'

    try{
        const connection = await pool.getConnection() //invoca a la conexion
        const [rows] = await connection.query(sql) //ejecuta la consulta
        connection.release()
        res.json(rows)
    }catch(error){
        res.status(500).send('error, no se pudo realizar la consulta1')
    }
})

app.get('/productos/:id', async (req, res)=>{
    const id = parseInt(req.params.id)
    const sql = 'SELECT * FROM productos WHERE id = ?'
    try{
        const connection = await pool.getConnection() //invoca a la conexion
        const [rows] = await connection.query(sql, [id]) //ejecuta la consulta
        connection.release()
        rows[0] ? res.json(rows[0]) : res.status(404).send('no existe')
    }catch(error){
        res.status(500).send('error, no se pudo realizar la consulta1')
    }
})
//crear nuevo registro
app.post('/productos', async (req, res)=>{
    const values = req.body
    const sql = 'INSERT INTO productos SET ?'
    try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql,[values])
        connection.release()
        res.status(201).send('registro creado')
    }catch(error){
        res.status(500).send('error del servidor')
    }
})

app.delete('/productos/:id', async (req, res)=>{
   const id = parseInt(req.params.id)
    const sql = 'DELETE FROM productos WHERE id = ?'
    try{
        const connection = await pool.getConnection() //invoca a la conexion
        const [rows] = await connection.query(sql, [id]) //ejecuta la consulta
        connection.release()
        console.log(rows)
        rows.affectedRows==0 ? res.send('no existe') : res.status(204).send()
    }catch(error){
        res.status(500).send('error, no se pudo realizar la consulta1')
    }
})
app.put('/productos/:id', async (req, res)=>{
    const id = parseInt(req.params.id)
    const values = req.body
    const sql = 'UPDATE productos SET ? WHERE id = ?' 
    try{
        const connection = await pool.getConnection() 
        const [rows] = await connection.query(sql, [values, id]) 
        connection.release()
        console.log(rows)
        rows.affectedRows==0 ? res.send('no existe') : res.status(200).send('registro actualizado')
    }catch(error){
        console.error(error);
        res.status(500).send('error, no se pudo realizar la consulta1')
    }
})
app.use((req,res)=>{
    res.status(404).send('pagina inexistente')
})

app.listen (port,()=>{
    console.log(`servidor en http://localhost: ${port} `)
})