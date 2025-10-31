import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import usuarioRoutes from "./routes/usuarios.js";
import destinoRoutes from "./routes/destinos.js";
import reservaRoutes from "./routes/reservas.js";
import uploadRoutes from "./routes/upload.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos (imágenes)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Conexión
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar:", err));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/destinos", destinoRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/upload", uploadRoutes);

// Raiz
app.get("/", (req, res) => res.send("API TravelGo funcionando"));

// Inicio
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
