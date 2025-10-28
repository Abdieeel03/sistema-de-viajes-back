import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  contraseña: String,
  rol: { type: String, default: "cliente" }
});

export default mongoose.model('Usuario', usuarioSchema);
