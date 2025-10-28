import express from 'express';
import Usuario from '../models/Usuario.js';
const router = express.Router();

router.get('/', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

router.post('/', async (req, res) => {
  const nuevo = new Usuario(req.body);
  await nuevo.save();
  res.json(nuevo);
});

export default router;
