// In client/src/utils/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  // Check if the token exists in local storage
  const token = localStorage.getItem('token');

  // If the token exists, render the child components (the protected page).
  // The <Outlet /> component is a placeholder for the actual page component.
  if (token) {
    return <Outlet />;
  }
  
  // If the token does not exist, redirect the user to the login page.
  // The 'replace' prop is used to replace the current entry in the history stack,
  // so the user can't use the "back" button to get back to the protected page.
  return <Navigate to="/login" replace />;
};