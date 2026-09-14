import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    UserPlus, 
    Mail, 
    Lock, 
    User, 
    GraduationCap, 
    Briefcase,
    ArrowRight,
    AlertCircle,
    Sparkles,
    ShieldCheck,
    Eye,
    EyeOff,
    X
} from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('student');
    
    // Password visibility toggle states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Auto-hide error toast after 4 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        
        if (password !== confirmPassword) {
            setError('Passwords do not match. Please try again.');
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await api.post('/auth/register', { username, email, password, role });
            login(response.data);
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        /* Fixed height container to fit screen perfectly */
        <div className="flex h-[calc(100vh-72px)] bg-slate-50 font-sans overflow-hidden">
            
            {/* --- Beautiful Toast Notification --- */}
            {error && (
                <div className="fixed top-6 right-6 z-50 flex max-w-sm items-center gap-3 rounded-xl bg-white/95 p-3.5 pr-4 shadow-2xl shadow-red-900/10 backdrop-blur-xl border border-red-100 animate-in slide-in-from-top-8 fade-in duration-300">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <AlertCircle size={20} />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-800">Registration Failed</h4>
                        <p className="text-xs font-medium text-slate-500 mt-0.5 leading-snug">{error}</p>
                    </div>
                    <button 
                        onClick={() => setError('')} 
                        className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
            
            {/* --- Left Side - Image & Branding --- */}
            <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" 
                    alt="Students collaborating" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay scale-105 transition-transform duration-[20s] hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/80 to-blue-900/40"></div>
                
                {/* Adjusted padding to fit nicely */}
                <div className="relative z-10 flex flex-col justify-center p-12 xl:p-16 w-full h-full">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-8 xl:p-10 rounded-[2rem] shadow-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1.5 backdrop-blur-md border border-white/20 text-white w-max">
                            <Sparkles size={14} className="text-blue-300" />
                            <span className="text-xs font-semibold tracking-wide">Join 10,000+ Learners</span>
                        </div>
                        <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-[1.15] mb-4">
                            Start your <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">learning journey</span> today.
                        </h1>
                        <p className="text-base text-slate-300 font-medium leading-relaxed max-w-sm">
                            Access world-class courses, track your progress, and achieve your goals with LearnHub's AI-powered platform.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Right Side - Form --- */}
            {/* Added overflow-y-auto for smaller screens, perfect centering on desktop */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative overflow-y-auto">
                
                {/* Subtle Background Elements */}
                <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Form Card - Made slightly more compact */}
                <div className="w-full max-w-[420px] bg-white p-7 sm:p-8 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative z-10 my-auto">
                    
                    <div className="mb-6 text-center lg:text-left">
                        <div className="lg:hidden mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
                            <UserPlus size={24} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Create an account</h2>
                        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1.5">Enter your details below to get started</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        
                        {/* Name Input */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name / Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                    <User size={16} />
                                </div>
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal"
                                    placeholder="e.g. Chiran Vidanagamage"
                                    required 
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                    <Mail size={16} />
                                </div>
                                <input 
                                    type="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal"
                                    placeholder="chiran@example.com"
                                    required 
                                />
                            </div>
                        </div>

                        {/* Password Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                        <Lock size={16} />
                                    </div>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="••••••••"
                                        minLength="6"
                                        required 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <input 
                                        type={showConfirmPassword ? "text" : "password"} 
                                        value={confirmPassword} 
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                        className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/10 focus:border-blue-500 transition-all outline-none font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal"
                                        placeholder="••••••••"
                                        minLength="6"
                                        required 
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="pt-1">
                            <label className="block text-xs font-bold text-slate-700 mb-2">I want to use LearnHub as a:</label>
                            <div className="grid grid-cols-2 gap-3">
                                <div 
                                    onClick={() => setRole('student')}
                                    className={`cursor-pointer rounded-xl border-2 p-2.5 sm:p-3 flex items-center gap-2.5 transition-all duration-200 ${
                                        role === 'student' 
                                        ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                                        : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className={`p-2 rounded-full shrink-0 transition-colors ${role === 'student' ? 'bg-blue-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>
                                        <GraduationCap size={16} />
                                    </div>
                                    <span className={`text-xs sm:text-sm font-bold ${role === 'student' ? 'text-blue-900' : 'text-slate-600'}`}>
                                        Student
                                    </span>
                                </div>

                                <div 
                                    onClick={() => setRole('instructor')}
                                    className={`cursor-pointer rounded-xl border-2 p-2.5 sm:p-3 flex items-center gap-2.5 transition-all duration-200 ${
                                        role === 'instructor' 
                                        ? 'border-indigo-600 bg-indigo-50/50 shadow-sm' 
                                        : 'border-slate-100 bg-slate-50/50 hover:border-slate-200 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className={`p-2 rounded-full shrink-0 transition-colors ${role === 'instructor' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>
                                        <Briefcase size={16} />
                                    </div>
                                    <span className={`text-xs sm:text-sm font-bold ${role === 'instructor' ? 'text-indigo-900' : 'text-slate-600'}`}>
                                        Instructor
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="group w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 sm:py-3.5 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                            {!isLoading && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs sm:text-sm font-medium text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700 hover:underline underline-offset-2 transition-colors">
                            Log in here
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;