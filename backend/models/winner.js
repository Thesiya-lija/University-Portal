import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventTitle: { type: String, required: true },
  position: { type: String, required: true, enum: ["1st", "2nd", "3rd"] },
  prize: { type: String, required: true },
  points: { type: Number, default: 0 },
  issuedAt: { type: Date, default: Date.now }
});

const Winner = mongoose.model("Winner", winnerSchema, "winners");
export default Winner;
