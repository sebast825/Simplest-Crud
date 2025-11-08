import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

class JwtService {
  private readonly jwtSecret: string;
  private expiresIn: string;
  constructor() {
    this.jwtSecret = ENV.JWT_SECRET || "mi-clave-secreta-super-segura";
    this.expiresIn = ENV.EXPIRES_IN || "1h";
  }
  public generateToken(userPayload: number) {
    const crypto = require("crypto");

    const payload = {
      iss: ENV.JWT_ISSUER,
      aud: ENV.JWT_AUDIENCE,
      sub: userPayload,
      iat: Math.floor(Date.now() / 1000),
      jti: crypto.randomBytes(16).toString("hex"),

      userId: userPayload,
    };

    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.expiresIn as jwt.SignOptions["expiresIn"],
      algorithm: "HS256",
    });
  }
  public verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.jwtSecret, {
        algorithms: ["HS256"],
        issuer: ENV.JWT_ISSUER,
        audience: ENV.JWT_AUDIENCE,
      });

      return decoded;
    } catch (error) {
      throw new Error("Token invalid");
    }
  }

  public validateToken(token: string): boolean {
    try {
      this.verifyToken(token);
      return true;
    } catch {
      return false;
    }
  }
}

export default JwtService;
export const jwtService = new JwtService();
