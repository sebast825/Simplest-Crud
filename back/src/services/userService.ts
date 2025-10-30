import { AuthRequestDto } from "../dto/auth/authRequestDto.types";
import { comparePassword, hashPassword } from "../helpers/hashPasswords";

const { connectDB, sql } = require("../config/database.ts");


class UserService {
   public async emailPasswordMatch(loginDto :AuthRequestDto) : Promise<number> {

      try {
    const pool = await connectDB();
  const request = pool.request();
  const result = await request
    .input("email", sql.NVarChar, loginDto.email)
    .query(`
      SELECT id, password
      FROM users
      WHERE email = @email 
    `);

      const user = result.recordset[0];
    if(await comparePassword(loginDto.password, user.password)){
      return user.id;

    }else{
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