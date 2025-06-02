const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const app = express();
const port = 3000;

const serviceAccount = require("./credenciales.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use(bodyParser.json());

app.post("/mq135", async (req, res) => {
  const datos = req.body;

  try {
    await db.collection("mq135").add(datos);
    console.log("✅ Datos guardados en Firestore:", datos);
    res.status(200).send("Datos recibidos y guardados");
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).send("Error al guardar los datos");
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
});
