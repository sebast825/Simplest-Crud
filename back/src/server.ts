const express = require('express');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']

}));


app.use('/api', healthRoutes);
app.use('/api', authRoutes);




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
