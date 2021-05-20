const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
  const fetchKatas = await db.exercise.findAll(); // do something here
  res.render("katas/index", { katas: fetchKatas });
});

router.get("/new", isLoggedIn, (req, res) => {
  db.subject.findAll().then((subjects) => {
    res.render("katas/new", { subjects });
  });
});

router.post("/", isLoggedIn, async (req, res) => {
  const { name, cw } = req.body;
  console.log(name, cw);

  const newKata = await db.exercise.create({ name, cw });
  console.log(newKata);
  res.redirect("/katas");
});

router.get("/:id", isLoggedIn, (req, res) => {
  db.exercise
    .findOne({
      where: { id: req.params.id },
      include: [db.subject],
    })
    .then((kata) => {
      if (kata !== null) {
        axios
          .get(`https://www.codewars.com/api/v1/code-challenges/${kata.cw}`)
          .then((kata) => {
            const rank = kata.data.rank;
            console.log("rank is: ", rank);
            const description = kata.data.description;
            const cw = kata.data.id;
            const name = kata.data.name;
            res.render("katas/show", {
              rank: rank,
              description: description,
              name: name,
              cw: cw,
            });
          })
          .catch((error) => res.status(400).render("404"));
      }
    });
});

module.exports = router;
