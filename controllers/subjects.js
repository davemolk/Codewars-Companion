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

router.get("/:id", isLoggedIn, (req, res) => {
  db.subject
    .findOne({
      where: { id: req.params.id },
      include: [db.exercise],
    })
    .then((subject) => {
      res.render("subjects/show", { subject });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).redirect("404");
    });
});

router.get("/edit/:id", isLoggedIn, async (req, res) => {
  const subjectEdit = await db.subject.findOne({
    where: { id: req.params.id },
  });
  res.render("subjects/edit", { subject: subjectEdit });
});

router.post("/", isLoggedIn, async (req, res) => {
  const { name } = req.body;
  const newSubject = await db.subject.create({ name });
  res.redirect("/subjects");
});

router.put("/edit/:idx", isLoggedIn, async (req, res) => {
  try {
    const subjectEdit = await db.subject.findOne({
      where: { id: req.params.idx },
    });
    const updatedSubject = await subjectEdit.update({
      name: req.body.name,
    });
    res.redirect(`/subjects/${req.params.idx}`);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:idx", isLoggedIn, async function (req, res) {
  const deleteSubject = await db.subject.destroy({
    where: { id: req.params.idx },
  });
  res.redirect("/subjects");
});

module.exports = router;
