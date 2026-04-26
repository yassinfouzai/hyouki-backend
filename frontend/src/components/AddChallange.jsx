import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { addChallenge } from '../challengeStore';

const CATEGORIES = ['anime', 'manga', 'picture', 'audio', 'video', 'text'];
const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];
const CHALLENGE_TYPES = ['text', 'image', 'audio', 'video'];

function getTypeIcon(type) {
    switch (type) {
        case 'text': return '📝';
        case 'image': return '🖼️';
        case 'audio': return '🔊';
        case 'video': return '🎬';
        default: return '📝';
    }
}

export default function AddChallenge() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const dropZoneRef = useRef(null);

    const [formData, setFormData] = useState({
        type: 'text',
        content: '',
        correctAnswer: '',
        category: 'text',
        level: 'N5',
    });

    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleTypeChange = (type) => {
        setFormData((prev) => ({ ...prev, type, content: '' }));
        setPreviewUrl(null);
        if (type === 'text') {
            setFormData((prev) => ({ ...prev, category: 'text' }));
        }
    };

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    }, []);

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file) => {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setFormData((prev) => ({ ...prev, content: url }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.content && formData.type !== 'text') {
            newErrors.content = 'Please upload a file';
        }
        if (formData.type === 'text' && !formData.content.trim()) {
            newErrors.content = 'Please enter the challenge text';
        }
        if (!formData.correctAnswer.trim()) {
            newErrors.correctAnswer = 'Please enter the correct answer';
        }
        if (!formData.category) {
            newErrors.category = 'Please select a category';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        const newChallenge = addChallenge(formData);
        console.log('New challenge created:', newChallenge);

        setTimeout(() => {
            setIsSubmitting(false);
            navigate('/community');
        }, 500);
    };

    const renderMediaInput = () => {
        switch (formData.type) {
            case 'text':
                return (
                    <div className="form-group">
                        <label htmlFor="content">Challenge Text *</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="Enter the Japanese text for the challenge..."
                            className={`form-textarea ${errors.content ? 'error' : ''}`}
                            rows={4}
                        />
                        {errors.content && <span className="error-message">{errors.content}</span>}
                    </div>
                );
            case 'image':
            case 'audio':
            case 'video':
                return (
                    <div className="form-group">
                        <label>Upload {formData.type === 'image' ? 'Image' : formData.type === 'audio' ? 'Audio' : 'Video'} *</label>
                        <div
                            ref={dropZoneRef}
                            className={`drop-zone ${dragActive ? 'active' : ''} ${errors.content ? 'error' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept={
                                    formData.type === 'image'
                                        ? 'image/*'
                                        : formData.type === 'audio'
                                        ? 'audio/*'
                                        : 'video/*'
                                }
                                onChange={handleFileInput}
                                className="file-input"
                            />
                            {previewUrl ? (
                                <div className="preview-container">
                                    {formData.type === 'image' && (
                                        <img src={previewUrl} alt="Preview" className="media-preview" />
                                    )}
                                    {formData.type === 'audio' && (
                                        <div className="audio-preview">
                                            <span className="preview-icon">🔊</span>
                                            <span>Audio file selected</span>
                                            <audio controls src={previewUrl} className="audio-player" />
                                        </div>
                                    )}
                                    {formData.type === 'video' && (
                                        <div className="video-preview">
                                            <span className="preview-icon">🎬</span>
                                            <span>Video file selected</span>
                                            <video controls src={previewUrl} className="video-player" />
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className="remove-file-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPreviewUrl(null);
                                            setFormData((prev) => ({ ...prev, content: '' }));
                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = '';
                                            }
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <div className="drop-zone-content">
                                    <span className="drop-icon">{getTypeIcon(formData.type)}</span>
                                    <p className="drop-text">
                                        Drag & drop your {formData.type} here
                                    </p>
                                    <p className="drop-hint">or click to browse</p>
                                </div>
                            )}
                        </div>
                        {errors.content && <span className="error-message">{errors.content}</span>}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="add-challenge-container">
            <div className="add-challenge-header">
                <h1 className="add-challenge-title">Create New Challenge</h1>
                <p className="add-challenge-subtitle">
                    Share your own Japanese challenge with the community!
                </p>
            </div>

            <form className="challenge-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h2 className="form-section-title">Challenge Type</h2>
                    <div className="type-selector">
                        {CHALLENGE_TYPES.map((type) => (
                            <button
                                key={type}
                                type="button"
                                className={`type-btn ${formData.type === type ? 'active' : ''}`}
                                onClick={() => handleTypeChange(type)}
                            >
                                <span className="type-icon">{getTypeIcon(type)}</span>
                                <span className="type-label">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-section">
                    <h2 className="form-section-title">Challenge Content</h2>
                    {renderMediaInput()}
                </div>

                <div className="form-section">
                    <h2 className="form-section-title">Challenge Details</h2>

                    <div className="form-row">
                        <div className="form-group half">
                            <label htmlFor="category">Category *</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className={`form-select ${errors.category ? 'error' : ''}`}
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>
                            {errors.category && <span className="error-message">{errors.category}</span>}
                        </div>

                        <div className="form-group half">
                            <label htmlFor="level">JLPT Level *</label>
                            <select
                                id="level"
                                name="level"
                                value={formData.level}
                                onChange={handleInputChange}
                                className="form-select"
                            >
                                {JLPT_LEVELS.map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="correctAnswer">Correct Answer *</label>
                        <input
                            type="text"
                            id="correctAnswer"
                            name="correctAnswer"
                            value={formData.correctAnswer}
                            onChange={handleInputChange}
                            placeholder="Enter the correct reading (hiragana/katakana)..."
                            className={`form-input ${errors.correctAnswer ? 'error' : ''}`}
                        />
                        {errors.correctAnswer && <span className="error-message">{errors.correctAnswer}</span>}
                        <p className="form-hint">
                            This is what users will need to type to complete the challenge.
                        </p>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/community')}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary btn-large"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating...' : 'Create Challenge'}
                    </button>
                </div>
            </form>
        </div>
    );
}
