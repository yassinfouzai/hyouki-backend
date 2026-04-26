import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchHome = async () => {
    const res = await fetch("http://127.0.0.1:8000/home/?format=json");
    if (!res.ok) throw new Error("Failed to fetch home");
    return res.json();
};


const HERO_SECTIONS = [
    {
        id: 'learn',
        icon: '📚',
        title: 'Master Hiragana & Katakana',
        description: 'Start your Japanese journey with our structured learning paths. Practice basic scripts, dakuten, handakuten, and combined characters with interactive drills.',
        features: ['46 Basic Characters', 'Dakuten & Handakuten', 'Yōon Combinations', 'Column-based Practice'],
        link: '/learn',
        linkText: 'Start Learning',
        color: '#4ade80',
    },
    {
        id: 'srs',
        icon: '🧠',
        title: 'Spaced Repetition System',
        description: 'Our intelligent SRS adapts to your performance, showing you characters you struggle with more frequently while spacing out those you know well.',
        features: ['Adaptive Learning', 'Intelligent Scheduling', 'Retention Optimization', 'Smart Reviews'],
        link: '/learn',
        linkText: 'Try SRS Practice',
        color: '#60a5fa',
    },
    {
        id: 'community',
        icon: '🌟',
        title: 'Community Challenges',
        description: 'Learn from real-world content created by the community. Practice with anime clips, manga panels, audio clips, and text challenges at your JLPT level.',
        features: ['Text Challenges', 'Image Recognition', 'Audio Practice', 'Video Content'],
        link: '/community',
        linkText: 'Explore Challenges',
        color: '#fbbf24',
    },
    {
        id: 'progress',
        icon: '📊',
        title: 'Track Your Progress',
        description: 'Create an account to save your learning progress, track your accuracy over time, and see which characters need more practice.',
        features: ['Personal Statistics', 'Accuracy Tracking', 'Progress History', 'Achievement Badges'],
        link: '/register',
        linkText: 'Create Account',
        color: '#a78bfa',
    },
];

const FEATURE_CARDS = [
    { icon: '✍️', title: 'Active Learning', desc: 'Type answers instead of just flipping cards' },
    { icon: '🎯', title: 'JLPT Aligned', desc: 'Content organized by official JLPT levels' },
    { icon: '🎌', title: 'IME Support', desc: 'Native Japanese input for authentic practice' },
    { icon: '♾️', title: 'Infinite Practice', desc: 'Never run out of content to study' },
];

function HeroCard({ section, reversed }) {
    return (
        <div className={`hero-card ${reversed ? 'reversed' : ''}`}>
            <div className="hero-content">
                <div className="hero-icon" style={{ color: section.color }}>
                    {section.icon}
                </div>
                <h2 className="hero-title">{section.title}</h2>
                <p className="hero-description">{section.description}</p>
                <ul className="hero-features">
                    {section.features.map((feature, idx) => (
                        <li key={idx} className="hero-feature">
                            <span className="feature-check" style={{ color: section.color }}>✓</span>
                            {feature}
                        </li>
                    ))}
                </ul>
                <Link
                    to={section.link}
                    className="hero-btn"
                    style={{ backgroundColor: section.color }}
                >
                    {section.linkText} →
                </Link>
            </div>
            <div className="hero-visual" style={{ borderColor: section.color }}>
                <span className="visual-icon">{section.icon}</span>
            </div>
        </div>
    );
}

export default function Home() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["home"],
        queryFn: fetchHome,
    });
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Failed to load home data</div>;

    return (<p className="api-message">
    {data?.message}
    </p>);
    /**
    return (
        <div className="home-container">
            {//Main Hero}
            <section className="main-hero">
                <div className="main-hero-content">
                    <h1 className="main-title">
                        Learn Japanese
                        <span className="title-accent">One Character at a Time</span>
                    </h1>
                    <p className="main-subtitle">
                        Master Hiragana, Katakana, and Kanji through interactive practice,
                        community challenges, and intelligent spaced repetition.
                    </p>
                    <div className="hero-cta">
                        <Link to="/learn" className="hero-cta-primary">
                            Start Learning Now
                        </Link>
                        <Link to="/community" className="hero-cta-secondary">
                            Browse Challenges
                        </Link>
                    </div>
                </div>
                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-number">104+</span>
                        <span className="stat-label">Hiragana & Katakana</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">∞</span>
                        <span className="stat-label">Community Challenges</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">5</span>
                        <span className="stat-label">JLPT Levels</span>
                    </div>
                </div>
            </section>

            {// Feature Pills}
            <section className="feature-pills">
                {FEATURE_CARDS.map((card, idx) => (
                    <div key={idx} className="feature-pill">
                        <span className="pill-icon">{card.icon}</span>
                        <div className="pill-content">
                            <span className="pill-title">{card.title}</span>
                            <span className="pill-desc">{card.desc}</span>
                        </div>
                    </div>
                ))}
            </section>

            {//Hero Sections }
            <section className="hero-sections">
                <h2 className="section-heading">Why Choose Hyouki?</h2>
                {HERO_SECTIONS.map((section, idx) => (
                    <HeroCard
                        key={section.id}
                        section={section}
                        reversed={idx % 2 === 1}
                    />
                ))}
            </section>

            {//Challenge Types Showcase}
            <section className="challenge-showcase">
                <h2 className="section-heading">Practice with Real Content</h2>
                <div className="challenge-types">
                    <div className="challenge-type-card">
                        <span className="type-icon">📝</span>
                        <h3>Text</h3>
                        <p>Practice reading Japanese sentences and phrases</p>
                    </div>
                    <div className="challenge-type-card">
                        <span className="type-icon">🖼️</span>
                        <h3>Images</h3>
                        <p>Identify text in screenshots and photos</p>
                    </div>
                    <div className="challenge-type-card">
                        <span className="type-icon">🔊</span>
                        <h3>Audio</h3>
                        <p>Train your listening comprehension skills</p>
                    </div>
                    <div className="challenge-type-card">
                        <span className="type-icon">🎬</span>
                        <h3>Video</h3>
                        <p>Learn from anime clips and video content</p>
                    </div>
                </div>
            </section>

            {// Getting Started}
            <section className="getting-started">
                <h2 className="section-heading">Get Started in 3 Steps</h2>
                <div className="steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Choose Your Path</h3>
                        <p>Start with Hiragana/Katakana or jump into community challenges</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Practice Daily</h3>
                        <p>Use our SRS system to review characters at optimal intervals</p>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Track Progress</h3>
                        <p>Sign up to save your progress and see your improvement</p>
                    </div>
                </div>
            </section>

            {// Final CTA }
            <section className="final-cta">
                <div className="cta-content">
                    <h2>Ready to Start Learning Japanese?</h2>
                    <p>Join thousands of learners mastering Japanese one character at a time.</p>
                    <div className="cta-buttons">
                        <Link to="/register" className="cta-primary">
                            Create Free Account
                        </Link>
                        <Link to="/learn" className="cta-secondary">
                            Try Without Account
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    ); **/
}
