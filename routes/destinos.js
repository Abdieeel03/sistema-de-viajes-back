import express from 'express';
import Destino from '../models/Destino.js';
const router = express.Router();

// Obtener todos
router.get('/', async (req, res) => {
  const destinos = await Destino.find();
  res.json(destinos);
});

// Crear nuevo
router.post('/', async (req, res) => {
  const nuevo = new Destino(req.body);
  await nuevo.save();
  res.json(nuevo);
});

export default router;
