export function authHeader() {
  // return authorization header with jwt token
  const userData = localStorage.getItem('user');
  const user = userData && JSON.parse(userData);

  return user && user.token ? { Authorization: 'Bearer ' + user.token } : {};
}
