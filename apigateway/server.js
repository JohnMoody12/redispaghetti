const express = require("express");
const app = express();
const port = 5002;
const cors = require("cors");
const BACKEND_URL_SRS = "http://localhost:5001";
const BACKEND_URL_ESC = "http://localhost:5000";
const axios = require("axios");
const { users, auth, JWT_SECRET } = require("./users");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.name === username);
  console.log(user?.password);
  console.log(password);
  //(await bcrypt.compare(password, user.password))
  if (user && user.password == password) {
    const token = jwt.sign({ name: user.name }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 360000,
    });
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post("/api/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json({ message: "Logout successful" });
});

app.all("/:route*", auth, async (req, res) => {
  try {
    const method = req.method.toLowerCase();
    console.log(req.url);
    let url = "";
    if (req.url.split("/")[2] === "srs") {
      url = `${BACKEND_URL_SRS}${req.url}`;
    } else if (req.url.split("/")[2] === "escalations") {
      url = `${BACKEND_URL_ESC}${req.url}`;
    }

    const response = await axios({
      method: method,
      url: url,
      data: req.body,
      headers: req.headers,
    });

    res.json(response.data);
  } catch (err) {
    console.log(err.message);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log("apigateway listenin");
});

// app.post("/:route*", async (req, res) => {
//     try {
//       const method = req.method.toLowerCase();
//       console.log(req.url);
//       let url = "";
//       if (req.url.split("/")[2] === "srs") {
//         url = `${BACKEND_URL_SRS}${req.url}`;
//       } else if (req.url.split("/")[2] === "escalations") {
//         url = `${BACKEND_URL_ESC}${req.url}`;
//       }
//       console.log(url);
//       const response = await axios({
//         method: method,
//         url: url,
//         data: req.body,
//         headers: { ...req.headers, host: new URL(url).host },
//       });
//       console.log(response.data);
//       res.json(response.data);
//     } catch (err) {
//       console.log(err.message);
//       res.status(500);
//     }
//   });
