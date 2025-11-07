import { UserCreateRequestDto } from "../dto/user/userCreateRequestDto.types";
import { UserResponseDto } from "../dto/user/userResponseDto.types";
import { asyncHandler } from "../helpers/asyncHandler";
import UserService from "../services/userService";
import { Request, Response } from "express";

class UserController {
  constructor(private userService: UserService) {}
  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {

      const userData: UserCreateRequestDto = req.body;

      const rsta: UserResponseDto = await this.userService.create(userData);
      res.status(201).json(rsta);

  });
}

export default UserController;
