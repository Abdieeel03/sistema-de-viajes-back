import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  idDestino: { type: mongoose.Schema.Types.ObjectId, ref: 'Destino' },
  fechaInicio: String,
  fechaFin: String,
  estado: { type: String, default: "pendiente" }
});

export default mongoose.model('Reserva', reservaSchema);
