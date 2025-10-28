import mongoose from 'mongoose';

const destinoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  pais: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  imagen: String,
  tipo: { type: String, enum: ['aventura','playa','cultural','familiar'], required: true },
  fecha: String,       // formato simple: "2025-12-01" (string)
  duracion: Number     // cantidad de dias
}, { timestamps: true });

export default mongoose.model('Destino', destinoSchema);
