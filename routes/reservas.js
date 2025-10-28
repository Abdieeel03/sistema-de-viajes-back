import express from 'express';
import Reserva from '../models/Reserva.js';
const router = express.Router();

// Obtener todas las reservas
router.get('/', async (req, res) => {
  const reservas = await Reserva.find().populate('idUsuario idDestino');
  res.json(reservas);
});

// Crear una reserva
router.post('/', async (req, res) => {
  const nueva = new Reserva(req.body);
  await nueva.save();
  res.json(nueva);
});

export default router;
