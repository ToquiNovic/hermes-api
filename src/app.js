// src/app.js
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { BACKEND_PORT } from './config/index.js';
import routes from './routes/index.js';
import { sequelize } from './database.js'; // Importa sequelize correctamente

const port = BACKEND_PORT || 3000;
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// database initialization
async function initializeDatabase() {
  try {
    await sequelize.authenticate(); // Verifica la conexión a la base de datos
    console.log('Database connected successfully.');
    await sequelize.sync({ alter: true }); // Usa { force: true } para reiniciar la BD (cuidado en producción)
    console.log('Database synced.');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

initializeDatabase(); // Llama a la función para inicializar la BD

// routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/api', routes);

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
