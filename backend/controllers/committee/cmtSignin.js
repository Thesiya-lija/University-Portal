import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const cmtSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email !== process.env.CMTEMAIL) {
      return res.status(401).json({ error: "Invalid email address" });
    }

    if (password !== process.env.CMTPASSWORD) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ email, role: "committee" }, process.env.JWT_SECRET, { expiresIn: "2h" });

    return res.json({ message: "Committee member logged in successfully", token , role: "committee" });

  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default cmtSignin;
