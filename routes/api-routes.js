const express = require("express");
const router = express.Router();

const db = require("../models");

// Find all workouts
router.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        data: null,
        message: "Failed to retrieve workouts.",
      });
    });
});
// TODO: Why is my date range not giving me all the days?
// Find all workouts within a range
router.get("/api/workouts/range", (req, res) => {
  console.log(new Date(new Date().setDate(new Date().getDate() - 7)))
  db.Workout.find({
    day: {
      '$gt': new Date(new Date().setDate(new Date().getDate() - 7)),
    },
  })
    .then((workoutsInRange) => {
      res.json(workoutsInRange);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        data: null,
        message: "Failed to retrieve workouts in range.",
      });
    });
});

// create a new workout
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((newWorkout) => {
      res.json(newWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        data: null,
        message: "Failed to add new workout.",
      });
    });
});

// add an exercise to an existing workout
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(req.params.id, {
    $push: { exercises: req.body },
  })
    .then((updatedWorkout) => {
      res.json(updatedWorkout);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        error: true,
        data: null,
        message: "Failed to update workout.",
      });
    });
});

module.exports = router;
