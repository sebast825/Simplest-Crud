import { Request, Response } from "express";


export const asyncHandler = (fn: (req: Request, res: Response) => Promise<void>) => {

    return async (req: Request, res: Response) => {
      try {

        await fn(req, res);
      } catch (error: any) {

        console.log("Error: ", error);
        const statusCode = error.statusCode || 500;
        
        if (statusCode >= 500) {
          res.status(500).json({ error: "Internal server Error" });
        } else {
          res.status(statusCode).json({ error: error.message });
        }
      }
    };
  };