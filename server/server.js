import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRoutes.js';
import aiRouter from './routes/aiRoutes.js';
import { configureSecurity } from './middlewares/security.js';
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB but don't block the server startup
connectDB().then(() => console.log("MongoDB connection initialized")).catch(err => console.error("MongoDB failed to connect:", err));


app.use(cors());
app.use(express.json());

// Apply security configurations
configureSecurity(app);


app.get('/', (req, res) => {
  res.send('Resume Builder API is running');
});

app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
