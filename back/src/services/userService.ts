import { AuthRequestDto } from "../dto/auth/authRequestDto.types";
import { UserCreateRequestDto } from "../dto/user/userCreateRequestDto.types";
import { UserResponseDto } from "../dto/user/userResponseDto.types";
import { CustomError } from "../helpers/customError";
import { comparePassword, hashPassword } from "../helpers/hashPasswords";
import UserRepository, { userRepository } from "../repositories/userRepository";

class UserService {
  constructor(private userRepository: UserRepository) {}

  public async create(userDto: UserCreateRequestDto): Promise<UserResponseDto> {

      if (!userDto || !userDto.email || !userDto.password || !userDto.name) {
        throw new CustomError("Missing required fields", 400);
      }
      var hashPass: string = await hashPassword(userDto.password);
      userDto.password = hashPass;
      const dbUser: any = await this.userRepository.create(userDto);

      const userResponse: UserResponseDto = {
        name: dbUser.name,
        id: dbUser.id,
      };
      return userResponse;

  }
  public async emailPasswordMatch(
    loginDto: AuthRequestDto
  ): Promise<UserResponseDto> {
    if (!loginDto || !loginDto.email || !loginDto.password) {
      throw new CustomError("Missing required fields", 400);
    }

    const dbUser = await this.userRepository.getByEmail(loginDto.email);
    if (!dbUser) {
      throw new CustomError("Invalid email or password", 401);
    }
    if (await comparePassword(loginDto.password, dbUser.password)) {
      const userResponse: UserResponseDto = {
        name: dbUser.name,
        id: dbUser.id,
      };
      return userResponse;
    } else {
      throw new CustomError("Invalid email or password", 401);
    }
  }
}

export default UserService;
export const userService = new UserService(userRepository);
