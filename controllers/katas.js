const express = require("express");
const router = express.Router();
const db = require("../models");
const axios = require("axios");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
  const fetchKatas = await db.exercise.findAll();
  res.render("katas/index", { katas: fetchKatas });
});

router.get("/new", isLoggedIn, (req, res) => {
  db.subject
    .findAll()
    .then((subjects) => {
      res.render("katas/new", { subjects });
    })
    .catch((error) => {
      res.status(400).render("404");
    });
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
          .then((kataRefetch) => {
            const rank = kataRefetch.data.rank;
            const description = kataRefetch.data.description;
            const cw = kataRefetch.data.id;
            const name = kataRefetch.data.name;
            res.render("katas/show", {
              rank: rank,
              description: description,
              name: name,
              cw: cw,
              kata: kata,
            });
          })
          .catch((error) => res.status(400).render("404"));
      }
    });
});

router.post("/", isLoggedIn, async (req, res) => {
  const [subject, created] = await db.subject.findOrCreate({
    where: { name: req.body.subject },
  });
  const newKata = await subject.createExercise({
    name: req.body.name,
    cw: req.body.cw,
  });
  const foundUser = await db.user.findByPk(req.user.id);
  await foundUser.addExercise(newKata);
  res.redirect("/katas");
});

router.delete("/:idx", isLoggedIn, async function (req, res) {
  const deleteKata = await db.exercise.destroy({
    where: { id: req.params.idx },
  });
  res.redirect("/katas");
});

module.exports = router;
