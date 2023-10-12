import * as jose from 'jose'

export const generateJWTToken = async (
  payload: any,
  expiration: string,
  secret: string,
) => {
  const jwtSecret = new TextEncoder().encode(secret)

  const alg = 'HS256'

  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setExpirationTime(expiration)
    .sign(jwtSecret)
}
