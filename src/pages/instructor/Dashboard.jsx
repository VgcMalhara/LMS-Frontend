import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, BookOpen, AlertTriangle, X, CheckCircle2, AlertCircle } from 'lucide-react';
import api from '../../api/axios';
import CourseCard from '../../components/CourseCard';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // States for custom delete confirmation modal & top notification toast
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }
    
    const navigate = useNavigate();

    // Fetch courses created by the logged-in instructor
    const fetchCourses = async () => {
        try {
            const response = await api.get('/courses/my-courses');
            setCourses(response.data);
        } catch (err) {
            setError('Failed to load your courses.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Trigger delete confirmation modal
    const handleDeleteClick = (id, e) => {
        e.stopPropagation();
        setCourseToDelete(id);
        setDeleteModalOpen(true);
    };

    // Execute course deletion
    const confirmDelete = async () => {
        if (!courseToDelete) return;

        try {
            await api.delete(`/courses/${courseToDelete}`);
            setCourses(courses.filter(course => course._id !== courseToDelete));
            
            // Show top notification toast (Success)
            setNotification({ type: 'success', message: 'Course deleted successfully!' });
        } catch (err) {
            // Show top notification toast (Error)
            setNotification({ 
                type: 'error', 
                message: err.response?.data?.message || 'Failed to delete course' 
            });
        } finally {
            setDeleteModalOpen(false);
            setCourseToDelete(null);

            // Auto-hide notification after 4 seconds
            setTimeout(() => setNotification(null), 4000);
        }
    };

    if (loading) return <div className="text-center py-20 font-bold text-slate-500">Loading dashboard...</div>;

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 relative">
            
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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Instructor Dashboard</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Manage your created courses and monitor content.</p>
                </div>
                <Link
                    to="/create-course"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:scale-105"
                >
                    <PlusCircle size={18} />
                    Add New Course
                </Link>
            </div>

            {error && <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-100 text-red-700 text-sm font-semibold">{error}</div>}

            {courses.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-bold text-slate-700">No courses created yet</h3>
                    <Link to="/create-course" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition">
                        <PlusCircle size={16} /> Create Course
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <CourseCard 
                            key={course._id}
                            course={course}
                            userRole="instructor"
                            onEdit={() => navigate(`/edit-course/${course._id}`)}
                            onDelete={(e) => handleDeleteClick(course._id, e)}
                        />
                    ))}
                </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 mb-5 border border-red-100">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Course?</h3>
                        <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">
                            Are you sure you want to delete this course? This action is permanent and cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setDeleteModalOpen(false)}
                                className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default InstructorDashboard;