console.log("Server is running...");


const express = require('express');
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');


const app = express();
app.use(express.json());

app.use('/api', healthRoutes);
app.use('/api', authRoutes);




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
