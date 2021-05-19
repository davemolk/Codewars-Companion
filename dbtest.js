const db = require("./models");

// async function createUser() {
//   const newUser = await db.user.create({
//     name: "Dave",
//     email: "dave@gmail.com",
//     password: "test12345",
//     codewars_username: "davemolk",
//   });
//   console.log(newUser);
// }
// createUser();

async function createSubject() {
  const newSubject = await db.subject.create({
    name: "arrays",
  });
}

// createSubject();

async function createKata() {
  const newKata = await db.exercise.create({
    name: "Sum of Cubes",
    cw: "59a8570b570190d313000037",
    // userId: 1,
  });
}
// createKata();

// async function createKata() {
//   const newKata = await db.kata.create({
//     name: "Evens times last",
//     cw: "5a1a9e5032b8b98477000004",
//     userId: 1,
//   });
// }
// createKata();

// const fetchAllKatas = () => {
//   db.kata.findAll().then((kata) => console.log(kata));
// };

// fetchAllKatas();

// const fetchAllSubjects = () => {
//   db.subject.findAll().then((subject) => console.log(subject));
// };
// fetchAllSubjects();

// DOES NOT WORK
// const addSubjectToKata = () => {
//   db.kata
//     .findOne({
//       where: { name: "Sum of Cubes" },
//     })
//     .then((k) => {
//       k.createSubject({
//         name: "arrays",
//       }).then((newSub) => {
//         console.log(newSub);
//       });
//     });
// };

// addSubjectToKata();

async function addKataToSubject() {
  //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
  const sum = await db.exercise.findOne({
    where: { name: "Sum of Cubes" },
  });
  const algo = await db.subject.create({
    name: "strings",
  });
  //   algo.addKata(sum);
  const relationInfo = await algo.addExercise(sum);
  console.log(relationInfo);
}

addKataToSubject();
