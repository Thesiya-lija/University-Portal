import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../models/student.js";

dotenv.config();

// ✅ Authenticate User
export const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = verified; // Attach user data to request
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// ✅ Authorize Only Committee Member
export const authorizeCommittee = (req, res, next) => {
  if (req.user.email !== process.env.CMTEMAIL) {
    return res.status(403).json({ error: "Unauthorized - Only the committee member can perform this action" });
  }
  next();
};


  // ✅ Authorize Only Committee Member
  export const authorizeAdmin = (req, res, next) => {
    if (req.user.email !== process.env.ADMINEMAIL) {
      return res.status(403).json({ error: "Unauthorized - Only the Admin member can perform this action" });
    }
    next();
  };



  export const authorizeStudent = async (req, res, next) => {
    try {
      // Extract token from Authorization header
      const token = req.header("Authorization")?.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
      }
  
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Find student in database
      const student = await Student.findById(decoded.id).select("-password"); // Exclude password for security
  
      if (!student) {
        return res.status(404).json({ error: "Student not found." });
      }
  
      // Attach student data to request object
      req.user = student;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid or expired token." });
    }
  };
