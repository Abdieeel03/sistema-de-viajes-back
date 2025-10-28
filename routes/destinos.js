import express from 'express';
import Destino from '../models/Destino.js';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// Obtener todos (lista pública)
router.get('/', async (req, res) => {
  const destinos = await Destino.find();
  res.json(destinos);
});

// Crear destino (sólo admin) -- simple verificación por userId en body
router.post('/', async (req, res) => {
  try {
    const { userId, ...destinoData } = req.body;
    if (!userId) return res.status(401).json({ message: 'userId requerido para verificar admin' });

    const user = await Usuario.findById(userId);
    if (!user || user.rol !== 'admin') return res.status(403).json({ message: 'Requiere rol admin' });

    const nuevo = new Destino(destinoData);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear destino' });
  }
});

export default router;
