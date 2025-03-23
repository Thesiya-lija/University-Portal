import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Student from "../../models/student.js"; // Student model

dotenv.config();

export const studentSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ error: "Email not found." });
    }

    // Compare password with the hashed password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password." });
    }

    // Generate JWT token with a payload containing student details
    const token = jwt.sign(
      {
        id: student._id,
        studentId: student.studentId,
        name: student.name,
        email: student.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Signin successful.",
      token,
      role: "student",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
