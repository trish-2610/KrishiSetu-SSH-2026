// Marketplace page
// Goal: Simple, beginner-friendly implementation of a Facebook Marketplace-like UI
// Key features:
// - Create listings with expiry
// - Browse with filters (search, category, price, location, distance)
// - Tabs: All, My Listings, History (based on ownership and expiry)
// - LocalStorage used to persist listings and a generated userId
// - Bootstrap 5 used for layout and components
import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'

function Marketplace() {
    const { t } = useTranslation()
    // Mock data for prototype (would come from backend later)
    const initialListings = useMemo(() => [
        {
            id: 'L001',
            title: 'Paddy Husk - 50kg bags',
            category: 'Paddy Husk',
            price: 450,
            currency: '₹',
            condition: 'New',
            description: 'Clean and dry paddy husk suitable for bedding and fuel.',
            location: { city: 'Lucknow', state: 'UP', lat: 26.8467, lon: 80.9462 },
            images: ['https://images.unsplash.com/photo-1604908812141-4f0f1a70f8f2'],
            seller: { name: 'Ramesh Kumar', phone: '+91 98765 43210', whatsapp: '+91 98765 43210' },
            expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(), // +10 days
            postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        },
        {
            id: 'L002',
            title: 'Sugarcane Bagasse bales',
            category: 'Sugarcane Bagasse',
            price: 1200,
            currency: '₹',
            condition: 'Used',
            description: 'Well-pressed bagasse bales ideal for biofuel.',
            location: { city: 'Pune', state: 'MH', lat: 18.5204, lon: 73.8567 },
            images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'],
            seller: { name: 'Sagar Agro', phone: '+91 91234 56789', whatsapp: '+91 91234 56789' },
            expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(), // +3 days
            postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        },
        {
            id: 'L003',
            title: 'Cold-pressed mustard oil 5L',
            category: 'Cold-pressed oils',
            price: 950,
            currency: '₹',
            condition: 'New',
            description: 'Wooden ghani cold-pressed, unrefined, 5L can.',
            location: { city: 'Jaipur', state: 'RJ', lat: 26.9124, lon: 75.7873 },
            images: ['https://images.unsplash.com/photo-1505575972945-280b9f55b0d4'],
            seller: { name: 'Seeta Devi', phone: '+91 90000 11111', whatsapp: '+91 90000 11111' },
            expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString(), // +20 days
            postedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        },
        {
            id: 'L004',
            title: 'Wheat Straw / Parali - loose',
            category: 'Wheat Straw / Parali',
            price: 300,
            currency: '₹',
            condition: 'Used',
            description: 'Loose straw collected post-harvest. Pickup preferred.',
            location: { city: 'Karnal', state: 'HR', lat: 29.6857, lon: 76.9905 },
            images: ['https://images.unsplash.com/photo-1596051160624-2454a8fd9cea'],
            seller: { name: 'Gurpreet Singh', phone: '+91 93333 22222', whatsapp: '+91 93333 22222' },
            expiryDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // expired yesterday
            postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
        },
    ], [])

    // Core state
    const [listings, setListings] = useState([]) // all listings (active + expired)
    const [nowIso, setNowIso] = useState(new Date().toISOString()) // current time to check expiry
    const [userId, setUserId] = useState('')
    const [activeTab, setActiveTab] = useState('all') // all | mine | history

    // Filters state
    const categories = [
        'Paddy Husk',
        'Sugarcane Bagasse',
        'Wheat Straw / Parali',
        'Fruit Peels',
        'Vegetable Waste',
        'Jaggery',
        'Pickles',
        'Papad',
        'Cold-pressed oils',
        'Flour',
    ]
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    // Create-listing modal/form state
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [form, setForm] = useState({
        title: '',
        category: '',
        price: '',
        currency: '₹',
        description: '',
        city: '',
        state: '',
        phone: '',
        whatsapp: '',
        expiryDays: '7',
    })

    // Load mock on mount (later: replace with API and persistence)
    // On mount: load persisted listings, ensure a local userId, restore tab from hash
    useEffect(() => {
        // Load from localStorage if present, else fallback to mocks
        try {
            const saved = localStorage.getItem('ks_marketplace_listings')
            if (saved) {
                setListings(JSON.parse(saved))
            } else {
                setListings(initialListings)
            }
            let uid = localStorage.getItem('ks_user_id')
            if (!uid) {
                uid = 'U' + Math.random().toString(36).slice(2, 10)
                localStorage.setItem('ks_user_id', uid)
            }
            setUserId(uid)
            const hash = (window.location.hash || '').replace('#', '')
            if (hash === 'mine' || hash === 'history' || hash === 'all') setActiveTab(hash)
        } catch (e) {
            setListings(initialListings)
        }
        const timer = setInterval(() => setNowIso(new Date().toISOString()), 60 * 1000)
        return () => clearInterval(timer)
    }, [initialListings])

    // Persist listings whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('ks_marketplace_listings', JSON.stringify(listings))
        } catch (e) {
            // ignore
        }
    }, [listings])

    // Persist tab to hash
    useEffect(() => {
        if (!activeTab) return
        if (window.location.hash !== `#${activeTab}`) {
            window.location.hash = `#${activeTab}`
        }
    }, [activeTab])

    // Helper: returns active (not expired) listings
    function getActiveListings(allListings) {
        return allListings.filter(l => {
            try {
                return new Date(l.expiryDate).getTime() > new Date(nowIso).getTime()
            } catch (e) {
                return true
            }
        })
    }

    const activeListings = useMemo(() => getActiveListings(listings), [listings, nowIso])

    // Distance calculation
    function toRad(value) {
        return (value * Math.PI) / 180
    }
    function measureDistanceKm(a, b) {
        if (!a || !b) return Infinity
        const R = 6371
        const dLat = toRad(b.lat - a.lat)
        const dLon = toRad(b.lon - a.lon)
        const lat1 = toRad(a.lat)
        const lat2 = toRad(b.lat)
        const sinDLat = Math.sin(dLat / 2)
        const sinDLon = Math.sin(dLon / 2)
        const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon
        return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)))
    }

    // Helper: applies UI filters to the given list
    function getFilteredListings(source) {
        let result = source
        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(l =>
                (l.title || '').toLowerCase().includes(q) ||
                (l.description || '').toLowerCase().includes(q)
            )
        }
        if (category) {
            result = result.filter(l => l.category === category)
        }
        return result
    }

    const filteredListings = useMemo(() => getFilteredListings(activeListings), [activeListings, search, category])

    // Choose which listings to show for the current tab
    const displayedListings = useMemo(() => {
        if (activeTab === 'all') return filteredListings
        if (activeTab === 'mine') return filteredListings.filter(l => l.ownerId === userId)
        // history: show user's expired items
        return listings.filter(l => new Date(l.expiryDate).getTime() <= new Date(nowIso).getTime() && l.ownerId === userId)
    }, [activeTab, filteredListings, userId, listings, nowIso])


    function resetFilters() {
        setSearch('')
        setCategory('')
    }

    function openCreate() { setIsCreateOpen(true) }
    function closeCreate() { setIsCreateOpen(false) }
    function updateForm(name, value) { setForm(prev => ({ ...prev, [name]: value })) }
    function submitCreate(e) {
        e?.preventDefault?.()
        // basic validation
        if (!form.title || !form.category || !form.price || !form.city || !form.state || !form.expiryDays) return
        const id = 'L' + Math.random().toString(36).slice(2, 8).toUpperCase()
        const expiryMs = Number(form.expiryDays) * 24 * 60 * 60 * 1000
        const newItem = {
            id,
            title: form.title,
            category: form.category,
            price: Number(form.price),
            currency: form.currency || 'INR',
            description: form.description || '',
            location: { city: form.city, state: form.state, lat: 0, lon: 0 },
            images: [],
            seller: { name: 'You', phone: form.phone || '', whatsapp: form.whatsapp || form.phone || '' },
            ownerId: userId,
            expiryDate: new Date(Date.now() + expiryMs).toISOString(),
            postedAt: new Date().toISOString(),
        }
        setListings(prev => [newItem, ...prev])
        setIsCreateOpen(false)
        setForm({ title: '', category: '', price: '', currency: '₹', description: '', city: '', state: '', phone: '', whatsapp: '', expiryDays: '7' })
    }

    return (
        <div>
            <Navbar />
            <div className="container py-4">
                <h1 className="h3 mb-2">{t('marketplace.title')}</h1>
                <p className="text-muted mb-3">{t('marketplace.subtitle')}</p>

                {/* Tabs */}
                <div className="d-flex gap-2 mb-3">
                    <button onClick={() => setActiveTab('all')} className={`btn btn-sm rounded-pill ${activeTab === 'all' ? 'btn-dark' : 'btn-outline-secondary'}`}>{t('marketplace.tabs.all')}</button>
                    <button onClick={() => setActiveTab('mine')} className={`btn btn-sm rounded-pill ${activeTab === 'mine' ? 'btn-dark' : 'btn-outline-secondary'}`}>{t('marketplace.tabs.mine')}</button>
                    <button onClick={() => setActiveTab('history')} className={`btn btn-sm rounded-pill ${activeTab === 'history' ? 'btn-dark' : 'btn-outline-secondary'}`}>{t('marketplace.tabs.history')}</button>
                </div>

                {/* Filters */}
                <div className="row g-2 mb-3">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <input className="form-control" placeholder={t('marketplace.filters.search')} value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div className="col-6 col-md-4 col-lg-3">
                        <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="">{t('marketplace.filters.category')}</option>
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="col-6 col-md-6 col-lg-4 d-flex gap-2">
                        <button onClick={resetFilters} className="btn btn-outline-secondary w-100">{t('marketplace.filters.reset')}</button>
                    </div>
                    <div className="col-12 col-lg-4 d-flex justify-content-lg-end">
                        <button onClick={openCreate} className="btn btn-outline-success w-100 w-lg-auto">{t('marketplace.filters.createListing')}</button>
                    </div>
                </div>

                {/* Listings Grid (basic, filters and form to be added next) */}
                {displayedListings.length === 0 ? (
                    <div className="p-4 bg-light border rounded">{t('marketplace.empty')}</div>
                ) : (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {displayedListings.map(item => (
                            <div className="col" key={item.id}>
                                <div className="card h-100 rounded">
                                    <div className="overflow-hidden" style={{ height: 160 }}>
                                        {item.images?.[0] ? (
                                            <img
                                                src={item.images[0]}
                                                className="card-img-top h-100 w-100 object-fit-cover"
                                                alt={item.title}
                                            />
                                        ) : (
                                            <img
                                                src={`https://placehold.co/800x500?text=${encodeURIComponent(t('marketplace.card.noImageText'))}`}
                                                className="card-img-top bg-light h-100 w-100 object-fit-cover"
                                                alt={t('marketplace.card.noImageAlt')}
                                            />
                                        )}
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-between mb-2">
                                            <strong className="h4">{item.title}</strong>
                                            <span className="text-muted small">{item.category}</span>
                                        </div>
                                        <div className="h6 mb-2">₹{item.price}</div>
                                        <div className="text-muted small mb-3">{item.location.city}, {item.location.state}</div>
                                        <div className="d-flex gap-2 mt-auto">
                                            <a href={`https://wa.me/${(item.seller.whatsapp || '').replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-outline-success btn-sm">{t('marketplace.card.whatsapp')}</a>
                                            <a href={`tel:${item.seller.phone}`} className="btn btn-outline-primary btn-sm">{t('marketplace.card.call')}</a>
                                        </div>
                                        <div className="text-muted small mt-2">
                                            {t('marketplace.card.expires')}{' '}
                                            {(() => {
                                                const d = new Date(item.expiryDate);
                                                const day = String(d.getDate()).padStart(2, '0');
                                                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                                const month = monthNames[d.getMonth()];
                                                const year = d.getFullYear();
                                                return `${day} ${month} ${year}`;
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Create Listing Modal */}
                {isCreateOpen && (
                    <>
                        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">{t('marketplace.modal.title')}</h5>
                                        <button type="button" className="btn-close" aria-label="Close" onClick={closeCreate}></button>
                                    </div>
                                    <form onSubmit={submitCreate}>
                                        <div className="modal-body">
                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <label className="form-label">{t('marketplace.modal.labels.title')}</label>
                                                    <input required className="form-control" placeholder={t('marketplace.modal.placeholders.title')} value={form.title} onChange={e => updateForm('title', e.target.value)} />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label">{t('marketplace.modal.labels.category')}</label>
                                                    <select required className="form-select" value={form.category} onChange={e => updateForm('category', e.target.value)}>
                                                        <option value="">{t('marketplace.modal.placeholders.selectCategory')}</option>
                                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                                    </select>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label">{t('marketplace.modal.labels.price')}</label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">₹</span>
                                                        <input required type="number" className="form-control" placeholder={t('marketplace.modal.placeholders.price')} value={form.price} onChange={e => updateForm('price', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">{t('marketplace.modal.labels.description')}</label>
                                                    <textarea className="form-control" placeholder={t('marketplace.modal.placeholders.description')} value={form.description} onChange={e => updateForm('description', e.target.value)} rows={3} />
                                                </div>
                                                <div className="col-6">
                                                    <label className="form-label">{t('marketplace.modal.labels.city')}</label>
                                                    <input required className="form-control" placeholder={t('marketplace.modal.placeholders.city')} value={form.city} onChange={e => updateForm('city', e.target.value)} />
                                                </div>
                                                <div className="col-6">
                                                    <label className="form-label">{t('marketplace.modal.labels.state')}</label>
                                                    <input required className="form-control" placeholder={t('marketplace.modal.placeholders.state')} value={form.state} onChange={e => updateForm('state', e.target.value)} />
                                                </div>
                                                <div className="col-6">
                                                    <label className="form-label">{t('marketplace.modal.labels.phone')}</label>
                                                    <input className="form-control" placeholder={t('marketplace.modal.placeholders.phone')} value={form.phone} onChange={e => updateForm('phone', e.target.value)} />
                                                </div>
                                                <div className="col-6">
                                                    <label className="form-label">{t('marketplace.modal.labels.whatsapp')}</label>
                                                    <input className="form-control" placeholder={t('marketplace.modal.placeholders.whatsapp')} value={form.whatsapp} onChange={e => updateForm('whatsapp', e.target.value)} />
                                                </div>
                                                <div className="col-6 col-md-3">
                                                    <label className="form-label">{t('marketplace.modal.labels.expiryDays')}</label>
                                                    <input required type="number" min="1" className="form-control" placeholder={t('marketplace.modal.placeholders.expiryDays')} value={form.expiryDays} onChange={e => updateForm('expiryDays', e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-outline-secondary" onClick={closeCreate}>{t('marketplace.modal.actions.cancel')}</button>
                                            <button type="submit" className="btn btn-outline-success">{t('marketplace.modal.actions.add')}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-backdrop fade show"></div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Marketplace