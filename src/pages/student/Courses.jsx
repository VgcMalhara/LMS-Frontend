import { useState, useEffect, useContext } from 'react';
import { BookOpen, CheckCircle, GraduationCap, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledIds, setEnrolledIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // Fetch all courses and student enrollments
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

    // Enroll handler
    const handleEnroll = (courseId, e) => {
        e.stopPropagation(); // Prevent card click event when clicking enroll
        
        const executeEnroll = async () => {
            try {
                await api.post(`/courses/${courseId}/enroll`);
                setEnrolledIds([...enrolledIds, courseId]);
                alert('Successfully enrolled in the course!');
            } catch (err) {
                alert(err.response?.data?.message || 'Enrollment failed');
            }
        };

        executeEnroll();
    };

    if (loading) {
        return <div className="text-center py-20 font-bold text-slate-500">Loading available courses...</div>;
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore All Courses</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Select a course to view details or enroll instantly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => {
                    const isEnrolled = enrolledIds.includes(course._id);

                    return (
                        <div 
                            key={course._id} 
                            onClick={() => navigate(`/courses/${course._id}`)}
                            className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                        <BookOpen size={14} /> {course.category || 'Course'}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-400">
                                        By {course.instructor?.username || 'Instructor'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                                <p className="text-sm text-slate-600 line-clamp-3 mb-4">{course.description}</p>
                                <div className="bg-slate-50 rounded-xl p-3 text-xs font-medium text-slate-700 mb-4 line-clamp-2">
                                    <strong>Content:</strong> {course.content}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                                    <Eye size={14} /> View Details
                                </span>

                                <div onClick={(e) => e.stopPropagation()}>
                                    {user?.role === 'student' ? (
                                        isEnrolled ? (
                                            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold px-3.5 py-2 rounded-xl border border-emerald-200 text-xs">
                                                <CheckCircle size={14} /> Enrolled
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => handleEnroll(course._id, e)}
                                                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl shadow-md transition text-xs"
                                            >
                                                <GraduationCap size={14} /> Enroll Now
                                            </button>
                                        )
                                    ) : (
                                        <div className="text-xs font-bold text-slate-400 py-1">
                                            Instructor View Mode
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Courses;