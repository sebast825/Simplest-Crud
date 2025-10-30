import { Request, Response } from "express";
import { AuthRequestDto } from "../dto/auth/authRequestDto.types";
import UserService from "../services/userService";

class AuthController {
  constructor(
    private userService: UserService,
  ) {}
   login = async(req: Request, res: Response): Promise<void> =>{
    try {
      const loginData: AuthRequestDto = req.body;
      if (!loginData || !loginData.email || !loginData.password) {
        res.status(400).json({ error: "Missing required fields" });
      }
      const rsta = await this.userService.emailPasswordMatch(loginData);
      if (rsta != null) {      
        res.status(200).json({ message: "Login successful"});
      }
    } catch (error) {
      console.log("Error in login:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  }
}


export default AuthController;
