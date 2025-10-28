import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import usuarioRoutes from './routes/usuarios.js';
import destinoRoutes from './routes/destinos.js';
import reservaRoutes from './routes/reservas.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar:", err));

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/destinos', destinoRoutes);
app.use('/api/reservas', reservaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
