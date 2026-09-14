import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, BookOpen, Layers, Pencil, Eye } from 'lucide-react';
import api from '../../api/axios';

const InstructorDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const handleDelete = async (id, e) => {
        e.stopPropagation(); 
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await api.delete(`/courses/${id}`);
                setCourses(courses.filter(course => course._id !== id));
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to delete course');
            }
        }
    };

    if (loading) return <div className="text-center py-20 font-bold text-slate-500">Loading dashboard...</div>;

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
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
                        <div 
                            key={course._id} 
                            onClick={() => navigate(`/courses/${course._id}`)}
                            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                        <Layers size={14} /> {course.category || 'Course'}
                                    </span>
                                    
                                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                        <button 
                                            onClick={() => navigate(`/edit-course/${course._id}`)} 
                                            className="text-slate-400 hover:text-blue-600 transition p-1.5 rounded-lg hover:bg-blue-50"
                                            title="Edit Course"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button 
                                            onClick={(e) => handleDelete(course._id, e)} 
                                            className="text-slate-400 hover:text-red-600 transition p-1.5 rounded-lg hover:bg-red-50"
                                            title="Delete Course"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                                <p className="text-sm text-slate-600 line-clamp-3 mb-4">{course.description}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400">
                                <span>Instructor: {course.instructor?.username || 'You'}</span>
                                <span className="text-blue-600 font-bold uppercase tracking-wider flex items-center gap-1">
                                    <Eye size={14} /> View Details
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InstructorDashboard;