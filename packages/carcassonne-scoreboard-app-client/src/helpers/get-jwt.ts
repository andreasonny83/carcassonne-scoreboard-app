/**
 * getJwt
 *
 * Return a JWT from the localStorage, if present
 */
export const getJwt = () => localStorage.getItem('accessToken');
