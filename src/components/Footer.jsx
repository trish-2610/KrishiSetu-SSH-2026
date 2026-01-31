import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Footer Component
 * Simple footer with placeholder text and basic information
 * Uses Bootstrap grid system for responsive layout
 */
function Footer() {
    const { t } = useTranslation()
    return (
        <footer className="bg-success-subtle text-dark py-5 border-top">
            <div className="container">
                <div className="row">
                    {/* Company information */}
                    <div className="col-lg-4 mb-4">
                        <h5 className="text-success mb-3">{t('footer.brand')}</h5>
                        <p className="text-muted">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Quick links */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <h6 className="text-success mb-3">{t('footer.quickLinks')}</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#hero" className="text-muted text-decoration-none">{t('footer.aboutUs')}</a>
                            </li>
                            <li className="mb-2">
                                <a href="#features" className="text-muted text-decoration-none">{t('footer.features')}</a>
                            </li>
                            <li className="mb-2">
                                <a href="#contact" className="text-muted text-decoration-none">{t('footer.contact')}</a>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    {/* <div className="col-lg-2 col-md-6 mb-4">
                        <h6 className="text-success mb-3">{t('footer.support')}</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">{t('footer.helpCenter')}</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">{t('footer.docs')}</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">{t('footer.privacy')}</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-muted text-decoration-none">{t('footer.terms')}</a>
                            </li>
                        </ul>
                    </div> */}

                    {/* Contact info */}
                    <div className="col-lg-4 mb-4">
                        <h6 className="text-success mb-3">{t('footer.contactInfo')}</h6>
                        <div className="text-muted">
                            <p className="mb-2">
                                <i className="fas fa-map-marker-alt me-2"></i>
                                SDSF, DAVV, Indore, M.P. (452001)
                            </p>
                            <p className="mb-2">
                                <i className="fas fa-phone me-2"></i>
                                +91 1234567890
                            </p>
                            <p className="mb-2">
                                <i className="fas fa-envelope me-2"></i>
                                krishisetu@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <hr className="my-4" />
                <div className="row align-items-center">
                    <p className="text-muted mb-0">
                        {t('footer.tagline')}
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
