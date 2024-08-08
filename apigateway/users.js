const jwt = require("jsonwebtoken");
const JWT_SECRET = "123";

function auth(req, res, next) {
  const token = req.cookies?.token;
  console.log(token);

  if (token == null) return res.status(403).json({ message: "Auth required" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "invalid" });
    req.user = user;
    next();
  });
}

const users = [{ name: "bob", password: "123" }];

module.exports = {
  users: users,
  auth: auth,
  JWT_SECRET: JWT_SECRET,
};
