
import jwt, { SignOptions, Algorithm } from 'jsonwebtoken';

class JwtService{

private readonly jwtSecret: string;
private readonly jwtExpiresIn: string;
private readonly jwtAlgorithm: string;

     constructor() {
    // Verificar que el secret tenga longitud mínima segura
    this.jwtSecret = "mi-clave-secreta-super-segura";
  
    
    this.jwtExpiresIn = '15m';
    this.jwtAlgorithm = 'HS256';
  }

    public generateToken(userPayload:number) {
    const crypto = require('crypto');
    const payload = {
      
      iss: 'mi-app-segura', 
      aud: 'mi-app-users', 
      sub: userPayload, 
      iat: Math.floor(Date.now() / 1000), 
      jti: crypto.randomBytes(16).toString('hex'),
      
      userId:userPayload,
  
    };

   
      return jwt.sign(payload, this.jwtSecret, {
         expiresIn: '15m' ,
         algorithm: 'HS256' 
      });
  }
  public verifyToken(token: string): any {
  try {
    const decoded = jwt.verify(token, this.jwtSecret, {
      algorithms: ['HS256'],
      issuer: 'mi-app-segura',
      audience: 'mi-app-users'
    });
    
    return decoded;
  } catch (error) {
    throw new Error('Token invalid');
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