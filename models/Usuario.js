import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true }, // hashed
  rol: { type: String, enum: ['cliente','admin'], default: 'cliente' }
}, { timestamps: true });

export default mongoose.model('Usuario', usuarioSchema);
