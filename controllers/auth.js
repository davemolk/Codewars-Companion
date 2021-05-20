const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
const db = require("../models");

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.get("/logout", (req, res) => {
  req.logOut(); // logs the user out of the session
  req.flash("success", "See you next time!");
  res.redirect("/");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    successFlash: "Welcome back ...",
    failureFlash: "Please try again",
  })
);

router.post("/signup", async (req, res) => {
  // we now have access to the user info (req.body);
  const { email, name, password, codewars_username } = req.body; // goes and us access to whatever key/value inside of the object
  try {
    const [user, created] = await db.user.findOrCreate({
      where: { email },
      defaults: { name, password, codewars_username },
    });

    if (created) {
      // if created, success and we will redirect back to / page
      console.log(`----- ${user.name} was created -----`);
      const successObject = {
        successRedirect: "/",
        successFlash: `Welcome ${user.name}. Account was created.`,
      };
      //
      passport.authenticate("local", successObject)(req, res);
    } else {
      // Send back email already exists
      req.flash("error", "Account already exists");
      res.redirect("/auth/signup"); // redirect the user back to sign up page to try again
    }
  } catch (error) {
    // There was an error that came back; therefore, we just have the user try again
    console.log("**************Error");
    console.log(error);
    req.flash(
      "error",
      "Either email or password is incorrect. Please try again."
    );
    res.redirect("/auth/signup");
  }
});

module.exports = router;
