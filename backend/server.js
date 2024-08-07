const express = require("express");
const app = express();
const cors = require("cors");
const { tempData } = require("./data");
const router = require("./routers/escalationRouter");
const connectDb = require("./db/db");
const redis = require("redis");
const PORT = 5000;

connectDb();

const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});
redisClient.connect().catch(console.error);
redisClient.on("error", (err) => console.log("Redis Client Error", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:5173",
    //origin: "http://google.com",
  })
);
app.get("/", (req, res) => {
  res.send("Hi");
});

app.use(router(redisClient));

app.listen(PORT, () => {
  console.log("Listenin");
});

process.on("SIGINT", async () => {
  await redisClient.quit();
  process.exit(0);
});
