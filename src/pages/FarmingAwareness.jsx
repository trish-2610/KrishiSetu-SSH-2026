import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AwarenessCard from '../components/AwarenessCard'
import { useTranslation } from 'react-i18next'

/**
 * FarmingAwareness Page
 * Contains three main sections:
 * 1. Awareness Cards with expandable YouTube links
 * 2. Success Stories with embedded YouTube Shorts
 * 3. Share Your Success Story form
 */
function FarmingAwareness() {
    const { t } = useTranslation()
    const [youtubeLink, setYoutubeLink] = useState('')

    // Mock data for awareness cards
    const awarenessCards = [
        {
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.10wallpaper.com%2Fwallpaper%2F2560x1440%2F1812%2FModern_agricultural_machinery_autumn_harvest_2560x1440.jpg&f=1&nofb=1&ipt=d0a909061ae0d315c469f28e0888326ce86beeadc594af30c520eef6d9fa5843',
            title: t('awareness.cards.modernMachinery.title'),
            description: t('awareness.cards.modernMachinery.description'),
            youtubeLinks: [
                { title: 'Agricultural Sprayer Drone', url: 'https://youtube.com/shorts/I0JFO7oaYNU?si=nit5w8w4TO4QyGoU', duration: '0:25' },
                { title: 'New Technology Modern Machine', url: 'https://youtube.com/shorts/r0OjKAozXhg?si=aghwgZ3RIcw7w5sh', duration: '12:30' },
                { title: 'AGRI Drones', url: 'https://youtu.be/ry4eyYkdxAU?si=qWEOXlDtyRZ942L8', duration: '15:20' }
            ]
        },
        {
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fagriculture-pictures-96za4y7ebqzc0nch.jpg&f=1&nofb=1&ipt=3fda27d8566659117b85403c0ad3683bd34bfc95e0b4adc19ca7755b10b30a3f',
            title: t('awareness.cards.modernCrops.title'),
            description: t('awareness.cards.modernCrops.description'),
            youtubeLinks: [
                { title: 'Kiwi Planting', url: 'https://www.youtube.com/shorts/AAnYDyhS-8M', duration: '1:00' },
                { title: 'Dragon Fruit Planting', url: 'https://youtube.com/shorts/ruvDf5oRMHA?si=w4p-2zHOuKYZ963o', duration: '0:48' },
                { title: 'Dragon Fruit Planting 2', url: 'https://www.youtube.com/shorts/_g5FFxyLpgs', duration: '7:20' }
            ]
        },
        {
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.prod.website-files.com%2F621e95f9ac30687a56e4297e%2F65dcfe69b40d7fb9d7c6023f_V2_1700664436159_4ec05cb2-c6ec-4095-b55f-bf5721fc5801_HIGH_RES.png&f=1&nofb=1&ipt=a6665796f318b662a52632ba1c10a8db0ee438ca22bbb54bb8208b88359dfd57',
            title: t('awareness.cards.crossbreeding.title'),
            description: t('awareness.cards.crossbreeding.description'),
            youtubeLinks: [
                { title: 'Drone Technology in Farming', url: 'https://youtube.com/watch?v=example8', duration: '11:10' },
                { title: 'IoT Sensors for Crops', url: 'https://youtube.com/watch?v=example9', duration: '13:25' },
                { title: 'Mobile Apps for Farmers', url: 'https://youtube.com/watch?v=example10', duration: '8:50' },
                { title: 'Weather Monitoring Systems', url: 'https://youtube.com/watch?v=example11', duration: '9:35' }
            ]
        },
        {
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fzinco-usa.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fflexslider_full%2Fpublic%2F2019-05%2Furban_farming2.jpg%3Fitok%3DujhVgEhG&f=1&nofb=1&ipt=887eb90ff2c6f84dbee414f4214d1e3f4b573df1d2b3bd1ffa1c2dd4b8285f7b',
            title: t('awareness.cards.urbanFarming.title'),
            description: t('awareness.cards.urbanFarming.description'),
            youtubeLinks: [
                { title: 'Early Disease Detection', url: 'https://youtube.com/watch?v=example12', duration: '14:20' },
                { title: 'Natural Treatment Methods', url: 'https://youtube.com/watch?v=example13', duration: '10:45' }
            ]
        },
        {
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tech-mag.net%2Ftechmag%2Fuploads%2F2023%2F04%2Fmodern-agricultural-technology-adoption-and-its-importance.jpg&f=1&nofb=1&ipt=82d16a673b59ff67bc28a41734f6c3eaedbaa557c07f9cd87dce1480c54f957f',
            title: t('awareness.cards.globalTechnologies.title'),
            description: t('awareness.cards.globalTechnologies.description'),
            youtubeLinks: [
                { title: 'Direct Market Selling', url: 'https://youtube.com/watch?v=example14', duration: '12:15' },
                { title: 'Online Marketplaces', url: 'https://youtube.com/watch?v=example15', duration: '8:30' },
                { title: 'Price Negotiation Tips', url: 'https://youtube.com/watch?v=example16', duration: '6:45' }
            ]
        },
        {
            image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fhumphreymalone.com%2Fwp-content%2Fuploads%2F2024%2F01%2FA-modern-farm-showcasing-precision-agriculture-technology.-The-scene-includes-high-tech-tractors-with-GPS-systems-drones-flying-overhead-surveying-th.webp&f=1&nofb=1&ipt=c71219e600a22945c7dd4c558f9edd6b9824db3207669f990f292f9e7ac31a0e',
            title: t('awareness.cards.digitalFarming.title'),
            description: t('awareness.cards.digitalFarming.description'),
            youtubeLinks: [
                { title: 'Farm Budget Planning', url: 'https://youtube.com/watch?v=example17', duration: '15:30' },
                { title: 'Government Schemes', url: 'https://youtube.com/watch?v=example18', duration: '11:20' },
                { title: 'Insurance for Crops', url: 'https://youtube.com/watch?v=example19', duration: '9:10' },
                { title: 'Investment in Equipment', url: 'https://youtube.com/watch?v=example20', duration: '13:45' }
            ]
        }
    ]

    // Success stories with actual YouTube links
    const successStories = [
        {
            title: t('awareness.successStoryTitles.amazingFarming'),
            description: t('awareness.successStoryDescriptions.amazingFarming'),
            videoId: 'Oq9tGkNv5JY'
        },
        {
            title: t('awareness.successStoryTitles.modernTechniques'),
            description: t('awareness.successStoryDescriptions.modernTechniques'),
            videoId: '2d8f5ukWYCw'
        },
        {
            title: t('awareness.successStoryTitles.sustainableAgriculture'),
            description: t('awareness.successStoryDescriptions.sustainableAgriculture'),
            videoId: '8B2FZkA4Drs'
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (youtubeLink.trim()) {
            // In a real app, this would send to backend
            console.log('Success story submitted:', youtubeLink)
            alert(t('awareness.submitSuccess'))
            setYoutubeLink('')
        }
    }

    const extractVideoId = (url) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        const match = url.match(regex)
        return match ? match[1] : null
    }

    return (
        <div className="farming-awareness-page">
            <Navbar />

            <div className="container py-5">
                {/* Section 1: Awareness Cards */}
                <section className="mb-5">
                    <div className="text-center mb-5">
                        <h1 className="display-4 fw-bold text-success mb-3">
                            {t('awareness.title')}
                        </h1>
                        <p className="lead text-muted">
                            {t('awareness.subtitle')}
                        </p>
                    </div>

                    <div className="row">
                        {awarenessCards.map((card, index) => (
                            <AwarenessCard
                                key={index}
                                image={card.image}
                                title={card.title}
                                description={card.description}
                                youtubeLinks={card.youtubeLinks}
                                cardIndex={index}
                            />
                        ))}
                    </div>
                </section>

                {/* Section 2: Success Stories */}
                <section className="mb-5">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold text-success mb-3">
                            {t('awareness.successStories')}
                        </h2>
                        <p className="lead text-muted">
                            {t('awareness.successStoriesSubtitle')}
                        </p>
                    </div>

                    <div className="row g-4">
                        {successStories.map((story, index) => (
                            <div key={index} className="col-lg-6 col-md-6">
                                <div className="card border-0 shadow-sm rounded overflow-hidden">
                                    <div className="position-relative">
                                        <iframe
                                            width="100%"
                                            height="315"
                                            src={`https://www.youtube.com/embed/${story.videoId}`}
                                            title={story.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="rounded-top"
                                        ></iframe>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title text-success fw-bold">
                                            {story.title}
                                        </h5>
                                        <p className="card-text text-muted">
                                            {story.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Share Your Success Story */}
                <section className="mb-5">
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold text-success mb-3">
                            {t('awareness.shareStory')}
                        </h2>
                        <p className="lead text-muted">
                            {t('awareness.shareStorySubtitle')}
                        </p>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-sm rounded">
                                <div className="card-body p-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="youtubeLink" className="form-label fw-semibold">
                                                {t('awareness.youtubeLinkLabel')}
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                id="youtubeLink"
                                                placeholder={t('awareness.youtubeLinkPlaceholder')}
                                                value={youtubeLink}
                                                onChange={(e) => setYoutubeLink(e.target.value)}
                                                required
                                            />
                                            <div className="form-text">
                                                {t('awareness.youtubeLinkHelp')}
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="btn btn-success btn-lg px-5 rounded-pill"
                                            >
                                                <i className="fas fa-share me-2"></i>
                                                {t('awareness.submitButton')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    )
}

export default FarmingAwareness