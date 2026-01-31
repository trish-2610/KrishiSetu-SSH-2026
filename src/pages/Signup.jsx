import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'

/**
 * Signup Page Component
 * Registration form for new users
 * Uses local state for demonstration purposes
 */
function Signup() {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({
        name: '',
        number: +91,
        email: '',
        age: 0,
        address: '',
        farmSize: 0,
        password: '',
        confirmPassword: ''
    })

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!')
            return
        }

        // In a real app, this would connect to a backend
        console.log('Signup attempt:', formData)
        alert('Signup functionality would be implemented here!')
    }

    return (
        <div className="signup-page">
            <Navbar />

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-8">
                        <div className="card shadow rounded-5 border border-success" style={{ border: '1px solid #000' }}>
                            <div className="card-body p-4">
                                <h2 className="card-title text-center mb-4" style={{ fontWeight: 900 }}>{t('auth.signup.title')}</h2>

								<form onSubmit={handleSubmit}>
									<div className="row g-3">
										<div className="col-12 col-md-6">
											<label htmlFor="name" className="form-label">{t('auth.signup.name')}</label>
											<input
												type="text"
												className="form-control rounded-5"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
												required
											/>
										</div>
										<div className="col-12 col-md-6">
											<label htmlFor="number" className="form-label">{t('auth.signup.number')}</label>
											<input
												type="text"
												className="form-control rounded-5"
												id="number"
												name="number"
												value={formData.number}
												onChange={handleChange}
												required
											/>
										</div>
									</div>

									<div className="row g-3 mt-1">
										<div className="col-12 col-md-6">
											<label htmlFor="email" className="form-label">{t('auth.signup.email')} <span className="text-muted">({t('common.optional') || 'optional'})</span></label>
											<input
												type="email"
												className="form-control rounded-5"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
											/>
										</div>
										<div className="col-12 col-md-6">
											<label htmlFor="age" className="form-label">{t('auth.signup.age')}</label>
											<input
												type="number"
												className="form-control rounded-5"
												id="age"
												name="age"
												value={formData.age}
												onChange={handleChange}
												required
											/>
										</div>
									</div>

									<div className="row g-3 mt-1">
										<div className="col-12 col-md-6">
											<label htmlFor="address" className="form-label">{t('auth.signup.address')}</label>
											<input
												type="text"
												className="form-control rounded-5"
												id="address"
												name="address"
												value={formData.address}
												onChange={handleChange}
												required
											/>
										</div>
										<div className="col-12 col-md-6">
											<label htmlFor="farmSize" className="form-label">{t('auth.signup.farmSize')} <span className="text-muted">({t('common.optional') || 'optional'})</span></label>
											<input
												type="number"
												className="form-control rounded-5"
												id="farmSize"
												name="farmSize"
												value={formData.farmSize}
												onChange={handleChange}
											/>
										</div>
									</div>

									<div className="row g-3 mt-1">
										<div className="col-12 col-md-6">
											<label htmlFor="password" className="form-label">{t('auth.signup.password')}</label>
											<input
												type="password"
												className="form-control rounded-5"
												id="password"
												name="password"
												value={formData.password}
												onChange={handleChange}
												required
											/>
										</div>
										<div className="col-12 col-md-6">
											<label htmlFor="confirmPassword" className="form-label">{t('auth.signup.confirmPassword')}</label>
											<input
												type="password"
												className="form-control rounded-5"
												id="confirmPassword"
												name="confirmPassword"
												value={formData.confirmPassword}
												onChange={handleChange}
												required
											/>
										</div>
									</div>

									<div className="d-grid mt-3">
										<button type="submit" className="btn btn-success rounded-5">
											{t('auth.signup.cta')}
										</button>
									</div>
								</form>

                                <div className="text-center mt-3">
                                    <p className="mb-0">
                                        {t('auth.signup.haveAccount')}
                                        <Link to="/login" className="text-decoration-none ms-1">
                                            {t('auth.signup.loginHere')}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
