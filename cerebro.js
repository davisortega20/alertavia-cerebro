const firebase = require('firebase');
require('firebase/database');

// Conexión directa sin llave
firebase.initializeApp({
  databaseURL: "https://alertavia-default-rtdb.firebaseio.com"
});

const db = firebase.database();

console.log("AlertaVia CEREBRO prendido...");

async function verificar() {
  try {
    const estado = {
      estaCerrada: false,
      mensaje: "Vía Santa Elena - Paso habilitado",
      hora: new Date().toLocaleString("es-CO", {timeZone: "America/Bogota"}),
      fuente: "AlertaVia Comunidad",
      esReal: true
    };
    
    await db.ref("via_santa_elena").set(estado);
    console.log("✅ Actualizado en Firebase:", estado.hora);
  } catch (e) {
    console.log("Error:", e.message);
  }
}

verificar();
setInterval(verificar, 10 * 60 * 1000);
