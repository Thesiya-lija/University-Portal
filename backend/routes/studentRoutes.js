
import multer from 'multer';

import express from 'express';
import {studentProfile,getStudentDetails} from '../controllers/student/studentProfile.js'
import {studentSignin} from '../controllers/student/studentSignin.js'
import { applyForEvent } from '../controllers/student/applyEvent.js';
import { authenticate, authorizeStudent } from "../middleware/authMiddleware.js";
import {getStudentEvents} from '../controllers/student/displayEvent.js'
const studentRoutes = express.Router();

const upload = multer({ dest: 'uploads/' });
studentRoutes.get('/event-details/:studentId', authenticate, authorizeStudent, getStudentEvents);
studentRoutes.get('/fetch-student/:id',authenticate,authorizeStudent,getStudentDetails )
studentRoutes.put('/student-profile/:studentId',authenticate, authorizeStudent, upload.single('participationHistory'),studentProfile);
studentRoutes.post('/student-signin', studentSignin);
studentRoutes.post('/apply-event/:studentId/:eventId',authenticate, authorizeStudent,applyForEvent)
export default studentRoutes
