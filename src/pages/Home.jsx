import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import GetInTouch from '../components/GetInTouch'
import Footer from '../components/Footer'

/**
 * Home Page Component
 * Main landing page for the KrishiSetu website
 * Contains all major sections: Navbar, Hero, Features, Contact, Footer
 */
function Home() {
    return (
        <div className="home-page">
            {/* Navigation Bar */}
            <Navbar />

            {/* Hero Section with main call-to-action */}
            <Hero />

            {/* Features Section showcasing key benefits */}
            <Features />

            {/* Contact Section for user engagement */}
            <GetInTouch />

            {/* Footer with additional information */}
            <Footer />
        </div>
    )
}

export default Home
