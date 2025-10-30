import { Request, Response, NextFunction } from "express";
import { jwtService } from "../services/jwtService";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Token required" });
    }

    const decoded = jwtService.verifyToken(token);
    //save the user id in the request object
    (req as any).userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
