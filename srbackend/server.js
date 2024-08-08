const express = require("express");
const app = express();
const port = 5001;
const cors = require("cors");

let data = [
  { name: "pxi sr srbackend", body: "this is a pxi question srbackend" },
  { name: "daqmx sr srbackend", body: "this is a daqmx question srbackend" },
  { name: "smu sr srbackend", body: "this is a smu question srbackend" },
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    //origin: "http://google.com",
  })
);
app.get("/api/srs", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log("srsbackend listenin");
});
