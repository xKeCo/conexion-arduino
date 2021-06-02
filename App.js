const admin = require("firebase-admin");
const express = require("express");
var cors = require("cors");
const serialPort = require("serialport");
const port = new serialPort("COM3", { baudRate: 9600 });
const parser = new serialPort.parsers.Readline();
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());

// //juntar todo lo leido en el puerto serial y meterlo en un stream
port.pipe(parser);
let currentValue = 0;

// //leer lo que llega por puerto serial
parser.on("data", (line) => {
  if (currentValue === 0) {
    db.collection("arduino")
      .doc("data")
      .set(
        {
          escenario: parseInt(line.trim()),
        },
        { merge: true }
      );
  }
  if (currentValue === 1) {
    db.collection("arduino")
      .doc("data")
      .set(
        {
          personaje1: parseInt(line.trim()),
        },
        { merge: true }
      );
  }
  if (currentValue === 2) {
    db.collection("arduino")
      .doc("data")
      .set(
        {
          personaje2: parseInt(line.trim()),
        },
        { merge: true }
      );
  }
  if (currentValue === 3) {
    const value = parseInt(line.trim());
    if (value === 1) {
      db.collection("arduino")
        .doc("data")
        .get()
        .then((res) => {
          const data = res.data();
          db.collection("arduino")
            .doc("data")
            .set(
              {
                movimiento: data.movimiento + 1,
              },
              { merge: true }
            );
        });
    }

    if (value === 2) {
      db.collection("arduino")
        .doc("data")
        .get()
        .then((res) => {
          const data = res.data();
          db.collection("arduino")
            .doc("data")
            .set(
              {
                movimiento: data.movimiento - 1,
              },
              { merge: true }
            );
        });
    }
  }
  console.log(line);
});

app.post("/escenario", function (req, res) {
  currentValue = 0;
  res.status(200).json({ status: 200 });
});
app.post("/personaje1", function (req, res) {
  currentValue = 1;

  res.status(200).json({ status: 200 });
});
app.post("/personaje2", function (req, res) {
  currentValue = 2;

  res.status(200).json({ status: 200 });
});
app.post("/video", function (req, res) {
  currentValue = 3;

  res.status(200).json({ status: 200 });
});

app.listen(8080);
