import mongoose from 'mongoose';

const destinoSchema = new mongoose.Schema({
  nombre: String,
  pais: String,
  descripcion: String,
  precio: Number,
  imagen: String
});

export default mongoose.model('Destino', destinoSchema);
