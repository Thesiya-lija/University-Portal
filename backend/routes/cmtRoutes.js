import express from 'express';
import cmtSignin from '../controllers/committee/cmtSignin.js';
import { addEvent, editEvent, deleteEvent, getAllEvents, getEventById } from "../controllers/committee/event.js";
import { generateStudentCertificate } from "../controllers/committee/generateStudentCertificate.js";
import { authenticate, authorizeCommittee } from "../middleware/authMiddleware.js";
const cmtRoutes = express.Router();

cmtRoutes.post('/cmt-signin',cmtSignin)
cmtRoutes.get("/get-all-event", authenticate, authorizeCommittee, getAllEvents);
cmtRoutes.get("/get-eventbyid/:id", authenticate, authorizeCommittee, getEventById);
cmtRoutes.post("/add-event", authenticate, authorizeCommittee, addEvent);
cmtRoutes.put("/edit-event/:id", authenticate, authorizeCommittee, editEvent);
cmtRoutes.delete("/delete-event/:id", authenticate, authorizeCommittee, deleteEvent);
cmtRoutes.post("/certificate/:studentId/:eventId", generateStudentCertificate);

export default cmtRoutes    