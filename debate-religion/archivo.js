import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config.js";
import expertos from "./routes/prueba.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// fileURLToPath()Convierte la URL (file://) a una ruta de archivo normal (ej: E:\proyecto\archivo.js)
// path.dirname() obtiene el directorio del archivo actual
// __filename es la ruta completa del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para archivos estáticos (public)   falta qe nos explique el profe esto
app.use(express.static(path.join(__dirname, 'public')));

// Ruta alternativa para manejar el index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rutas API
app.use("/hola", expertos);

// aca mejor llame la ruta de .env del mongo para si cambia alla no tener que cambiar aca

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB correctamente");
  })
  .catch((error) => {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  });

// mostrar el puerto para Seguir vínculo (ctrl + clic)
app.listen(process.env.port, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${process.env.PORT}`);
});
