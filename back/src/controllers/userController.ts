import { UserCreateRequestDto } from "../dto/user/userCreateRequestDto.types";
import { UserResponseDto } from "../dto/user/userResponseDto.types";
import UserService from "../services/userService";
import { Request, Response } from "express";

class UserController {
  constructor(private userService: UserService) {}
  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: UserCreateRequestDto = req.body;

      const rsta: UserResponseDto = await this.userService.create(userData);
      res.status(201).json(rsta);
    } catch (error) {
      console.log(error);
      res.status(500).json("Error creating user: ");
    }
  };
}

export default UserController;
