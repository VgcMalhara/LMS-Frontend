import { useState, useEffect, useContext } from 'react';
import api from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import CourseCard from '../../components/CourseCard';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [enrolledIds, setEnrolledIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

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

    const handleEnroll = async (courseId, e) => {
        e.stopPropagation();
        try {
            await api.post(`/courses/${courseId}/enroll`);
            setEnrolledIds([...enrolledIds, courseId]);
            alert('Successfully enrolled in the course!');
        } catch (err) {
            alert(err.response?.data?.message || 'Enrollment failed');
        }
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