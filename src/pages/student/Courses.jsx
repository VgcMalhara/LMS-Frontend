import { useState, useEffect, useContext } from 'react';
import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import CourseCard from '../../components/CourseCard';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledIds, setEnrolledIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    // State for top sliding notification banner
    const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: '' }

    const fetchData = async () => {
        try {
            const coursesRes = await api.get('/courses');
            setCourses(coursesRes.data);

            if (user?.role === 'student') {
                const enrollRes = await api.get('/courses/my-enrollments');
                const enrolledCourseIds = enrollRes.data.map(item => item.course?._id);
                setEnrolledIds(enrolledCourseIds);
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    // Automatically hide notification after 3 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);

            // Cleanup timer if component unmounts or notification changes
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // Handle student course enrollment with top notification banner
    const handleEnroll = async (courseId, e) => {
        e.stopPropagation();
        try {
            await api.post(`/courses/${courseId}/enroll`);
            setEnrolledIds([...enrolledIds, courseId]);
            
            // Show success top notification banner
            setNotification({ type: 'success', message: 'Successfully enrolled in the course!' });

        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Enrollment failed. Please try again.';
            // Show error top notification banner
            setNotification({ type: 'error', message: errorMsg });
        }
    };

    if (loading) {
        return <div className="text-center py-20 font-bold text-slate-500">Loading available courses...</div>;
    }

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

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore All Courses</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Select a course to view details or enroll instantly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => {
                    const isEnrolled = enrolledIds.includes(course._id);

                    return (
                        <CourseCard 
                            key={course._id}
                            course={course}
                            userRole={user?.role}
                            isEnrolled={isEnrolled}
                            onEnroll={(e) => handleEnroll(course._id, e)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Courses;