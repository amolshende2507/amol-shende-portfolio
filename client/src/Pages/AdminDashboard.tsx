// In client/src/pages/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type{ Project } from '../types/portfolio';
import { ProjectModal } from '../components/admin/ProjectModal';
import { LogOut, Edit, Trash2, PlusCircle, AlertTriangle } from 'lucide-react';

// Helper for API configuration
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-auth-token': token,
    },
  };
};

export const AdminDashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // State for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  const openModalForNew = () => {
    setProjectToEdit(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (project: Project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = async (projectData: Project) => {
    try {
      if (projectToEdit) {
        // --- UPDATE ---
        await axios.put(`http://localhost:5000/api/projects/${projectToEdit._id}`, projectData, getAuthHeaders());
      } else {
        // --- CREATE ---
        await axios.post('http://localhost:5000/api/projects', projectData, getAuthHeaders());
      }
      setIsModalOpen(false);
      fetchProjects(); // Re-fetch projects to show the latest data
    } catch (err) {
      console.error("Failed to save project:", err);
      alert("Error: Could not save the project. Check console for details.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this project? This cannot be undone.')) {
        try {
            await axios.delete(`http://localhost:5000/api/projects/${id}`, getAuthHeaders());
            fetchProjects(); // Re-fetch to update the list
        } catch (err) {
            console.error("Failed to delete project:", err);
            alert("Error: Could not delete the project. Check console for details.");
        }
    }
  };

  // The JSX is mostly the same, but with onClick handlers added to the buttons
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-['Inter',sans-serif]">
        <header className="bg-slate-800 shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium">
                        <LogOut size={16} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </nav>
        </header>
        
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Manage Projects</h2>
                <button onClick={openModalForNew} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors font-medium">
                    <PlusCircle size={18} />
                    Add Project
                </button>
            </div>
            
            {error && <div className="...">{error}</div>}

            <div className="bg-slate-800 rounded-lg shadow-lg overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                    {/* ... thead ... */}
                    <tbody>
                        {loading ? ( <></> /* Skeleton rows here */ ) : (
                            projects.map((project) => (
                                <tr key={project._id} className="border-b border-slate-700 hover:bg-slate-700/30">
                                    <td className="p-4 font-medium">{project.title}</td>
                                    <td className="p-4 text-cyan-400">{project.category}</td>
                                    <td className="p-4 text-slate-400 hidden md:table-cell">
                                        {new Date(project.createdAt!).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 flex gap-4">
                                        <button onClick={() => openModalForEdit(project)} title="Edit" className="text-blue-400 hover:text-blue-300 transition-colors">
                                            <Edit size={20} />
                                        </button>
                                        <button onClick={() => handleDeleteProject(project._id)} title="Delete" className="text-red-500 hover:text-red-400 transition-colors">
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </main>

        <ProjectModal 
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onSave={handleSaveProject}
            projectToEdit={projectToEdit}
        />
    </div>
  );
};