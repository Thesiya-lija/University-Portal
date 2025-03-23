import express from 'express';
import { authenticate, authorizeAdmin, authorizeCommittee } from "../middleware/authMiddleware.js";
import {studentSignup} from '../controllers/admin/student.js'
import adminSignin from '../controllers/admin/adminSignin.js';
import {getAllEvents} from '../controllers/committee/event.js'
const adminRoutes = express.Router();


adminRoutes.post('/admin-signin', adminSignin );
adminRoutes.post('/student-signup',authenticate,authorizeAdmin, studentSignup );
adminRoutes.get("/get-all-event", authenticate, authorizeAdmin, getAllEvents);

export default adminRoutes
