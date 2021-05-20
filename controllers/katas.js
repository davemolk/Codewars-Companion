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
  db.subject
    .findAll()
    .then((subjects) => {
      res.render("katas/new", { subjects });
    })
    .catch((error) => {
      res.status(400).render("404");
    });
});

// router.post("/", isLoggedIn, async (req, res) => {
//   const [subject, created] = await db.subject.findOrCreate({
//     where: { name: req.body.subject },
//   });
//   await subject
//     .createExercise({
//       name: req.body.name,
//       cw: req.body.cw,
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(400).render("404");
//     });
//   res.redirect("/katas");
// });

router.post("/", isLoggedIn, async (req, res) => {
  const { name, cw } = req.body;
  console.log(name, cw);

  const foundUser = await db.user.findByPk(req.user.id);
  const newKata = await db.exercise.create({ name, cw });
  const newAssociation = await foundUser.addExercise(newKata);
  console.log(newAssociation);
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
        console.log("here is kata round 1: ", kata);
        axios
          .get(`https://www.codewars.com/api/v1/code-challenges/${kata.cw}`)
          .then((kataRefetch) => {
            console.log("here is kata round 2: ", kata);
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

router.delete("/:idx", async function (req, res) {
  const deleteKata = await db.exercise.destroy({
    where: { id: req.params.idx },
  });
  res.redirect("/katas");
});

// *******************
// ISSUE WITH SCOPING?
// router.get("/:id", isLoggedIn, (req, res) => {
//   db.exercise
//     .findOne({
//       where: { id: req.params.id },
//       include: [db.subject],
//     })
//     .then((kata) => {
//       if (kata !== null) {
//         console.log(
//           "******************************************",
//           kata.dataValues.subjects[0]
//         );
//         console.log(kata.subjects.dataValues.name);
//         axios
//           .get(`https://www.codewars.com/api/v1/code-challenges/${kata.cw}`)
//           .then((kata) => {
//             const rank = kata.data.rank;
//             const description = kata.data.description;
//             const cw = kata.data.id;
//             const name = kata.data.name;
//             // console.log("**********", kata);
//             res.render("katas/show", {
//               rank: rank,
//               description: description,
//               name: name,
//               cw: cw,
//               kata: kata,
//             });
//           })
//           .catch((error) => res.status(400).render("404"));
//       }
//     });
// });

module.exports = router;
