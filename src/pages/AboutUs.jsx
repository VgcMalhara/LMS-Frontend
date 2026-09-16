import { GraduationCap, BookOpen, Brain, ShieldCheck, Award, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    // Core values or highlights of the platform
    const highlights = [
        {
            icon: BookOpen,
            title: "Practical Curriculum",
            description: "Industry-standard courses designed to bridge the gap between theoretical knowledge and real-world execution."
        },
        {
            icon: Brain,
            title: "AI-Powered Guidance",
            description: "Integrated ChatGPT AI advisor to help students discover personalized learning paths tailored to their exact career goals."
        },
        {
            icon: ShieldCheck,
            title: "Role-Based Access",
            description: "Seamless and secure experiences customized specifically for both ambitious learners and professional instructors."
        },
        {
            icon: Award,
            title: "Quality Learning",
            description: "A streamlined platform focused on monitoring daily progress, structured syllabi, and interactive student engagement."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            
            {/* Hero Header Section */}
            <section className="relative py-20 bg-slate-950 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 pointer-events-none" />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 border border-blue-500/20 backdrop-blur-md mb-6">
                        <GraduationCap size={18} className="text-blue-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-300">About LearnHub</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                        Empowering Futures Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Smart Education</span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                        LearnHub is a next-generation Learning Management System built to provide immersive, expert-led education combined with intelligent career path recommendations.
                    </p>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Our Mission</h2>
                        <p className="text-slate-600 font-medium leading-relaxed mb-6">
                            We aim to democratize quality tech and professional education by connecting passionate instructors with eager learners worldwide. Through a clean interface, robust course tracking, and smart AI assistance, we make learning structured, accessible, and results-driven.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <Users className="text-blue-600" size={24} />
                                <span className="text-sm font-bold text-slate-800">Community Driven</span>
                            </div>
                            <div className="h-4 w-px bg-slate-200" />
                            <div className="flex items-center gap-3">
                                <Brain className="text-purple-600" size={24} />
                                <span className="text-sm font-bold text-slate-800">AI Enabled</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Why LearnHub Stands Out</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                            Whether you are an instructor looking to publish comprehensive course syllabi or a student tracking your daily enrollment progress, LearnHub offers a unified, secure platform tailored for success.
                        </p>
                        <Link 
                            to="/courses"
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 text-sm shadow-md transition"
                        >
                            Explore Our Courses <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core Features Grid */}
            <section className="py-20 bg-slate-50/50 border-y border-slate-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">What Drives Us Forward</h2>
                        <p className="text-slate-500 font-medium mt-2">Built with modern architecture and user-centric features.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {highlights.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm transition hover:shadow-md">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;