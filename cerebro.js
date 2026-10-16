const admin = require("firebase-admin");
const serviceAccount = require("./llave.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`
});

const db = admin.database();
console.log("🧠 Cerebro encendido! Proyecto:", serviceAccount.project_id);
console.log("Conectando a Firebase...");

async function revisarVias() {
  const ahora = new Date().toLocaleString('es-CO', {timeZone: 'America/Bogota'});
  console.log("\n[" + ahora + "] Revisando via...");
  const datos = {
    estaCerrada: false,
    mensaje: "Via habilitada, paso normal - Sistema AlertaVia funcionando!",
    hora: ahora,
    fuente: "Sistema Automatico AlertaVia",
    confianza: "PRUEBA EXITOSA",
    votos: 0
  };
  try {
    await db.ref("via_santa_elena").set(datos);
    console.log("✅ ¡Firebase actualizado! Tu app ya debe decir VIA ABIERTA");
  } catch (err) {
    console.log("❌ Error:", err.message);
    console.log("OJO: Tienes que crear la base de datos en Firebase");
  }
}

revisarVias();
setInterval(revisarVias, 3*60*1000);
console.log("Deja esta ventana abierta. Revisara cada 3 minutos.");
