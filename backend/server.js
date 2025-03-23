import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db.js';
import adminRoutes from './routes/adminRoutes.js';
import cmtRoutes from './routes/cmtRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [process.env.FRONTEND_URL1, process.env.FRONTEND_URL2];

app.use(cors({
  origin: allowedOrigins, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/admin', adminRoutes);
app.use('/committee', cmtRoutes);
app.use('/student', studentRoutes);

app.get('/', (req, res) => {

  res.send({
    activeStatus:true,
    error:false
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
