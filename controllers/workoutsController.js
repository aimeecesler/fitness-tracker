const express = require("express");
const router = express.Router();

const db = require("../models");

router.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
