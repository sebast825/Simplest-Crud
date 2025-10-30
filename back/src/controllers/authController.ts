import { Request, Response } from "express";
import { AuthRequestDto } from "../dto/auth/authRequestDto.types";
import UserService from "../services/userService";
import JwtService from "../services/jwtService";

class AuthController {
  constructor(
    private userService: UserService,
     private jwtService: JwtService
  ) {}
   login = async(req: Request, res: Response): Promise<void> =>{
    try {
      const loginData: AuthRequestDto = req.body;
      if (!loginData || !loginData.email || !loginData.password) {
        res.status(400).json({ error: "Missing required fields" });
      }
      const rsta = await this.userService.emailPasswordMatch(loginData);
     if (rsta) {
        const token = this.jwtService.generateToken(rsta.id);
 
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 1000 // 1 hour
        });   
        res.status(200).json({ message: "Login successful", user : rsta});
     }else{
      res.status(500).json({  error: "Invalid Credentials"});
     }
    } catch (error) {
      console.log("Error in login:", error);
      res.status(500).json({ error: "Invalid Credentials"});
    }
  }
}


export default AuthController;
