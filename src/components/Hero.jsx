import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Hero Component
 * Main banner section with title, subtitle, and placeholder image
 * Uses Bootstrap responsive image and grid system
 */
function Hero() {
    const { t } = useTranslation()
    return (
        <section id="hero" className="hero-section bg-light py-5">
            <div className="container">
                <div className="row align-items-center">
                    {/* Text content */}
                    <div className="col-lg-6">
                        <h1 className="display-4 fw-bold text-success mb-3">
                            {t('hero.title')}
                        </h1>
                        <p className="lead text-muted mb-4">
                            {t('hero.subtitle')}
                        </p>
                        <div className="d-flex gap-3">
                            <button className="btn btn-success btn-lg rounded">
                                {t('hero.getStarted')}
                            </button>
                            <button className="btn btn-outline-success btn-lg rounded">
                                {t('hero.learnMore')}
                            </button>
                        </div>
                    </div>

                    {/* Placeholder image */}
                    <div className="col-lg-6">
                        <div className="text-center">
                            <img
                                src="https://placehold.co/600x400/28a745/ffffff?text=KrishiSetu+Hero+Image"
                                alt="KrishiSetu Hero"
                                className="img-fluid rounded shadow rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
