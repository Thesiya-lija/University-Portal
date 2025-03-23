import bcrypt from "bcryptjs";
import Student from "../../models/student.js";
import dotenv from "dotenv";

export const studentProfile = async (req, res) => {
    const { studentId } = req.params;
    let { interests } = req.body;

    try {
        // Ensure interests is a valid array
        let interestsArray = [];
        if (interests) {
            try {
                interestsArray = typeof interests === "string" ? JSON.parse(interests) : interests;
                if (!Array.isArray(interestsArray)) throw new Error("Invalid interests format");
            } catch (err) {
                return res.status(400).json({ success: false, message: "Invalid interests format" });
            }
        }

        // Find and update the student
        const updatedStudent = await Student.findOneAndUpdate(
            { studentId }, // Use correct field
            { $set: { interests: interestsArray } },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found." });
        }

        res.status(200).json({
            success: true,
            message: "Student profile updated successfully!",
            student: updatedStudent,
        });
    } catch (error) {
        console.error("Error updating student profile:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};


  export const getStudentDetails = async (req, res) => {
    try {
        const studentId = req.params.id;  // "S003"

        // Find student by studentId instead of _id
        const student = await Student.findOne({ studentId: studentId });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error("Error fetching student details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
