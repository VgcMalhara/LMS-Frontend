import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Save, ArrowLeft, Loader2 } from 'lucide-react';
import api from '../../api/axios';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '', // <-- Content state added
        category: ''
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await api.get(`/courses/${id}`);
                setFormData({
                    title: response.data.title || '',
                    description: response.data.description || '',
                    content: response.data.content || '', // <-- Fetch content data
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await api.put(`/courses/${id}`, formData);
            alert('Course updated successfully!');
            navigate('/instructor-dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update course.');
        } finally {
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
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
            
            <button
                onClick={() => navigate('/instructor-dashboard')}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-6 transition"
            >
                <ArrowLeft size={16} /> Back to Dashboard
            </button>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8">
                
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mb-3 shadow-inner border border-blue-100/50">
                        <BookOpen size={24} />
                    </div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Edit Course</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Update your course information and content details.</p>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-100 text-red-700 text-sm font-semibold">
                        {error}
                    </div>
                )}

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

                    {/* Content / Syllabus added here */}
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