import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Users, ArrowLeft, Mail, User, AlertCircle } from 'lucide-react';

const CourseStudents = () => {
    const { id } = useParams(); // Course ID from URL
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await api.get(`/courses/${id}/students`);
                setStudents(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch enrolled students.');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [id]);

    if (loading) {
        return <div className="text-center py-20 font-bold text-slate-500">Loading enrolled students...</div>;
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
            
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition mb-6"
            >
                <ArrowLeft size={16} /> Back to Dashboard
            </button>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
                            <Users className="text-blue-600" size={28} /> Enrolled Students
                        </h1>
                        <p className="text-sm font-medium text-slate-500 mt-1">List of students currently enrolled in this course.</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-100">
                        Total: {students.length}
                    </span>
                </div>

                {error && (
                    <div className="m-6 flex items-start gap-3 rounded-xl bg-red-50 p-4 border border-red-100 text-red-700 text-sm font-semibold">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Students Table */}
                {students.length === 0 ? (
                    <div className="text-center py-16 text-slate-400 font-medium">
                        No students have enrolled in this course yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
                                    <th className="py-4 px-6">#</th>
                                    <th className="py-4 px-6">Student Name</th>
                                    <th className="py-4 px-6">Email Address</th>
                                    <th className="py-4 px-6">Enrolled Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                                {students.map((item, index) => (
                                    <tr key={item._id} className="hover:bg-slate-50/50 transition">
                                        <td className="py-4 px-6 text-slate-400 font-bold">{index + 1}</td>
                                        <td className="py-4 px-6 flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100">
                                                {item.student?.username?.charAt(0)?.toUpperCase() || <User size={16} />}
                                            </div>
                                            <span className="font-bold text-slate-900">{item.student?.username || 'Unknown'}</span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-500">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Mail size={14} className="text-slate-400" /> {item.student?.email || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-400">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
};

export default CourseStudents;