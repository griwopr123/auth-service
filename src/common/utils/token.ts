import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'; 
const JWT_EXPIRES_IN = '10d'; 

export function createToken(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

// export function verifyToken(token: string): { sub: string } {
//   return jwt.verify(token, JWT_SECRET) as { sub: string };
// }