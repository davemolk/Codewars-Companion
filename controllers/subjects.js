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
      where: { id: req.params.id },
      include: [db.exercise],
    })
    .then((subject) => {
      console.log("***********************************");
      console.log("here is subject", subject);
      res.render("subjects/show", { subject });
    })
    .catch((error) => res.status(400).redirect("404"));
});

module.exports = router;
