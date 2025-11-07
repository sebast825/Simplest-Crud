import { CustomError } from "../helpers/customError";
import { connectDB, sql } from "../config/database";
import { UserCreateRequestDto } from "../dto/user/userCreateRequestDto.types";


class UserRepository {
  public async create(userDto: UserCreateRequestDto): Promise<any> {
    const pool = await connectDB();
    const checkRequest = pool.request();
    const checkEmail = await checkRequest
      .input("email", sql.NVarChar, userDto.email)
      .query("SELECT id FROM users WHERE email = @email");

    if (checkEmail.recordset.length > 0) {
      throw new CustomError("Email already registered", 422);
    }
    const request = pool.request();

    const result = await request
      .input("name", sql.NVarChar, userDto.name)
      .input("email", sql.NVarChar, userDto.email)
      .input("password", sql.NVarChar, userDto.password).query(`
         INSERT INTO users (name, email, password) 
         OUTPUT INSERTED.id, INSERTED.name, INSERTED.email  
         VALUES (@name, @email, @password);
      `);
    return result.recordset[0];
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
