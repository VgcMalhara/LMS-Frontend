import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20">
                                <GraduationCap className="h-6 w-6" strokeWidth={2} />
                            </div>
                            <div className="text-xl font-extrabold tracking-tight text-white">
                                Learn<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Hub</span>
                            </div>
                        </Link>
                        <p className="text-sm font-medium text-slate-400 leading-relaxed">
                            Empowering students and professional instructors with next-generation MERN learning management tools and AI-driven guidance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2.5 text-sm font-medium">
                            <li>
                                <Link to="/" className="text-slate-400 hover:text-white transition">Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-slate-400 hover:text-white transition">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-slate-400 hover:text-white transition">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Platform Features */}
                    <div>
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">Features</h4>
                        <ul className="space-y-2.5 text-sm font-medium text-slate-400">
                            <li>AI Career & Course Advisor</li>
                            <li>Role-Based Dashboards</li>
                            <li>Interactive Course Syllabi</li>
                            <li>Secure Student Enrollments</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-4">Contact Info</h4>
                        <ul className="space-y-3 text-sm font-medium text-slate-400">
                            <li className="flex items-center gap-2.5">
                                <Mail size={16} className="text-blue-400 shrink-0" />
                                <span>support@learnhub.com</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Phone size={16} className="text-indigo-400 shrink-0" />
                                <span>+94 (11) 234-5678</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <MapPin size={16} className="text-purple-400 shrink-0" />
                                <span>Colombo, Sri Lanka</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
                    <p>© {new Date().getFullYear()} LearnHub. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Built with <Heart size={14} className="text-red-500 fill-red-500" /> for modern education
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;