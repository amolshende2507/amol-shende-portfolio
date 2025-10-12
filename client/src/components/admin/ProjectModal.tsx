
// In client/src/components/admin/ProjectModal.tsx
import { useState, useEffect, FormEvent } from 'react';
import Modal from 'react-modal';
import type { Project } from '../../types/portfolio';
import { X } from 'lucide-react';

Modal.setAppElement('#root');

interface ProjectModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (formData: FormData) => void;
  projectToEdit: Project | null;
}

const initialTextData = {
  title: '',
  description: '',
  technologies: '',
  imageUrl: '', // This is just for displaying the current image URL
  githubUrl: '',
  liveUrl: '',
  category: '',
};

export const ProjectModal = ({ isOpen, onRequestClose, onSave, projectToEdit }: ProjectModalProps) => {
  const [textData, setTextData] = useState(initialTextData);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (projectToEdit) {
      setTextData({
        title: projectToEdit.title,
        description: projectToEdit.description,
        technologies: projectToEdit.technologies.join(', '),
        imageUrl: projectToEdit.imageUrl,
        githubUrl: projectToEdit.githubUrl || '',
        liveUrl: projectToEdit.liveUrl || '',
        category: projectToedit.category,
      });
      setImageFile(null);
    } else {
      setTextData(initialTextData);
      setImageFile(null);
    }
  }, [projectToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTextData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all text fields to FormData
    formData.append('title', textData.title);
    formData.append('description', textData.description);
    formData.append('technologies', textData.technologies);
    formData.append('category', textData.category);
    formData.append('githubUrl', textData.githubUrl);
    formData.append('liveUrl', textData.liveUrl);

    if (imageFile) {
      formData.append('image', imageFile);
    } else if (!projectToEdit) {
      alert("Please select an image file for the new project.");
      return;
    }

    onSave(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Project Form"
      className="bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-2xl mx-auto my-12 border border-slate-700 outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{projectToEdit ? 'Edit Project' : 'Add New Project'}</h2>
        <button onClick={onRequestClose} className="text-slate-400 hover:text-white">
          <X size={24} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div>
          <label className="block text-slate-400 mb-1">Title</label>
          {/* FIX: Changed formData.title to textData.title */}
          <input type="text" name="title" value={textData.title} onChange={handleChange} required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">Description</label>
           {/* FIX: Changed formData.description to textData.description */}
          <textarea name="description" value={textData.description} onChange={handleChange} required rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div>
          <label className="block text-slate-400 mb-1">Technologies (comma-separated)</label>
          {/* FIX: Changed formData.technologies to textData.technologies */}
          <input type="text" name="technologies" value={textData.technologies} onChange={handleChange} required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 mb-1">Category</label>
            {/* FIX: Changed formData.category to textData.category */}
            <input type="text" name="category" value={textData.category} onChange={handleChange} required className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Project Image</label>
            <input 
              type="file" 
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required={!projectToEdit}
              className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
            />
             {projectToEdit && textData.imageUrl && (
                <div className="mt-2">
                    <p className="text-sm text-slate-500">Current Image (Cannot be changed):</p>
                    <img src={textData.imageUrl} alt="Current project" className="w-24 h-auto rounded-md mt-1" />
                </div>
             )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-slate-400 mb-1">GitHub URL</label>
                 {/* FIX: Changed formData.githubUrl to textData.githubUrl */}
                <input type="text" name="githubUrl" value={textData.githubUrl} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
                <label className="block text-slate-400 mb-1">Live Demo URL</label>
                {/* FIX: Changed formData.liveUrl to textData.liveUrl */}
                <input type="text" name="liveUrl" value={textData.liveUrl} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
        </div>
        <div className="flex justify-end pt-4">
          <button type="submit" className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-shadow">
            Save Project
          </button>
        </div>
      </form>
    </Modal>
  );
};