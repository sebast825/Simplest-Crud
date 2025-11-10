import { CustomError } from "../helpers/customError";
import { connectDB, prisma, sql } from "../config/database";
import { UserCreateRequestDto } from "../dto/user/userCreateRequestDto.types";
import { User } from "../generated/prisma";

class UserRepository {
  public async create(userDto: UserCreateRequestDto): Promise<User> {


    const checkEmail =   await prisma.user.findUnique({
      where:{
        email : userDto.email
      }
    })

    if (checkEmail) {
      throw new CustomError("Email already registered", 422);
    }
 
    const result =  await prisma.user.create({
      data :{
        name : userDto.name,
        password:userDto.password,
        email:userDto.email
      }
    })
    return result;
  }

  public async getByEmail(email: string): Promise<any> {
    const pool = await connectDB();
    const request = pool.request();
    const result = await request.input("email", sql.NVarChar, email).query(`
      SELECT id, password,name
      FROM users
      WHERE email = @email 
    `);

    return result.recordset[0];
  }
}

export default UserRepository;
export const userRepository = new UserRepository();
