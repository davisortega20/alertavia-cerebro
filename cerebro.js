const firebase = require('firebase');
require('firebase/database');
const http = require('http');

// ESTO ES LO QUE LE FALTA PARA QUE RENDER NO LO APAGUE
const PORT = process.env.PORT || 10000;
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('AlertaVia CEREBRO 24/7 ONLINE - Ultima actualizacion: ' + new Date().toLocaleString("es-CO"));
}).listen(PORT, () => {
  console.log("Servidor web escuchando en puerto " + PORT);
});

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
  } catch(e){ console.log(e.message); }
}

verificar();
setInterval(verificar, 10 * 60 * 1000);
