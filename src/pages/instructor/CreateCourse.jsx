import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, AlignLeft, ArrowLeft, AlertCircle, Layers, CheckCircle2, X } from 'lucide-react';
import api from '../../api/axios';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    
    // Field-specific error states for inline validation
    const [fieldErrors, setFieldErrors] = useState({});
    
    const [isLoading, setIsLoading] = useState(false);
    
    // State for top success notification banner (Only for successful creation)
    const [successMessage, setSuccessMessage] = useState('');
    
    const useNavigateInstance = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({});

        const trimmedTitle = title.trim();
        const trimmedCategory = category.trim();
        const trimmedDescription = description.trim();
        const trimmedContent = content.trim();

        let errors = {};

        // 1. Validate each field individually for inline error messages
        if (!trimmedTitle) {
            errors.title = 'Course title is required.';
        } else if (trimmedTitle.length < 3) {
            errors.title = 'Course title must be at least 3 characters long.';
        }

        if (!trimmedCategory) {
            errors.category = 'Category is required.';
        }

        if (!trimmedDescription) {
            errors.description = 'Short description is required.';
        }

        if (!trimmedContent) {
            errors.content = 'Course content / syllabus is required.';
        }

        // If there are validation errors, update state and stop submission
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setIsLoading(true);

        try {
            // Send request to create course with trimmed data
            await api.post('/courses', { 
                title: trimmedTitle, 
                description: trimmedDescription, 
                content: trimmedContent, 
                category: trimmedCategory 
            });
            
            // Show success message
            setSuccessMessage('Course published successfully!');

            // Delay navigation slightly so user can see the success state
            setTimeout(() => {
                useNavigateInstance('/dashboard');
            }, 1500);

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to create course. Please try again.';
            setFieldErrors({ general: errorMsg });
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 relative">
            
            {/* Top Success Notification Banner */}
            {successMessage && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl border border-emerald-100 text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-300 bg-white">
                    <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                    <span className="text-emerald-900">{successMessage}</span>
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

                {/* General Server Error Message */}
                {fieldErrors.general && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 border border-red-100 text-red-700 text-sm font-semibold">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>{fieldErrors.general}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    
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
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 transition outline-none font-medium text-slate-900 ${
                                    fieldErrors.title 
                                        ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                                        : 'border-slate-200 focus:ring-blue-600/20 focus:border-blue-600'
                                }`}
                                placeholder="e.g., Full Stack MERN Development"
                            />
                        </div>
                        {fieldErrors.title && (
                            <p className="mt-1.5 text-xs font-bold text-red-600 flex items-center gap-1">
                                <AlertCircle size={13} /> {fieldErrors.title}
                            </p>
                        )}
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
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 transition outline-none font-medium text-slate-900 ${
                                    fieldErrors.category 
                                        ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                                        : 'border-slate-200 focus:ring-blue-600/20 focus:border-blue-600'
                                }`}
                                placeholder="e.g., Programming, Design"
                            />
                        </div>
                        {fieldErrors.category && (
                            <p className="mt-1.5 text-xs font-bold text-red-600 flex items-center gap-1">
                                <AlertCircle size={13} /> {fieldErrors.category}
                            </p>
                        )}
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
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 transition outline-none font-medium text-slate-900 resize-none ${
                                    fieldErrors.description 
                                        ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                                        : 'border-slate-200 focus:ring-blue-600/20 focus:border-blue-600'
                                }`}
                                placeholder="Brief overview of what students will learn..."
                            />
                        </div>
                        {fieldErrors.description && (
                            <p className="mt-1.5 text-xs font-bold text-red-600 flex items-center gap-1">
                                <AlertCircle size={13} /> {fieldErrors.description}
                            </p>
                        )}
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
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 transition outline-none font-medium text-slate-900 ${
                                    fieldErrors.content 
                                        ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' 
                                        : 'border-slate-200 focus:ring-blue-600/20 focus:border-blue-600'
                                }`}
                                placeholder="Detailed syllabus or learning materials..."
                            />
                        </div>
                        {fieldErrors.content && (
                            <p className="mt-1.5 text-xs font-bold text-red-600 flex items-center gap-1">
                                <AlertCircle size={13} /> {fieldErrors.content}
                            </p>
                        )}
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