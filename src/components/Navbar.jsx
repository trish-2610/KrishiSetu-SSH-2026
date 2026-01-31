import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../i18n/index.js'

/**
 * Navbar Component
 * Navigation bar with brand, links, and authentication buttons
 * Shows different buttons based on login state
 */
function Navbar() {
    const { t, i18n } = useTranslation()
    // Simple authentication state (in a real app, this would come from context/state management)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Handle logout functionality
    const handleLogout = () => {
        setIsLoggedIn(false)
        alert('Logged out successfully!')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-success-subtle">
            <div className="container">
                {/* Brand/Logo */}
                <Link className="navbar-brand fs-2 fw-bold text-success d-flex align-items-center gap-2" to="/">
                    <img src="/favicon.ico" alt="Logo" width={48} height={48} style={{ objectFit: 'contain' }} />
                    {t('brand')}
                </Link>

                {/* Mobile menu toggle button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto gap-4 fs-5 fw-bold">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">{t('nav.home')}</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#features">{t('nav.features')}</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact">{t('nav.contact')}</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/farming-awareness">{t('nav.farmingAwareness')}</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/marketplace">{t('nav.marketplace')}</Link>
                        </li>
                    </ul>

                    <div className="row g-2 align-items-center flex-nowrap">
                        {/* Language Switcher */}
                        <div className="col-auto">
                            <select
                                className="form-select bg-success-subtle border-success rounded"
                                value={i18n.language}
                                onChange={(e) => {
                                    const lang = e.target.value
                                    try { localStorage.setItem('app_lang', lang) } catch { }
                                    i18n.changeLanguage(lang)
                                }}
                            >
                                {Object.entries(supportedLanguages).map(([code, label]) => (
                                    <option key={code} value={code}>{label}</option>
                                ))}
                                <option value="pa" disabled>Punjabi (ਪੰਜਾਬੀ)</option>
                                <option value="ta" disabled>Tamil (தமிழ்)</option>
                            </select>
                        </div>
                        {/* Authentication buttons */}
                        {isLoggedIn ? (
                            <div className="col-auto">
                                <button
                                    className="btn btn-outline-success w-100 rounded fs-5 fw-bold"
                                    onClick={handleLogout}
                                >
                                    {t('nav.logout')}
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="col-auto">
                                    <Link
                                        className="btn btn-outline-success w-100 rounded fs-5 fw-bold"
                                        to="/login"
                                    >
                                        {t('nav.login')}
                                    </Link>
                                </div>
                                <div className="col-auto">
                                    <Link
                                        className="btn btn-success w-100 rounded fs-5 fw-bold"
                                        to="/signup"
                                    >
                                        {t('nav.signup')}
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar