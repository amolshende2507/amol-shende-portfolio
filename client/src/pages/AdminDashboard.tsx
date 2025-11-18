// client/src/pages/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios'; 
import { LogOut, Edit, Trash2, PlusCircle } from 'lucide-react';

import type { Project, Experience } from '../types/portfolio';
import { ProjectModal } from '../components/admin/ProjectModal';
import { ExperienceModal } from '../components/admin/ExperienceModal';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'x-auth-token': token,
    },
  };
};

export const AdminDashboard = () => {
  const navigate = useNavigate();

  // ===== PROJECT STATE =====
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  // ===== EXPERIENCE STATE =====
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [experienceToEdit, setExperienceToEdit] = useState<Experience | null>(null);

  // ===== GENERAL STATE =====
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // -----------------------------
  // Fetch functions
  // -----------------------------
  const fetchProjects = async () => {
    try {
      const response = await API.get('/api/projects'); 
      setProjects(response.data);
    } catch {
      setError('Failed to fetch projects.');
    }
  };

  const fetchExperiences = async () => {
    try {
      const response = await API.get('/api/experiences');
      setExperiences(response.data);
    } catch {
      setError('Failed to fetch experiences.');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProjects(), fetchExperiences()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // -----------------------------
  // Logout handler
  // -----------------------------
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // -----------------------------
  // Project handlers
  // -----------------------------
  const openModalForNewProject = () => {
    setProjectToEdit(null);
    setIsModalOpen(true);
  };

  const openModalForEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const handleSaveProject = async (formData: FormData) => {
    try {
      if (projectToEdit) {
        await API.put(`/api/projects/${projectToEdit._id}`, formData, getAuthHeaders());
      } else {
        await API.post('/api/projects', formData, getAuthHeaders());
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error('Failed to save project:', err);
      alert('Error: Could not save the project.');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await API.delete(`/api/projects/${id}`, getAuthHeaders());
        fetchProjects();
      } catch (err) {
        console.error('Failed to delete project:', err);
        alert('Error: Could not delete the project.');
      }
    }
  };

  // -----------------------------
  // Experience handlers
  // -----------------------------
  const handleSaveExperience = async (experienceData: Omit<Experience, '_id'>) => {
    try {
      if (experienceToEdit) {
        await API.put(
          `api/experiences/${experienceToEdit._id}`,
          experienceData,
          getAuthHeaders()
        );
      } else {
        await API.post('api/experiences', experienceData, getAuthHeaders());
      }
      setIsExperienceModalOpen(false);
      fetchExperiences();
    } catch {
      alert('Error saving experience.');
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await API.delete(`/api/experiences/${id}`, getAuthHeaders());
        fetchExperiences();
      } catch {
        alert('Error deleting experience.');
      }
    }
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-['Inter',sans-serif]">
      {/* ===== Header ===== */}
      <header className="bg-slate-800 shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </nav>
      </header>

      {/* ===== Main ===== */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* ===== Projects Section ===== */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Manage Projects</h2>
          <button
            onClick={openModalForNewProject}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors font-medium"
          >
            <PlusCircle size={18} />
            Add Project
          </button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="bg-slate-800 rounded-lg shadow-lg overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-slate-700 text-slate-300 uppercase text-sm">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4 hidden md:table-cell">Created</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td className="p-4 text-center">Loading...</td></tr>
              ) : (
                projects.map((project) => (
                  <tr
                    key={project._id}
                    className="border-b border-slate-700 hover:bg-slate-700/30"
                  >
                    <td className="p-4 font-medium">{project.title}</td>
                    <td className="p-4 text-cyan-400">{project.category}</td>
                    <td className="p-4 text-slate-400 hidden md:table-cell">
                      {new Date(project.createdAt!).toLocaleDateString()}
                    </td>
                    <td className="p-4 flex gap-4">
                      <button
                        onClick={() => openModalForEditProject(project)}
                        title="Edit"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        title="Delete"
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ===== Experiences Section ===== */}
        <div className="mt-12">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Manage Experience</h2>
            <button
              onClick={() => {
                setExperienceToEdit(null);
                setIsExperienceModalOpen(true);
              }}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 transition-colors font-medium"
            >
              <PlusCircle size={18} />
              Add Experience
            </button>
          </div>

          <div className="bg-slate-800 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-slate-700 text-slate-300 uppercase text-sm">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Organization</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp) => (
                  <tr
                    key={exp._id}
                    className="border-b border-slate-700 hover:bg-slate-700/30"
                  >
                    <td className="p-4 font-medium">{exp.title}</td>
                    <td className="p-4">{exp.organization}</td>
                    <td className="p-4 flex gap-4">
                      <button
                        onClick={() => {
                          setExperienceToEdit(exp);
                          setIsExperienceModalOpen(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp._id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ===== Modals ===== */}
      <ProjectModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
      />

      <ExperienceModal
        isOpen={isExperienceModalOpen}
        onRequestClose={() => setIsExperienceModalOpen(false)}
        onSave={handleSaveExperience}
        experienceToEdit={experienceToEdit}
      />
    </div>
  );
};
