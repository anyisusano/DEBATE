import { GoogleGenAI } from "@google/genai";
import "dotenv/config";
import experto from "../models/prueba.js";
import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';

let historial = [];
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Experto Ateo
const experto1 = async (req, res) => {
  const chat1 = ai.chats.create({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: `
Eres un filósofo ateo experto en debates sobre religión. Tu enfoque debe ser racional, escéptico y basado en evidencia empírica.

Argumenta desde:
- Evidencia científica
- Lógica formal
- Ausencia de pruebas objetivas de lo divino
- El problema del mal
- Contradicciones en textos religiosos

Mantén un tono respetuoso pero firme. Refuta las ideas religiosas con claridad lógica y datos verificables.

Límite: máximo 50 palabras por intervención.
`,
    },
    history: historial,
  });

  const response1 = await chat1.sendMessage({
    message:
      "Refuta los argumentos del teólogo católico con tus propios puntos. Sé claro, breve y fundamentado.",
  });
  await new experto({
    nombre: "Experto 1: ",
    mensaje: response1.text,
  }).save();

  res.json({ respuesta: response1.text });
};

// Experto Católico
const experto2 = async (req, res) => {
  const chat1 = ai.chats.create({
    model: "gemini-2.0-flash",
    config: {
      systemInstruction: `
Eres un teólogo católico especializado en apologética. Tu enfoque debe basarse en la fe, la razón teológica y la tradición cristiana.

Argumenta desde:
- La tradición de la Iglesia
- La Sagrada Escritura (cita versículos breves)
- La experiencia religiosa interior
- Los cinco caminos de Santo Tomás de Aquino
- Evidencia de milagros reconocidos (ej. eucarísticos)

Usa un tono caritativo y sereno. Defiende la fe con lógica teológica y profundidad espiritual.

Límite: máximo 50 palabras por intervención.
`,
    },
    history: historial,
  });

  const response2 = await chat1.sendMessage({
    message:
      "Responde con argumentos católicos al filósofo ateo. Cita brevemente la Biblia si es posible y defiende tu fe con convicción y respeto.",
  });

  await new experto({
    nombre: "Experto 2: ",
    mensaje: response2.text,
  }).save();

  res.json({ respuesta: response2.text });
};

// limpiarDebate es una función que limpia el historial de mensajes y la base de datos
const limpiarDebate = async (req, res) => {
  try {
    // Limpiar la base de datos
    await experto.deleteMany({});

    // Limpiar el historial en memoria
    historial = [];

    res.json({ mensaje: "Debate limpiado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al limpiar el debate" });
  }
};


//ESTE ES EL PDF 

const generarPDF = async (req, res) => {
  try {
    const mensajes = await experto.find().sort({ _id: 1 });

    // Configurar headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=debate.pdf');

    const doc = new PDFDocument();
    
    // Pipe directo a la respuesta
    doc.pipe(res);

    // Contenido del PDF
    doc.fontSize(20).text('Debate Ateo vs Católico', { align: 'center' });
    doc.moveDown();

    mensajes.forEach((msg) => {
      doc.fontSize(12)
         .text(`${msg.nombre}:`, { continued: true })
         .text(` ${msg.mensaje}`);
      doc.moveDown();
    });

    doc.end(); // Finalizar el PDF

  } catch (error) {
    console.error("Error al generar PDF:", error);
    res.status(500).send("Error al generar el PDF");
  }
};

export { experto1, experto2, limpiarDebate, generarPDF };
