import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentId:{
        type:String
    },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  interests: {
    type: [String],  
    default: [],
  },
  events: [
    {
      eventId: mongoose.Schema.Types.ObjectId,
      title: String,
      category: String,
      date: Date,
      appliedAt: { type: Date, default: Date.now }
    }
  ],

}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema,'Student');
export default Student;
