import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const adminSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Check if email exists
    if (email !== process.env.ADMINEMAIL) {
      return res.status(401).json({ error: "Invalid email address" });
    }

    // ✅ Check if password is correct
    if (password !== process.env.ADMINPASSWORD) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "2h" });

    return res.json({ message: "Admin member logged in successfully", token , role: "admin" });

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default adminSignin;
