const ateo=(async ()=>{
    let perro= await fetch ('hola/experto1') 
    let gato= await perro.json()
    document.getElementById ("chat-box").innerHTML+=`<h2>${gato.respuesta}</h2>`
})
document.getElementById ("ati").addEventListener("click",async()=>{
   await ateo()
})

const cristiano=(async ()=>{
    let perro= await fetch ('hola/experto2') 
    let gato= await perro.json()
    document.getElementById ("chat-box").innerHTML+=`<h2>${gato.respuesta}</h2>`
})
document.getElementById ("cati").addEventListener("click",async()=>{
   await cristiano()
})



// funcion para limpiar el debate
// Se define la función limpiarTodo que se encargará de limpiar el debate
const limpiarTodo = async () => {
  try {
    const response = await fetch('http://localhost:4000/hola/limpiar', {
      method: 'DELETE'
    });
    const data = await response.json();
    console.log(data.mensaje);
    document.getElementById("chat-box").innerHTML = '';
  } catch (error) {
    console.error("Error al limpiar:", error);
  }
};

// Se agrega un evento al botón "limpiar" para que al hacer clic se ejecute la función limpiarTodo
document.getElementById("limpiar").addEventListener("click", limpiarTodo);


const descargarPDF = async () => {
  try {
    // Abrir en nueva pestaña para forzar la descarga
    window.open('http://localhost:4000/hola/generar-pdf', '_blank');
    
    // Alternativa usando fetch (solo si necesitas procesamiento adicional)
    /*
    const response = await fetch('http://localhost:4000/hola/generar-pdf');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'debate.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
    */
  } catch (error) {
    console.error("Error al descargar PDF:", error);
    alert("Error al descargar el PDF");
  }
};

document.getElementById("descargar").addEventListener("click", descargarPDF);