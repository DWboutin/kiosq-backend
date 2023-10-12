import { jwtVerify } from 'jose'

export const readJWTToken = async (token: string, secret: string) => {
  const jwtSecret = new TextEncoder().encode(secret)

  const content = await jwtVerify(token, jwtSecret)

  return content.payload as any
}
