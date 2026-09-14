import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import CTASection from '../components/home/CTASection';

const Home = () => {
    return (
        <main className="min-h-[calc(100vh-72px)] bg-white">
            <Hero />
            <Features />
            <CTASection />
        </main>
    );
};

export default Home;