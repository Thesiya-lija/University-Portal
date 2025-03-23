import bcrypt from "bcryptjs";
import Student from "../../models/student.js";
import dotenv from "dotenv";

dotenv.config();

export const studentSignup = async (req, res) => {
  try {
    // ✅ Extract Only Allowed Fields
    const { studentId, name, email, password } = req.body;

    // ❌ Reject if Any Required Field is Missing
    if (!studentId || !name || !email || !password) {
      return res.status(400).json({ success: false, message: "Only studentId, name, email, and password are required." });
    }

    // ❌ Reject if Extra Fields Are Present
    const allowedKeys = ["studentId", "name", "email", "password"];
    const requestKeys = Object.keys(req.body);
    const extraFields = requestKeys.filter(key => !allowedKeys.includes(key));

    if (extraFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Invalid fields provided: ${extraFields.join(", ")}` 
      });
    }

    // ✅ Check if studentId OR email already exists
    const existingStudent = await Student.findOne({
      $or: [{ studentId }, { email }]
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: existingStudent.studentId === studentId
          ? "Student ID already exists!"
          : "Email already exists!"
      });
    }

    // ✅ Hash Password Before Saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create and Save Student (Preventing Extra Fields)
    const student = new Student({
      studentId,
      name,
      email,
      password: hashedPassword
    });

    await student.save();

    res.status(201).json({ success: true, message: "Student registered successfully!" });

  } catch (error) {
    console.error("Error registering student:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};






