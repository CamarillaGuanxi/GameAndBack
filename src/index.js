import express from 'express';
import juegosRoutes from './routes/juegos.routes';
import userRoutes from './routes/user.routes';
import salasRoute from './routes/sala.routes';
import amigos from './routes/amigos.routes';
import tutorias from './routes/tutorias.routes';
import swaggerDocs from './swaggerDocs';


const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.use('/salas', salasRoute);
app.use('/juego', juegosRoutes);
app.use('/user', userRoutes);
app.use('/amigos', amigos);
app.use('/tutorias', tutorias);


const PORT = 10000;

app.get('/ping', (req, res) => {
  console.log('someone pinged here');
  res.send('Pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  swaggerDocs(app, PORT)
});

export function authenticateToken(req, res, next) {
  console.log("authenticating token");
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
