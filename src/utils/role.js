export const ROLE_USER = 'ROLE_USER';
export const ROLE_ADMIN = 'ROLE_ADMIN';

export function hasRole(role) {
  return localStorage.getItem('role') === role;
}

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}
