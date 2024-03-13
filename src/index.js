import express from 'express';
import plantaRoutes from './routes/planta.routes';
import userRoutes from './routes/user.routes'
import productosRoutes from './routes/productos.routes'
import favRoutes from './routes/fav.routes'
import agruapcionesRoutes from './routes/agrupaciones.routes'
import foroRoutes from './routes/foro.routes'
import publicacionRoutes from './routes/publicacion.routes'

const jwt = require('jsonwebtoken');
const app = express()

app.use(express.json())
app.use('/planta', plantaRoutes);
app.use('/user', userRoutes);
app.use('/productos', productosRoutes)
app.use('/fav', favRoutes)
app.use('/agrupaciones', agruapcionesRoutes)
app.use('/foro', foroRoutes)
app.use('/publicacion', publicacionRoutes)

const PORT = 10000

app.get('/ping', (req, res) => {
    console.log('someone pinged here')
    res.send('Pong')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export function authenticateToken(req, res, next) {
    console.log("authenticating token")
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}