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
    .catch((error) => res.status(400).redirect("404"));
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

// router.post("/bykata", isLoggedIn, async (req, res) => {
//   try {

//   }
//   // const [subject, created] = await db.subject.findOrCreate({
//   //   where: { name: req.body.subject },
//   // }); // put in subjects controller

//   // router.post("/", isLoggedIn, async (req, res) => {
//   //   const [subject, created] = await db.subject.findOrCreate({
//   //     where: { name: req.body.subject },
//   //   });
//   //   const newKata = await subject.createExercise({
//   //     name: req.body.name,
//   //     cw: req.body.cw,
//   //   });
//   //   const foundUser = await db.user.findByPk(req.user.id);
//   //   await foundUser.addExercise(newKata);
//   //   res.redirect("/katas");
//   // });

//   // router.post("/", isLoggedIn, async (req, res) => {
//   //   const { name, cw, subject } = req.body;
//   //   console.log("subject is ", subject);

//   //   const foundSubject = await db.subject.findOne({ where: { name: subject } });
//   //   console.log("found subject: ", foundSubject);
//   //   const foundUser = await db.user.findByPk(req.user.id);
//   //   console.log("found user: ", foundUser);
//   //   const newKata = await db.exercise.create({ name, cw });
//   //   const newAssociation = await foundUser.addExercise(newKata);
//   //   newKata.addSubject(foundSubject);
//   //   // console.log("new association is ", newAssociation);
//   //   res.redirect("/katas");
//   // });

// });

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
