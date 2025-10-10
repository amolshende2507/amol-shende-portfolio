// In client/src/App.tsx

import { Routes, Route, Outlet } from 'react-router-dom';

import { PortfolioPage } from './pages/PortfolioPage'; // We will create this
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard'; 


import { ProtectedRoute } from './utils/ProtectedRoute';
// This will be our main portfolio page component
// Component Imports
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet /> 
    <Footer />
  </>
);


// This is a placeholder for our new login page
// We will create this file next.



function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Routes>
        {/* --- Public Routes --- */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<PortfolioPage />} />
          {/* You could add other public pages here later, like a blog */}
        </Route>
        
        {/* --- Standalone Auth Route --- */}
        <Route path="/login" element={<LoginPage />} />

        {/* --- Protected Admin Routes --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Example: <Route path="/admin/edit/:id" element={<EditProjectPage />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;