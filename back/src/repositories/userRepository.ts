import { CustomError } from "../helpers/customError";
import { prisma} from "../config/database";
import { UserCreateRequestDto } from "../dto/user/userCreateRequestDto.types";
import { User } from "../generated/prisma";

class UserRepository {
  public async create(userDto: UserCreateRequestDto): Promise<User> {
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: userDto.email,
      },
    });

    if (checkEmail) {
      throw new CustomError("Email already registered", 422);
    }

    const result = await prisma.user.create({
      data: {
        name: userDto.name,
        password: userDto.password,
        email: userDto.email,
      },
    });
    return result;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return result;
  }
}

export default UserRepository;
export const userRepository = new UserRepository();
