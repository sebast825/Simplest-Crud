import { AuthRequestDto } from "../dto/auth/authRequestDto.types";
import { UserCreateRequestDto } from "../dto/user/userCreateRequestDto.types";
import { UserResponseDto } from "../dto/user/userResponseDto.types";
import { comparePassword, hashPassword } from "../helpers/hashPasswords";

const { connectDB, sql } = require("../config/database.ts");

class UserService {
  public async create(userDto: UserCreateRequestDto): Promise<UserResponseDto> {
    try {
      const pool = await connectDB();
      const request = pool.request();

      const checkEmail = await request
        .input("email", sql.NVarChar, userDto.email)
        .query("SELECT id FROM users WHERE email = @email");

      if (checkEmail.recordset.length > 0) {
        throw new Error("El email ya está registrado");
      }
      var hashPass: string = await hashPassword(userDto.password);
      const result = await request
        .input("name", sql.NVarChar, userDto.name)
        .input("email", sql.NVarChar, userDto.email)
        .input("password", sql.NVarChar, hashPass).query(`
         INSERT INTO users (name, email, password) 
         OUTPUT INSERTED.id, INSERTED.name, INSERTED.email  
         VALUES (@name, @email, @password);
      `);
      const dbUser = result.recordset[0];

      const userResponse: UserResponseDto = {
        name: dbUser.name,
        id: dbUser.id,
      };
      return userResponse;
    } catch (error: any) {
      // ✅ Aquí capturas errores de SQL
      console.error("Error DB:", error.message);
      throw error; // Re-lanzas para que el controller lo maneje
    }
  }
  public async emailPasswordMatch(
    loginDto: AuthRequestDto
  ): Promise<UserResponseDto> {
    try {
      const pool = await connectDB();
      const request = pool.request();
      const result = await request.input("email", sql.NVarChar, loginDto.email)
        .query(`
      SELECT id, password,name
      FROM users
      WHERE email = @email 
    `);

      const dbUser = result.recordset[0];

      if (await comparePassword(loginDto.password, dbUser.password)) {
        const userResponse: UserResponseDto = {
          name: dbUser.name,
          id: dbUser.id,
        };
        return userResponse;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error: any) {
      // ✅ Aquí capturas errores de SQL
      console.error("Error DB:", error.message);
      throw error; // Re-lanzas para que el controller lo maneje
    }
  }
}

export default UserService;
export const userService = new UserService();
