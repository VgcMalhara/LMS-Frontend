import { BookOpen, Brain, ShieldCheck, Users } from 'lucide-react';

const Features = () => {
    const featuresList = [
        {
            icon: BookOpen,
            title: "Expert-Led Courses",
            description: "Learn from comprehensive courses created by experienced instructors across various domains.",
            color: "bg-blue-50 text-blue-600 border-blue-100"
        },
        {
            icon: Brain,
            title: "Smart AI Recommendations",
            description: "Not sure what to learn? Use our integrated ChatGPT AI advisor to get tailored course paths for your career.",
            color: "bg-violet-50 text-violet-600 border-violet-100"
        },
        {
            icon: ShieldCheck,
            title: "Secure Enrollment",
            description: "Role-based access control and JWT authentication ensure your learning journey is safe and personalized.",
            color: "bg-emerald-50 text-emerald-600 border-emerald-100"
        },
        {
            icon: Users,
            title: "Interactive Management",
            description: "Instructors can easily manage course contents while students track their enrolled learning progress seamlessly.",
            color: "bg-amber-50 text-amber-600 border-amber-100"
        }
    ];

    return (
        <section className="py-20 bg-slate-50/50 border-y border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Why Choose LearnHub?</h2>
                    <p className="text-slate-500 font-medium mt-3">Everything you need to boost your professional career in one unified platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuresList.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-6 ${feature.color}`}>
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Features;