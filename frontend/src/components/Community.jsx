import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { getChallenges } from '../challengeStore';

const CATEGORIES = ['all', 'anime', 'manga', 'picture', 'audio', 'video', 'text'];
const JLPT_LEVELS = ['all', 'N5', 'N4', 'N3', 'N2', 'N1'];

function getTypeIcon(type) {
    switch (type) {
        case 'text': return '📝';
        case 'image': return '🖼️';
        case 'audio': return '🔊';
        case 'video': return '🎬';
        default: return '📝';
    }
}

function ChallengeCard({ challenge }) {
    return (
        <Link to={`/challenge/${challenge.id}`} className="challenge-card-link">
            <div className="challenge-card">
                <div className="challenge-card-media">
                    {challenge.type === 'text' && (
                        <div className="challenge-text-preview">{challenge.content}</div>
                    )}
                    {challenge.type === 'image' && challenge.content && (
                        <img src={challenge.content} alt="Challenge" className="challenge-image-preview" />
                    )}
                    {(challenge.type === 'audio' || challenge.type === 'video' || (challenge.type === 'image' && !challenge.content)) && (
                        <div className="challenge-placeholder">
                            <span className="challenge-icon">{getTypeIcon(challenge.type)}</span>
                            <span className="challenge-type-label">{challenge.type}</span>
                        </div>
                    )}
                </div>

                <div className="challenge-card-info">
                    <div className="challenge-card-header">
                        <span className={`challenge-level-badge level-${challenge.level.toLowerCase()}`}>
                            {challenge.level}
                        </span>
                        <span className="challenge-category">{challenge.category}</span>
                    </div>

                    <div className="challenge-card-stats">
                        <span className="challenge-success-rate">
                            Success: {challenge.successRate}%
                        </span>
                        <span className="challenge-author">by {challenge.author}</span>
                    </div>

                    <div className="challenge-card-date">
                        Added: {new Date(challenge.dateAdded).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function Community() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const filteredChallenges = getChallenges().filter((challenge) => {
        const categoryMatch = selectedCategory === 'all' || challenge.category === selectedCategory;
        const levelMatch = selectedLevel === 'all' || challenge.level === selectedLevel;
        return categoryMatch && levelMatch;
    });

    const totalPages = Math.ceil(filteredChallenges.length / itemsPerPage);
    const paginatedChallenges = filteredChallenges.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleLevelChange = (level) => {
        setSelectedLevel(level);
        setCurrentPage(1);
    };

    return (
        <div className="community-container">
            <div className="community-header">
                <div className="community-header-content">
                    <div>
                        <h1 className="community-title">Community Challenges</h1>
                        <p className="community-subtitle">
                            Practice with user-generated content. Test your skills with text, images, audio, and video!
                        </p>
                    </div>
                    <button
                        className="btn btn-primary create-challenge-btn"
                        onClick={() => navigate('/add-challenge')}
                    >
                        + Create Challenge
                    </button>
                </div>
            </div>

            <div className="community-filters">
                <div className="filter-group">
                    <label>Category:</label>
                    <div className="filter-buttons">
                        {CATEGORIES.map((category) => (
                            <button
                                key={category}
                                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <label>Level:</label>
                    <div className="filter-buttons">
                        {JLPT_LEVELS.map((level) => (
                            <button
                                key={level}
                                className={`filter-btn ${selectedLevel === level ? 'active' : ''}`}
                                onClick={() => handleLevelChange(level)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="challenges-grid">
                {paginatedChallenges.length > 0 ? (
                    paginatedChallenges.map((challenge) => (
                        <ChallengeCard key={challenge.id} challenge={challenge} />
                    ))
                ) : (
                    <div className="no-challenges">
                        <p>No challenges found matching your filters.</p>
                        <button
                            className="btn"
                            onClick={() => {
                                setSelectedCategory('all');
                                setSelectedLevel('all');
                                setCurrentPage(1);
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>

                    <div className="pagination-numbers">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        className="pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
