// import mongoose from "mongoose";

// const eventSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   date: { type: Date, required: true },
//   time: { type: String, required: true }, // e.g., "10:00 AM - 12:00 PM"
//   venue: { type: String, required: true },
//   category: {
//     type: String,
//     required: true,
//     enum: ["Chess", "Basketball", "Swimming", "Athletics", "Cricket", "Badminton", "Table Tennis", "Hackathon"],
//   },
//   participantLimit: { type: Number, required: true },
//   participantsCount: { type: Number, default: 0 }, // ✅ Tracks registered participants
//   rules: { type: [String], required: true },
//   registrationFee: { type: Number, required: true },
// }, { timestamps: true });

// const Event = mongoose.model("Event", eventSchema);
// export default Event;




import mongoose from "mongoose";

const allowedCategories = [
  "Chess", "Basketball", "Swimming", "Athletics", 
  "Cricket", "Badminton", "Table Tennis", "Hackathon"
];

const eventSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String, required: [true, "Description is required"] },
  date: { type: Date, required: [true, "Date is required"] },
  time: { type: String, required: [true, "Time is required"] },
  venue: { type: String, required: [true, "Venue is required"] },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: allowedCategories,
      message: "Invalid category. Allowed categories: Chess, Basketball, Swimming, Athletics, Cricket, Badminton, Table Tennis, Hackathon",
    }
  },
  participantLimit: { 
    type: Number, 
    required: [true, "Participant limit is required"], 
    min: [1, "At least 1 participant is required"]
  },
  participants: [{ type: String }],
  rules: { 
    type: [String], 
    required: [true, "Rules are required"],
    validate: {
      validator: (value) => value.length > 0,
      message: "At least one rule is required"
    }
  },
  registrationFee: { 
    type: Number, 
    required: [true, "Registration fee is required"], 
    min: [0, "Registration fee cannot be negative"]
  }
}, { timestamps: true });

const Event = mongoose.model("Events", eventSchema, "Events");
export default Event;
