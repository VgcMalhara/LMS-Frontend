import { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, CheckCircle } from 'lucide-react';
import api from '../../api/axios';

const MyEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await api.get('/courses/my-enrollments');
                setEnrollments(response.data);
            } catch (err) {
                console.error('Failed to load enrollments', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollments();
    }, []);

    if (loading) return <div className="text-center py-20 font-bold text-slate-500">Loading your learning...</div>;

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">My Enrollments</h1>
                <p className="text-sm font-medium text-slate-500 mt-1">Courses you are currently enrolled in.</p>
            </div>

            {enrollments.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
                    <GraduationCap size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-bold text-slate-700">No enrollments yet</h3>
                    <p className="text-sm text-slate-500 mt-1">Explore courses and start learning today!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrollments.map((item) => {
                        const course = item.course;
                        if (!course) return null;

                        return (
                            <div key={item._id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                            <CheckCircle size={14} /> Enrolled
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                                    <p className="text-sm text-slate-600 mb-4">{course.description}</p>
                                    <div className="bg-slate-50 rounded-xl p-3 text-xs font-medium text-slate-700 mb-4">
                                        <strong>Content:</strong> {course.content}
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-100 text-xs font-semibold text-blue-600">
                                    Access Granted
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyEnrollments;