import { redirect } from 'react-router-dom';

// Calculate time left before token expires (ms)
export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

// Get current auth token
export function getAuthToken() {
  const token = localStorage.getItem('token');

  if(!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }
  return token;
}

// Makes token available to route components
export function tokenLoader() {
  const token = getAuthToken();
  return token;
}

// Redirects to login if not authenticated
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
}