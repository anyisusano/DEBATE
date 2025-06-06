
import mongoose from "mongoose";
const mensajeSchema = new mongoose.Schema({
  // aca definimos los campos que va a tener la base de datos
  usuario: {type:String},
  mensaje: {type:String},
  nombre: {type:String},
  
});

export default mongoose.model("experto",mensajeSchema)

// Exportamos el modelo para poder usarlo en otros archivos
mensajeSchema.statics.limpiarDebate = async function() {
  await this.deleteMany({});
};