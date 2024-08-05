const express = require("express");
const { tempData } = require("../data");
const {
  productEscalations,
  newEscalation,
  createEscalation,
  productEscalationsMongo,
} = require("../controllers/escalationController");

const router = express.Router();

module.exports = function (redisClient) {
  router.get("/api/escalations/:productGroup", (req, res, next) => {
    req.redisClient = redisClient;
    productEscalationsMongo(req, res, next);
  });

  router.post("/api/escalations/:productGroup/new", (req, res, next) => {
    req.redisClient = redisClient;
    createEscalation(req, res, next);
  });
  return router;
};
