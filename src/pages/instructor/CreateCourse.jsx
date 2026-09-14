import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, AlignLeft, ArrowLeft, AlertCircle, Layers } from 'lucide-react';
import api from '../../api/axios';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState(''); // <-- Category state added
    
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Added category to the payload
            await api.post('/courses', { title, description, content, category });
            navigate('/dashboard'); // Dashboard එකට redirect වීම
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create course.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
            
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition mb-6"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-8 sm:p-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create New Course</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Fill out the details below to publish a new course for students.</p>
                </div>

                {error && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 border border-red-100 text-red-700 text-sm font-semibold">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Course Title</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <BookOpen size={18} />
                            </div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition outline-none font-medium text-slate-900"
                                placeholder="e.g., Full Stack MERN Development"
                                required
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                <Layers size={18} />
                            </div>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition outline-none font-medium text-slate-900"
                                placeholder="e.g., Programming, Design"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Short Description</label>
                        <div className="relative">
                            <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                                <AlignLeft size={18} />
                            </div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows="3"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition outline-none font-medium text-slate-900 resize-none"
                                placeholder="Brief overview of what students will learn..."
                                required
                            />
                        </div>
                    </div>

                    {/* Content / Syllabus */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Course Content / Syllabus</label>
                        <div className="relative">
                            <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                                <FileText size={18} />
                            </div>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows="6"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition outline-none font-medium text-slate-900"
                                placeholder="Detailed syllabus or learning materials..."
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/25 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                    >
                        {isLoading ? 'Publishing Course...' : 'Publish Course'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;