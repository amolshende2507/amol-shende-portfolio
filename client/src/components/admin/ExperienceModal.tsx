import { useState, useEffect, FormEvent } from 'react';
import Modal from 'react-modal';
import type { Experience } from '../../types/portfolio';
import { X } from 'lucide-react';

Modal.setAppElement('#root');

interface ExperienceModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSave: (experience: Omit<Experience, '_id'>) => void;
    experienceToEdit: Experience | null;
}

const initialState = { title: '', organization: '', period: '', description: '', icon: '' };

export const ExperienceModal = ({
    isOpen,
    onRequestClose,
    onSave,
    experienceToEdit,
}: ExperienceModalProps) => {
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (experienceToEdit) {
            setFormData(experienceToEdit);
        } else {
            setFormData(initialState);
        }
    }, [experienceToEdit, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Experience Form"
            className="bg-slate-800 text-white rounded-lg shadow-xl p-6 w-full max-w-xl mx-auto my-12 border border-slate-700 outline-none"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                    {experienceToEdit ? 'Edit Experience' : 'Add Experience'}
                </h2>
                <button onClick={onRequestClose} className="text-slate-400 hover:text-white transition">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-white">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title (e.g., Full-Stack Intern)"
                    required
                    className="w-full bg-slate-900 text-white placeholder-slate-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Organization (e.g., Tech Startup Inc.)"
                    required
                    className="w-full bg-slate-900 text-white placeholder-slate-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                    type="text"
                    name="period"
                    value={formData.period}
                    onChange={handleChange}
                    placeholder="Period (e.g., Jun 2024 - Aug 2024)"
                    required
                    className="w-full bg-slate-900 text-white placeholder-slate-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    rows={3}
                    className="w-full bg-slate-900 text-white placeholder-slate-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="Icon name (e.g., briefcase, trophy, code)"
                    required
                    className="w-full bg-slate-900 text-white placeholder-slate-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white hover:opacity-90 transition"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
};
