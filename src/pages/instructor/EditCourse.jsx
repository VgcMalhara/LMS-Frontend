import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Save, ArrowLeft, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import api from '../../api/axios';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        category: ''
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    
    // State for top sliding notification banner
    const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }

    // Fetch existing course details to populate the form
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await api.get(`/courses/${id}`);
                setFormData({
                    title: response.data.title || '',
                    description: response.data.description || '',
                    content: response.data.content || '',
                    category: response.data.category || ''
                });
            } catch (err) {
                setError('Failed to load course details for editing.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

    // Handle input field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle course update form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await api.put(`/courses/${id}`, formData);
            
            // Show top notification banner (Success)
            setNotification({ type: 'success', message: 'Course updated successfully!' });

            // Delay navigation slightly so user can see the success notification
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500);

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Failed to update course.';
            setError(errorMsg);
            setNotification({ type: 'error', message: errorMsg });
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-32 text-slate-500 font-semibold gap-2">
                <Loader2 className="animate-spin text-blue-600" size={24} />
                Loading course data...
            </div>
        );
    }

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
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 transition"
            >
                <ArrowLeft size={16} /> Back to Dashboard
            </button>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8">
                
                {/* Form Header */}
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mb-3 shadow-inner border border-blue-100/50">
                        <BookOpen size={24} />
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Edit Course</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Update your course information and content details.</p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-100 text-red-700 text-sm font-semibold">
                        {error}
                    </div>
                )}

                {/* Edit Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Course Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition outline-none font-medium text-slate-900 text-sm"
                            placeholder="e.g., Full-Stack MERN Masterclass"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition outline-none font-medium text-slate-900 text-sm"
                            placeholder="e.g., Programming, Design"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition outline-none font-medium text-slate-900 text-sm resize-none"
                            placeholder="Provide a detailed summary of what students will learn..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Course Content / Syllabus</label>
                        <textarea
                            name="content"
                            rows="6"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition outline-none font-medium text-slate-900 text-sm"
                            placeholder="Detailed syllabus or learning materials..."
                        />
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/instructor-dashboard')}
                            className="px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition hover:scale-105 active:scale-95 disabled:opacity-50"
                        >
                            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            <span>Save Changes</span>
                        </button>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default EditCourse;