import Event from "../../models/event.js";
import Student from "../../models/student.js";

export const getStudentEvents = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Fetch student details
        const student = await Student.findOne({ studentId });

        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found." });
        }

        // Normalize student interests (lowercase & trimmed)
        const studentInterests = (student.interests || []).map(interest => interest.trim());

        if (studentInterests.length === 0) {
            return res.status(200).json({ success: true, message: "No interests found for this student.", events: [] });
        }

        // Fetch matching events (case-insensitive)
        const matchingEvents = await Event.find({
            category: { $in: studentInterests }
        }).select("_id title category date venue");

        return res.status(200).json({
            success: true,
            message: "Events matching student interests fetched successfully!",
            events: matchingEvents,
        });

    } catch (error) {
        console.error("Error fetching student events:", error);
        return res.status(500).json({ success: false, message: "Server error." });
    }
};
