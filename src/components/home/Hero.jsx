import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen, Brain, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const Hero = () => {
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
            tag: "Next-Gen LMS Platform",
            title: "Empower Your Future with",
            highlight: "AI-Driven Learning",
            description: "Discover expert-led courses, seamless interactive tracking, and personalized career pathways tailored just for you."
        },
        {
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
            tag: "World-Class Instructors",
            title: "Master In-Demand Skills",
            highlight: "From Industry Experts",
            description: "Build robust full-stack applications, understand database architecture, and get certified at your own pace."
        },
        {
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
            tag: "Smart Career Advice",
            title: "Accelerate Your Growth",
            highlight: "With ChatGPT Integration",
            description: "Get real-time course recommendations and intelligent advice based on your exact career objectives."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

    return (
        // h-[calc(100vh-72px)] screen fit
        <section className="relative w-full h-[calc(100vh-72px)] min-h-[550px] max-h-[850px] overflow-hidden bg-slate-950 flex items-center">
            
            {/* Background Slides Container with Absolute Positioning to prevent height jumping */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                    {/* Dark & Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60 z-10" />
                    <img
                        src={slide.image}
                        alt="Background Slide"
                        className="w-full h-full object-cover object-center transform scale-105 animate-pulse-slow"
                    />
                </div>
            ))}

            {/* Main Content Container */}
            <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center py-6">
                <div className="max-w-2xl">
                    
                    {/* Animated Tag / Badge */}
                    <div key={`tag-${currentIndex}`} className="animate-in fade-in slide-in-from-bottom-2 duration-500 mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 border border-white/20 backdrop-blur-md shadow-lg w-max">
                        <Sparkles size={16} className="text-blue-400" />
                        <span className="text-xs font-bold tracking-wider uppercase text-blue-200">
                            {slides[currentIndex].tag}
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 key={`title-${currentIndex}`} className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
                        {slides[currentIndex].title} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                            {slides[currentIndex].highlight}
                        </span>
                    </h1>

                    {/* Description */}
                    <p key={`desc-${currentIndex}`} className="animate-in fade-in slide-in-from-bottom-5 duration-900 text-sm sm:text-base text-slate-300 font-medium mb-8 max-w-xl leading-relaxed">
                        {slides[currentIndex].description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <Link
                            to="/courses"
                            className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-blue-600/50"
                        >
                            <BookOpen size={20} />
                            Explore Courses
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            to="/ai-advisor"
                            className="flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-7 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-white/20 hover:border-white/40 hover:scale-105"
                        >
                            <Brain size={20} className="text-purple-400" />
                            AI Advisor
                        </Link>
                    </div>

                    {/* Mini Feature Highlights */}
                    <div className="mt-8 hidden sm:flex items-center gap-6 pt-6 border-t border-white/10 text-xs font-semibold text-slate-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-blue-400" />
                            <span>JWT Secure Auth</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-indigo-400" />
                            <span>Role-Based Access</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-purple-400" />
                            <span>ChatGPT Powered</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Carousel Navigation Controls */}
            <div className="absolute bottom-6 right-8 z-30 hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2 mr-4">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/30 hover:bg-white/60'
                            }`}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
                
                <button
                    onClick={prevSlide}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                    aria-label="Previous Slide"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={nextSlide}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                    aria-label="Next Slide"
                >
                    <ChevronRight size={18} />
                </button>
            </div>

        </section>
    );
};

export default Hero;