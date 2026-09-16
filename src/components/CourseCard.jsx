import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, CheckCircle, Eye, Pencil, Trash2, Users } from 'lucide-react';

const CourseCard = ({ 
    course, 
    userRole, 
    isEnrolled, 
    onEnroll, 
    onEdit, 
    onDelete,
    onViewStudents 
}) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/courses/${course._id}`)}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-200 group"
        >
            <div>
                <div className="flex items-center justify-between mb-3">
                    {/* Course Category Badge */}
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        <BookOpen size={14} /> {course.category || 'Course'}
                    </span>
                    
                    {/* Instructor Actions or Instructor Name */}
                    {userRole === 'instructor' && (onEdit || onDelete) ? (
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            {onEdit && (
                                <button 
                                    onClick={onEdit} 
                                    className="text-slate-400 hover:text-blue-600 transition p-1.5 rounded-lg hover:bg-blue-50"
                                    title="Edit Course"
                                >
                                    <Pencil size={18} />
                                </button>
                            )}
                            {onDelete && (
                                <button 
                                    onClick={onDelete} 
                                    className="text-slate-400 hover:text-red-600 transition p-1.5 rounded-lg hover:bg-red-50"
                                    title="Delete Course"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ) : (
                        <span className="text-xs font-semibold text-slate-400">
                            By {course.instructor?.username || 'Instructor'}
                        </span>
                    )}
                </div>

                {/* Course Title and Description */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                    {course.description}
                </p>

                {/* Course Content Preview */}
                <div className="bg-slate-50 rounded-xl p-3 text-xs font-medium text-slate-700 mb-4 line-clamp-2">
                    <strong>Content:</strong> {course.content}
                </div>
            </div>

            {/* Card Footer: View Details and Role-based Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                    <Eye size={14} /> View Details
                </span>

                <div onClick={(e) => e.stopPropagation()}>
                    {userRole === 'student' ? (
                        isEnrolled ? (
                            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold px-3.5 py-2 rounded-xl border border-emerald-200 text-xs">
                                <CheckCircle size={14} /> Enrolled
                            </div>
                        ) : (
                            <button
                                onClick={onEnroll}
                                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl shadow-md transition text-xs"
                            >
                                <GraduationCap size={14} /> Enroll Now
                            </button>
                        )
                    ) : userRole === 'instructor' ? (
                        /* View Students Button for Instructor Dashboard */
                        <button
                            onClick={onViewStudents}
                            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-bold px-3.5 py-2 rounded-xl border border-slate-200 transition text-xs"
                        >
                            <Users size={14} /> View Students
                        </button>
                    ) : (
                        <div className="text-xs font-bold text-slate-400 py-1">
                            Guest View
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CourseCard;