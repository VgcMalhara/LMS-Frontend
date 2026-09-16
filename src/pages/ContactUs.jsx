import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import api from '../api/axios';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // State for individual field validation errors
    const [formErrors, setFormErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState('');

    // Handle input field changes and clear respective error
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error for this field as user types
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' });
        }
    };

    // Comprehensive form validation logic
    const validateForm = () => {
        let errors = {};

        // Name validation
        if (!formData.name.trim()) {
            errors.name = 'Name is required.';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long.';
        }

        // Email validation using standard regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            errors.email = 'Email address is required.';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address.';
        }

        // Subject validation
        if (!formData.subject.trim()) {
            errors.subject = 'Subject is required.';
        } else if (formData.subject.trim().length < 5) {
            errors.subject = 'Subject must be at least 5 characters long.';
        }

        // Message validation
        if (!formData.message.trim()) {
            errors.message = 'Message content is required.';
        } else if (formData.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long.';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Returns true if no errors
    };

    // Handle contact form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        setSuccess(false);

        // Run validation check before submitting
        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            // Uncomment below when connecting to actual backend route
            // await api.post('/contact', formData);
            
            // Simulating network delay for professional UX
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setFormErrors({});
        } catch (err) {
            setServerError(err.response?.data?.message || 'Failed to send message. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-slate-50/50 min-h-screen py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 border border-blue-100 mb-4">
                        <MessageSquare size={16} className="text-blue-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Get in Touch</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">We'd Love to Hear From You</h1>
                    <p className="text-slate-500 font-medium mt-2">Have questions about our courses, AI advisor, or need technical support? Drop us a message.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Contact Information Cards */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                                <Mail size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Email Us</h3>
                            <p className="text-sm text-slate-500 font-medium mb-3">Our team is here to help.</p>
                            <span className="text-sm font-bold text-blue-600">support@learnhub.com</span>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
                                <Phone size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Call Us</h3>
                            <p className="text-sm text-slate-500 font-medium mb-3">Mon-Fri from 8am to 5pm.</p>
                            <span className="text-sm font-bold text-indigo-600">+94 (11) 234-5678</span>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-100">
                                <MapPin size={22} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">Office Location</h3>
                            <p className="text-sm text-slate-500 font-medium mb-3">Visit our headquarters.</p>
                            <span className="text-sm font-bold text-purple-600">Colombo, Sri Lanka</span>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-10">
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Send Us a Message</h2>
                        <p className="text-sm font-medium text-slate-500 mb-6">Fill out the form below and we’ll get back to you shortly.</p>

                        {success && (
                            <div className="mb-6 rounded-2xl bg-emerald-50 p-4 border border-emerald-100 flex items-center gap-3 text-emerald-800 text-sm font-bold animate-in fade-in">
                                <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                                <span>Thank you! Your message has been sent successfully. We will contact you soon.</span>
                            </div>
                        )}

                        {serverError && (
                            <div className="mb-6 rounded-2xl bg-red-50 p-4 border border-red-100 flex items-center gap-3 text-red-700 text-sm font-semibold">
                                <AlertCircle size={20} className="shrink-0" />
                                <span>{serverError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition outline-none font-medium text-slate-900 text-sm ${
                                            formErrors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'
                                        }`}
                                        placeholder="John Doe"
                                    />
                                    {formErrors.name && (
                                        <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                                            <AlertCircle size={14} /> {formErrors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition outline-none font-medium text-slate-900 text-sm ${
                                            formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'
                                        }`}
                                        placeholder="john@example.com"
                                    />
                                    {formErrors.email && (
                                        <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                                            <AlertCircle size={14} /> {formErrors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition outline-none font-medium text-slate-900 text-sm ${
                                        formErrors.subject ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'
                                    }`}
                                    placeholder="How can we help you?"
                                />
                                {formErrors.subject && (
                                    <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} /> {formErrors.subject}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition outline-none font-medium text-slate-900 text-sm resize-none ${
                                        formErrors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'
                                    }`}
                                    placeholder="Write your message here..."
                                />
                                {formErrors.message && (
                                    <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                                        <AlertCircle size={14} /> {formErrors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition hover:scale-105 active:scale-95 disabled:opacity-50"
                            >
                                {submitting ? (
                                    <span>Sending...</span>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ContactUs;