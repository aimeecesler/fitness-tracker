const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  totalDuration: {
    type: Number,
    default: 0
  },
  exercises: [
    {
      type: {
        type: String,
        trim: false,
        required: "Type is required.",
      },
      name: {
        type: String,
        trim: false,
        required: "Name is required.",
      },
      duration: {
        type: Number,
        required: false,
      },
      weight: {
        type: Number,
        required: false,
      },
      distance: {
        type: Number,
        required: false,
      },
      reps: {
        type: Number,
        required: false,
      },
      sets: {
        type: Number,
        required: false,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
