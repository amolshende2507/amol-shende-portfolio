import { useState, useEffect, FormEvent } from 'react';
import Modal from 'react-modal';
import type{ Project } from '../../types/portfolio';
import { X } from 'lucide-react';

Modal.setAppElement('#root');

interface ProjectModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (project: Project) => void;
  projectToEdit: Project | null;
}

const initialFormData: Omit<Project, '_id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  technologies: [],
  imageUrl: '',
  githubUrl: '',
  liveUrl: '',
  category: '',
};

export const ProjectModal = ({ isOpen, onRequestClose, onSave, projectToEdit }: ProjectModalProps) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        ...projectToEdit,
        technologies: projectToEdit.technologies.join(', '),
      } as any);
    } else {
      setFormData(initialFormData);
    }
  }, [projectToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      technologies: formData.technologies
        .toString()
        .split(',')
        .map(tech => tech.trim()),
    };
    onSave(projectData as Project);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Project Form"
      className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-2xl mx-auto my-12 border border-slate-700 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{projectToEdit ? 'Edit Project' : 'Add New Project'}</h2>
        <button onClick={onRequestClose} className="text-slate-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-slate-400 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-slate-900 text-white border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-slate-400 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full bg-slate-900 text-white border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-slate-400 mb-1">Technologies (comma-separated)</label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            required
            className="w-full bg-slate-900 text-white border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Category + Image URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* GitHub + Live Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">GitHub URL</label>
            <input
              type="text"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Live Demo URL</label>
            <input
              type="text"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="w-full bg-slate-900 text-white border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-shadow"
          >
            Save Project
          </button>
        </div>
      </form>
    </Modal>
  );
};
