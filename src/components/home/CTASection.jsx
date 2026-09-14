import { Link } from 'react-router-dom';
import { UserPlus, ArrowRight } from 'lucide-react';

const CTASection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-16 sm:p-16 text-center shadow-xl">
                    
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                            Ready to transform your future?
                        </h2>
                        <p className="text-blue-100 font-medium text-base sm:text-lg mb-8">
                            Join thousands of students and instructors already building their skills on LearnHub. Get started in seconds.
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-600 shadow-md transition-all hover:bg-slate-100 hover:scale-105"
                        >
                            <UserPlus size={20} />
                            Get Started Now
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CTASection;