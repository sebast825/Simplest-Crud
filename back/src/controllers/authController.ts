import { Request, Response } from "express";
import { AuthRequestDto } from "../dto/auth/authRequestDto.types";
import UserService from "../services/userService";
import JwtService from "../services/jwtService";
import { asyncHandler } from "../helpers/asyncHandler";
import { UserResponseDto } from "../dto/user/userResponseDto.types";

class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const loginData: AuthRequestDto = req.body;
    const rsta: UserResponseDto = await this.userService.emailPasswordMatch(
      loginData
    );
    const token = this.jwtService.generateToken(rsta.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    res.status(200).json({ message: "Login successful", user: rsta });
  });
  logout = (req: Request, res: Response): void => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(204).json();
  };
}

export default AuthController;
