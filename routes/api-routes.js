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

// Find all workouts within a range (7)
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .limit(7)
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
  const exercise = req.body;
  console.log(exercise);
  // ADDING INPUT VALIDATION HERE SINCE FRONT END DOESN'T HAVE ANY FOR BLANK EXERCISES
  if (
    exercise.type === "resistance" &&
    (exercise.name === "" ||
      exercise.weight === 0 ||
      exercise.sets === 0 ||
      exercise.reps === 0 ||
      exercise.duration === 0)
  ) {
    console.log("Failed to update workout. Input fields cannot be empty.");
    res.json({
      error: true,
      data: null,
      message: "Failed to update workout. Input fields cannot be empty.",
    });
  } else if (
    exercise.type === "cardio" &&
    (exercise.name === "" || 
    exercise.distance === 0 || 
    exercise.duration === 0)
  ) {
    console.log("Failed to update workout. Input fields cannot be empty.");
    res.json({
      error: true,
      data: null,
      message: "Failed to update workout. Input fields cannot be empty.",
    });
  } else {
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
  }
});

module.exports = router;
