import express from 'express';
import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const SALT_ROUNDS = 10;

// Registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password) return res.status(400).json({ message: 'Faltan datos' });

    const exists = await Usuario.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email ya registrado' });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const nuevo = new Usuario({ nombre, email, password: hash, rol: rol || 'cliente' });
    await nuevo.save();

    const userSafe = { _id: nuevo._id, nombre: nuevo.nombre, email: nuevo.email, rol: nuevo.rol };
    res.status(201).json(userSafe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Faltan datos' });

    const user = await Usuario.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Credenciales inválidas' });

    const userSafe = { _id: user._id, nombre: user.nombre, email: user.email, rol: user.rol };
    res.json(userSafe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error servidor' });
  }
});

export default router;
