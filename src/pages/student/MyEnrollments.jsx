import { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import api from '../../api/axios';
import CourseCard from '../../components/CourseCard';

const MyEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch enrolled courses for the student
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
                            <CourseCard 
                                key={item._id}
                                course={course}
                                userRole="student"
                                isEnrolled={true} 
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyEnrollments;