import mysql from 'mysql2/promise'
const pool=mysql.createPoll({
        host: process.env.MYSQL_ADDON_HOST||'localhost',
        user: process.env. MYSQL_ADDON_USER||'root',
        password: process.env.MYSQL_ADDON_PASSWORD||'',
        database: process.env.MYSQL_ADDON_DB||'crud',
        //MYSQL_ADDON_PORT
    
    conectionLimit:5
})
pool.getConection()
.then(Conection=>{
    console.log('conectados :D')
    conection.release() //libera la conexion
})
.catch(error=>{
    console.log('error de conexion',error)
})
export default pool