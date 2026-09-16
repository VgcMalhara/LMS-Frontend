import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, AlignLeft, ArrowLeft, AlertCircle, Layers, CheckCircle2, X } from 'lucide-react';
import api from '../../api/axios';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // State for top sliding success/notification banner
    const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }
    
    const useNavigateInstance = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Send request to create course
            await api.post('/courses', { title, description, content, category });
            
            // Show success top notification banner
            setNotification({ type: 'success', message: 'Course published successfully!' });

            // Delay navigation slightly so user can see the success notification
            setTimeout(() => {
                useNavigateInstance('/dashboard');
            }, 1500);

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to create course.';
            setError(errorMsg);
            setNotification({ type: 'error', message: errorMsg });
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 relative">
            
            {/* Top Sliding Notification Banner */}
            {notification && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl border text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-300 bg-white">
                    {notification.type === 'success' ? (
                        <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                    ) : (
                        <AlertCircle size={20} className="text-red-600 shrink-0" />
                    )}
                    <span className={notification.type === 'success' ? 'text-emerald-900' : 'text-red-900'}>
                        {notification.message}
                    </span>
                    <button 
                        onClick={() => setNotification(null)} 
                        className="text-slate-400 hover:text-slate-600 ml-2 p-1 rounded-lg hover:bg-slate-100 transition"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Back Button */}
            <button
                onClick={() => useNavigateInstance(-1)}
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