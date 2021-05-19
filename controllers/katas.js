const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  const fetchKatas = await db.kata.findAll(); // do something here
  console.log("here is fetchKatas: ", fetchKatas);
  fetchKatas.forEach((n) => (n.dataValues["color"] = "green"));
  console.log("revised *******", fetchKatas);
  res.render("katas/index", { katas: fetchKatas });
});

router.get("/new", (req, res) => {
  res.render("katas/new");
});

router.post("/", async (req, res) => {
  const { name, cw } = req.body;
  console.log(name, cw);

  const newKata = await db.kata.create({ name, cw });
  console.log(newKata);
  res.redirect("/katas");
});

module.exports = router;
