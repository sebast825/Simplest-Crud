import { Request, Response, NextFunction } from "express";
import { jwtService } from "../services/jwtService";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.cookies.token;

    if (!authHeader) {
      return res.status(401).json({ error: "Token required" });
    }

    jwtService.verifyToken(authHeader);

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
