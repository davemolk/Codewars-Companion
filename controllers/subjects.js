const express = require("express");
const router = express.Router();
const db = require("../models");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, async (req, res) => {
  const fetchSubjects = await db.subject.findAll();
  res.render("subjects/index", { subjects: fetchSubjects });
});

router.get("/new", isLoggedIn, (req, res) => {
  res.render("subjects/new");
});

router.post("/", isLoggedIn, async (req, res) => {
  const { name } = req.body;
  console.log(name);

  const newSubject = await db.subject.create({ name });
  console.log(newSubject);
  res.redirect("/subjects");
});

router.get("/:id", isLoggedIn, (req, res) => {
  db.subject
    .findOne({
      where: { id: req.params.id },
      include: [db.exercise],
    })
    .then((subject) => {
      res.render("subjects/show", { subject });
    })
    .catch((error) => res.status(400).redirect("404"));
});

router.delete("/:id", isLoggedIn, (req, res) => {
  db.subjectsKatas
    .destroy({
      where: { subjectId: req.params.id },
    })
    .then((response) => {
      db.subject
        .destroy({
          where: { id: req.params.id },
        })
        .then((response) => {
          res.redirect("/subjects");
        })
        .catch((err) => {
          console.log(err);
          res.render("main/404");
        });
    })
    .catch((err) => {
      console.log(err);
      res.render("main/404");
    });
});

module.exports = router;
