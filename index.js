const express = require('express')
const Contenedor = require('./contenedor.js')

const app = express()
const productos = new Contenedor('productos')

app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor express')
})

app.get('/productos', async (req, res) => {
    try {
        const listaDeProductos = await productos.getAll()
        if(listaDeProductos === 'Archivo no encontrado') throw new Error('Datos no disponibles')
        if(listaDeProductos.length === 0) res.send({ mensaje: 'No hay productos disponibles' })
        res.send(listaDeProductos)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

app.get('/productoRandom', async (req, res) => {
    try {
        const listaDeProductos = await productos.getAll()
        if(listaDeProductos === 'Archivo no encontrado') throw new Error('Datos no disponibles')
        if(listaDeProductos.length === 0) res.send({ mensaje: 'No hay productos disponibles' })
        const randomIndex = Math.floor(Math.random() * listaDeProductos.length)
        res.send(listaDeProductos[randomIndex])
    } catch (err) {
        res.status(500).send(err.message)
    }
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error del servidor: ${error}`))