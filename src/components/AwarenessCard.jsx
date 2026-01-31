import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * AwarenessCard Component
 * Displays awareness information with image, description, and expandable YouTube links
 * Uses accordion-style dropdown for "Show More" functionality
 */
function AwarenessCard({
    image,
    title,
    description,
    youtubeLinks = [],
    cardIndex
}) {
    const { t } = useTranslation()
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                {/* Image */}
                <div className="position-relative" style={{ height: '200px' }}>
                    <img
                        src={image}
                        alt={title}
                        className="card-img-top h-100 w-100 object-fit-cover"
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"></div>
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-success fw-bold mb-3">
                        {title}
                    </h5>

                    <p className="card-text text-muted flex-grow-1">
                        {description}
                    </p>

                    {/* Show More Button */}
                    {youtubeLinks.length > 0 && (
                        <div className="mt-auto">
                            <button
                                className="btn btn-outline-success w-100 rounded-pill"
                                type="button"
                                onClick={toggleExpanded}
                                aria-expanded={isExpanded}
                            >
                                {isExpanded ? t('awareness.hideMore') : t('awareness.showMore')}
                                <i className={`ms-2 fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                            </button>

                            {/* Accordion Content */}
                            <div
                                className={`collapse ${isExpanded ? 'show' : ''}`}
                                id={`awareness-${cardIndex}`}
                            >
                                <div className="mt-3">
                                    <h6 className="text-success mb-3">
                                        <i className="fab fa-youtube me-2"></i>
                                        {t('awareness.relatedVideos')}
                                    </h6>
                                    <div className="list-group list-group-flush">
                                        {youtubeLinks.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="list-group-item list-group-item-action border-0 px-0 py-2"
                                            >
                                                <div className="d-flex align-items-center">
                                                    <i className="fab fa-youtube text-danger me-3"></i>
                                                    <div className="flex-grow-1">
                                                        <div className="fw-semibold text-dark">
                                                            {link.title}
                                                        </div>
                                                        <small className="text-muted">
                                                            {link.duration || 'Watch Now'}
                                                        </small>
                                                    </div>
                                                    <i className="fas fa-external-link-alt text-muted"></i>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AwarenessCard
