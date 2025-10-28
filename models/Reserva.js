import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  idDestino: { type: mongoose.Schema.Types.ObjectId, ref: 'Destino', required: true },
  cantidadPersonas: { type: Number, required: true, min: 1 },
  contacto: {
    nombre: { type: String, required: true },
    telefono: String,
    email: String
  },
  fechaReserva: { type: Date, default: Date.now },
  total: Number,
  estado: { type: String, default: "pendiente" } // pendiente, confirmado, cancelado
}, { timestamps: true });

export default mongoose.model('Reserva', reservaSchema);

