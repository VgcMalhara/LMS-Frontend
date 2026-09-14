import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, User, CheckCircle2, Layers, GraduationCap, Loader2, Pencil, Trash2 } from 'lucide-react';
import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [error, setError] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                // 1. සියලුම courses ලබාගෙන අදාළ id එක සොයාගැනීම
                const coursesRes = await api.get('/courses');
                const foundCourse = coursesRes.data.find(c => c._id === id);

                if (!foundCourse) {
                    setError('Course not found.');
                    setLoading(false);
                    return;
                }

                setCourse(foundCourse);

                // 2. Student කෙනෙක් නම්, ඔහු/ඇය දැනටමත් මෙම course එකට enroll වී ඇත්දැයි පරීක්ෂා කිරීම
                if (user?.role === 'student') {
                    const enrollRes = await api.get('/courses/my-enrollments');
                    const enrolled = enrollRes.data.some(item => item.course?._id === id);
                    setIsEnrolled(enrolled);
                }
            } catch (err) {
                setError('Failed to load course details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id, user]);

    // Enroll handler function for students
    const handleEnroll = async () => {
        setEnrolling(true);
        try {
            await api.post(`/courses/${id}/enroll`);
            setIsEnrolled(true);
            alert('Successfully enrolled in the course!');
        } catch (err) {
            alert(err.response?.data?.message || 'Enrollment failed');
        } finally {
            setEnrolling(false);
        }
    };

    // Delete handler for instructors
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await api.delete(`/courses/${id}`);
                alert('Course deleted successfully');
                navigate('/instructor-dashboard');
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to delete course');
            }
        }
    };

    if (loading) {
        return <div className="text-center py-20 font-bold text-slate-500 animate-pulse">Loading course details...</div>;
    }

    if (error || !course) {
        return (
            <div className="flex h-[calc(100vh-72px)] items-center justify-center bg-slate-50 px-4">
                <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
                    <p className="text-sm text-slate-500 mb-6">{error || 'Course not found.'}</p>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md hover:bg-blue-700 transition"
                    >
                        <ArrowLeft size={16} /> Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Check if the logged-in user is the creator of this course
    const isOwner = user?.role === 'instructor' && course.instructor?._id === user?._id;

    return (
        <div className="min-h-[calc(100vh-72px)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 mb-6 transition-colors"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                {/* Course Header Card */}
                <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-700 border border-blue-100">
                                <Layers size={14} /> {course.category || 'General Course'}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-100">
                                Free Access
                            </span>
                        </div>

                        {/* Role-based Action Buttons */}
                        <div>
                            {user?.role === 'student' && (
                                isEnrolled ? (
                                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-bold px-5 py-2.5 rounded-xl border border-emerald-200 text-sm">
                                        <CheckCircle2 size={18} /> Enrolled
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleEnroll}
                                        disabled={enrolling}
                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transition text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 text-sm disabled:opacity-50"
                                    >
                                        {enrolling ? <Loader2 size={18} className="animate-spin" /> : <GraduationCap size={18} />}
                                        {enrolling ? 'Enrolling...' : 'Enroll Now'}
                                    </button>
                                )
                            )}

                            {isOwner && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => navigate(`/edit-course/${course._id}`)}
                                        className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold px-4 py-2.5 rounded-xl border border-blue-200 text-sm transition"
                                    >
                                        <Pencil size={16} /> Edit Course
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 hover:bg-red-100 font-bold px-4 py-2.5 rounded-xl border border-red-200 text-sm transition"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            )}

                            {!user?.role && (
                                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
                                    Guest View
                                </span>
                            )}
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">{course.title}</h1>
                    <p className="text-base text-slate-600 leading-relaxed mb-6">{course.description}</p>

                    <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 font-bold">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400">Created by Instructor</p>
                            <p className="text-sm font-bold text-slate-800">{course.instructor?.username || 'Instructor'}</p>
                        </div>
                    </div>
                </div>

                {/* Course Content / Curriculum Section */}
                <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <BookOpen size={20} />
                        </div>
                        <h2 className="text-xl font-extrabold text-slate-900">Course Curriculum & Materials</h2>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">
                        {course.content || 'No detailed content provided yet.'}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CourseDetails;