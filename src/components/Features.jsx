import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'

/**
 * Features Component
 * Displays 5 feature cards in a responsive grid
 * Each card has a placeholder title and description
 */
function Features() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const cardRefs = useRef([])

    // Feature data array
    const features = t('features.cards', { returnObjects: true })

    // GSAP hover effects
    useEffect(() => {
        const cards = cardRefs.current

        cards.forEach((card, index) => {
            if (!card) return

            const icon = card.querySelector('.display-4')
            const title = card.querySelector('.card-title')
            const description = card.querySelector('.card-text')

            // Set initial state
            gsap.set([icon, title, description], {
                transformOrigin: 'center center'
            })

            // Hover enter animation
            const handleMouseEnter = () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                })

                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 5,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                })

                gsap.to(title, {
                    color: '#198754',
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                })

                gsap.to(description, {
                    color: '#495057',
                    duration: 0.3,
                    ease: 'power2.out'
                })
            }

            // Hover leave animation
            const handleMouseLeave = () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                })

                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                })

                gsap.to(title, {
                    color: '#198754',
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                })

                gsap.to(description, {
                    color: '#6c757d',
                    duration: 0.3,
                    ease: 'power2.out'
                })
            }

            // Add event listeners
            card.addEventListener('mouseenter', handleMouseEnter)
            card.addEventListener('mouseleave', handleMouseLeave)

            // Cleanup
            return () => {
                card.removeEventListener('mouseenter', handleMouseEnter)
                card.removeEventListener('mouseleave', handleMouseLeave)
            }
        })
    }, [features])

    return (
        <section id="features" className="py-5 bg-white">
            <div className="container">
                {/* Section header */}
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center mb-5">
                        <h2 className="display-5 fw-bold text-success mb-3">
                            {t('features.heading')}
                        </h2>
                        <p className="lead text-muted">
                            {t('features.subheading')}
                        </p>
                    </div>
                </div>

                {/* Features grid */}
                <div className="row g-4 d-flex justify-content-center">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="col-lg-4 col-md-6"
                            onClick={() => {
                                if (feature.link) {
                                    navigate(feature.link)
                                }
                            }}
                        >
                            <div
                                ref={el => cardRefs.current[index] = el}
                                className="card h-100 shadow-sm border-5 border-success-subtle rounded-5"
                                style={{ cursor: 'pointer', transition: 'none' }}
                            >
                                <div className="card-body text-center p-4">
                                    <div className="display-4 mb-3">
                                        {feature.icon}
                                    </div>
                                    <h5 className="card-title text-success mb-3">
                                        {feature.title}
                                    </h5>
                                    <p className="card-text text-muted">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
