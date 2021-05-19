const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  const fetchKatas = await db.kata.findAll();
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
