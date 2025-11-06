import { Request, Response, Router } from 'express';
const { connectDB } = require('../config/database.ts');

const router = Router();

router.get('/health-database', async (req: Request, res: Response) => {
  try {
    const pool = await connectDB();
 
    res.json({ 
      status: 'OK', 
      message: 'API and DB connected successfully',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Error connecting to the database',
      timestamp: new Date().toISOString(),
      database: 'disconnected'
    });
  }
});


router.get('/health',(req : Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'API working correctly',
    timestamp: new Date().toISOString()
  });
});

export {router as healthRoutes}; 