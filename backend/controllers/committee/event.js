import dotenv from "dotenv";
import Event from "../../models/event.js";

dotenv.config();

// ✅ Create Event
export const addEvent = async (req, res) => {
    try {
      if (req.user.email !== process.env.CMTEMAIL) {
        return res.status(403).json({ error: "Only the committee member can create events" });
      }
  
      const { title, description, date, time, venue, category, participantLimit, rules, registrationFee } = req.body;
  
      if (!title || !description || !date || !time || !venue || !category || !participantLimit || !rules || !registrationFee) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newEvent = new Event({
        title,
        description,
        date,
        time,
        venue,
        category,
        participantLimit,
        rules,
        registrationFee,
        participantsCount: 0, // ✅ Initially, no participants
      });
  
      await newEvent.save();
      res.status(201).json({ message: "Event created successfully", event: newEvent });
  
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  };
  

// ✅ Edit Event
export const editEvent = async (req, res) => {
    try {
      if (req.user.email !== process.env.CMTEMAIL) {
        return res.status(403).json({ error: "Only the committee member can edit events" });
      }
  
      const { id } = req.params;
      const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedEvent) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      res.json({ message: "Event updated successfully", event: updatedEvent });
  
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  };
  

// ✅ Delete Event
export const deleteEvent = async (req, res) => {
    try {
      if (req.user.email !== process.env.CMTEMAIL) {
        return res.status(403).json({ error: "Only the committee member can delete events" });
      }
  
      const { id } = req.params;
      const deletedEvent = await Event.findByIdAndDelete(id);
  
      if (!deletedEvent) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      res.json({ message: "Event deleted successfully" });
  
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  };
  
  export const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find();
      res.json({ events });
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  };
  


  export const getEventById = async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findById(id);
  
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      res.json({ event });
  
    } catch (error) {
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  };
  