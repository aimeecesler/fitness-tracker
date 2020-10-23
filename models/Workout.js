const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
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
}, { toJSON: { virtuals: true } }
);
WorkoutSchema.virtual("totalDuration").get(function () {
  // let sumOfDurations = 0;
  // for (let i = 0; i < this.exercises.length; i++){
  //   sumOfDurations = sumOfDurations + this.exercises[i].duration;
  // }
  // return sumOfDurations;
  return this.exercises.reduce((totalDuration, exercise) => {
    return totalDuration + exercise.duration;
  }, 0);
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
