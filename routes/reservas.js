import express from "express";
import Reserva from "../models/Reserva.js";
import Destino from "../models/Destino.js";
import Usuario from "../models/Usuario.js";

const router = express.Router();

// Obtener todas las reservas (opcional: para admin) -> query ?userId=...
router.get("/", async (req, res) => {
  const { userId } = req.query;
  let query = {};
  if (userId) query.idUsuario = userId;
  const reservas = await Reserva.find(query).populate([{ path: "idUsuario", select: "nombre email rol" }, { path: "idDestino" }]);
  res.json(reservas);
});

// Crear reserva
router.post("/", async (req, res) => {
  try {
    const { idUsuario, idDestino, cantidadPersonas, contacto } = req.body;
    if (!idUsuario || !idDestino || !cantidadPersonas || !contacto || !contacto.nombre) {
      return res.status(400).json({ message: "Faltan datos para crear la reserva" });
    }

    const user = await Usuario.findById(idUsuario);
    const destino = await Destino.findById(idDestino);
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });
    if (!destino) return res.status(400).json({ message: "Destino no encontrado" });

    // Calcular total simple: precio * cantidadPersonas
    const total = (destino.precio || 0) * Number(cantidadPersonas);

    const nueva = new Reserva({
      idUsuario,
      idDestino,
      cantidadPersonas,
      contacto,
      total,
      estado: "pendiente",
    });

    await nueva.save();
    const reservaPop = await nueva.populate([{ path: "idUsuario", select: "nombre email" }, { path: "idDestino" }]);
    res.status(201).json(reservaPop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear reserva" });
  }
});

// Actualizar estado de una reserva (admin)
router.patch("/:id/estado", async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado || !["pendiente", "confirmado", "cancelado"].includes(estado)) {
      return res.status(400).json({ message: "Estado inválido" });
    }

    const reserva = await Reserva.findByIdAndUpdate(id, { estado }, { new: true }).populate([{ path: "idUsuario", select: "nombre email" }, { path: "idDestino" }]);

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    res.json(reserva);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar estado" });
  }
});

export default router;
