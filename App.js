// const serialPort = require("serialport");

// const port = new serialPort("COM3", { baudRate: 9600 });

// const parser = new serialPort.parsers.Readline();

// //juntar todo lo leido en el puerto serial y meterlo en un stream
// port.pipe(parser);

// //leer lo que llega por puerto serial
// parser.on("data", (line) => {
//   console.log(line);
// });

const admin = require("firebase-admin");
const express = require("express");
var cors = require("cors");

const serviceAccount = require("./serviceAccountKey.json");

const app = express();
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.post("/escenario", function (req, res) {
  db.collection("arduino").doc("data").set(
    {
      escenario: "4",
    },
    { merge: true }
  );

  res.status(200).json({ status: 200 });
});
app.post("/personaje1", function (req, res) {
  db.collection("arduino").doc("data").set(
    {
      personaje1: "4",
    },
    { merge: true }
  );

  res.status(200).json({ status: 200 });
});
app.post("/personaje2", function (req, res) {
  db.collection("arduino").doc("data").set(
    {
      personaje2: "4",
    },
    { merge: true }
  );

  res.status(200).json({ status: 200 });
});
app.post("/video", function (req, res) {
  db.collection("arduino").doc("data").set(
    {
      movimiento: "4",
    },
    { merge: true }
  );

  res.status(200).json({ status: 200 });
});

app.listen(8080);
