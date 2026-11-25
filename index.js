import express from 'express';
import pool from './config/conexion.js';
import 'dotenv/config'

const app=express()
const port=process.env.PORT||3000
app.use(express.json())
app.use(express.static('public'))

//tecnica 7
app.listen (port,()=>{
    console.log(`servidor en http://localhost:${port}`)
})