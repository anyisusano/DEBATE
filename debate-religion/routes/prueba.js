
// aca importamos limpiarDebate para usarlo en el boton limpiar
import { experto1, experto2, limpiarDebate, generarPDF } from "../controllers/prueba.js";

import { Router } from "express"; // Importamos Router de express
const router= new Router()
router.get("/experto1", experto1);
router.get("/experto2", experto2);
router.delete("/limpiar", limpiarDebate);//aca llamamos a la funcion limpiarDebate para que se ejecute cuando el usuario haga click en el boton limpiar
router.get("/generar-pdf", generarPDF);


export default router;
