import Student from "../../models/student.js";
import Event from "../../models/event.js";
import { generateCertificate } from "../../utils/generateCertificate.js";

export const generateStudentCertificate = async (req, res) => {
  try {
    const { studentId, eventId } = req.params;

    // 1. Fetch Student
    const student = await Student.findOne({ studentId });
    if (!student) return res.status(404).json({ error: "Student not found" });

    // 2. Fetch Event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    // 3. Validate student participated in event
    const hasParticipated = student.events.some(e => e.eventId.toString() === eventId);
    if (!hasParticipated) {
      return res.status(403).json({ error: "Student did not participate in this event" });
    }

    // 4. Generate Certificate
    const filePath = await generateCertificate(student.name, event.title);

    res.status(200).json({
      message: "Certificate generated successfully",
      file: filePath
    });

  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
