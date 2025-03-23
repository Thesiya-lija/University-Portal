import dotenv from "dotenv";
import mongoose from "mongoose"; // Ensure ObjectId handling
import Student from "../../models/student.js"; // Student model
import Event from "../../models/event.js"; // Event model

dotenv.config();

export const applyForEvent = async (req, res) => {
  try {
    const { studentId, eventId } = req.params;

    console.log(`🔍 Finding student with ID: ${studentId}`);
    
    // ✅ Ensure correct lookup of student (Check whether studentId is ObjectId or String)
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    console.log(`👨‍🎓 Student found: ${student.name}, Interests: ${student.interests}`);

    // ✅ Find event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }

    console.log(`📅 Event found: ${event.title}, Category: ${event.category}`);

    // ✅ Prevent duplicate applications
    if (student.events.some(e => e.eventId.toString() === eventId)) {
      return res.status(400).json({ error: "You have already applied for this event." });
    }

    // ✅ Validate Interest Matching (Ensure case sensitivity is handled)
    const normalizedInterests = student.interests.map(i => i.toLowerCase());
    const eventCategory = event.category.toLowerCase();

    if (!normalizedInterests.includes(eventCategory)) {
      return res.status(400).json({ error: "This event does not match your interests." });
    }

    console.log(`✅ Interest match confirmed!`);

    // ✅ Check if event has reached its participant limit
    if (event.participants.length >= event.participantLimit) {
      return res.status(400).json({ error: "This event has reached its participant limit." });
    }

    // ✅ Add event details to student's applied events
    student.events.push({
      eventId: event._id,
      title: event.title,
      category: event.category,
      date: event.date,
      appliedAt: new Date(),
    });

    // ✅ Store student ID in Event's `participants` array
    event.participants.push(student.studentId); // Store as studentId (String) instead of ObjectId

    // ✅ Save updates
    await student.save();
    await event.save();

    console.log(`🎉 Student ${student.name} successfully applied for event: ${event.title}`);

    res.status(200).json({
      success: true,
      message: "Successfully applied for the event!",
      appliedEvent: {
        eventId: event._id,
        title: event.title,
        category: event.category,
        date: event.date,
      },
      totalParticipants: event.participants.length,
    });

  } catch (error) {
    console.error("❌ Error applying for event:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
