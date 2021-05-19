const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  const fetchSubjects = await db.subject.findAll();
  res.render("subjects/index", { subjects: fetchSubjects });
});

router.get("/new", (req, res) => {
  res.render("subjects/new");
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  console.log(name);

  const newSubject = await db.subject.create({ name });
  console.log(newSubject);
  res.redirect("/subjects");
});

router.get("/:id", (req, res) => {
  db.subject
    .findOne({
      include: [db.exercise],
      where: { id: req.params.id },
    })
    .then((subject) => {
      res.render("subjects/show", { subject: subject });
    });
});

module.exports = router;
