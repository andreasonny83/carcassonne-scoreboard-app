/**
 * authHeader
 *
 * Return authorization header with jwt token
 */
export const authHeader = (jwtToken: string) =>
  jwtToken && {
    Authorization: `Bearer ${jwtToken}`
  };
