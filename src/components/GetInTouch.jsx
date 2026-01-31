import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * GetInTouch Component
 * Contact form section with Name, Email, and Message fields
 * Uses Bootstrap form styling and validation
 */
function GetInTouch() {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        message: ''
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
        // In a real app, this would send data to a backend
        console.log('Contact form submitted:', formData)
        alert(t('contact.submitSuccess'))

        // Reset form
        setFormData({
            name: '',
            number: '',
            message: ''
        })
    }

    return (
        <section id="contact" className="bg-light py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        {/* Section header */}
                        <div className="text-center mb-5">
                            <h2 className="display-5 fw-bold text-success mb-3">
                                {t('contact.heading')}
                            </h2>
                            <p className="lead text-muted">
                                {t('contact.subheading')}
                            </p>
                        </div>

                        {/* Contact form */}
                        <div className="card shadow border-0 rounded">
                            <div className="card-body p-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">
                                                {t('contact.name')} *
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control rounded"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder={t('contact.namePlaceholder')}
                                            />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="number" className="form-label">
                                                {t('contact.phone')} *
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control rounded"
                                                id="number"
                                                name="number"
                                                value={formData.number}
                                                onChange={handleChange}
                                                required
                                                placeholder={t('contact.phonePlaceholder')}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="message" className="form-label">
                                            {t('contact.message')} *
                                        </label>
                                        <textarea
                                            className="form-control rounded-3"
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('contact.messagePlaceholder')}
                                        ></textarea>
                                    </div>

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-success btn-lg px-5 rounded">
                                            {t('contact.submit')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GetInTouch
