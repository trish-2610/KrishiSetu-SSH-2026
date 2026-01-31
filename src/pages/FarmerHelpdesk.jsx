import React, { useMemo, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'

function FarmerHelpdesk() {
    const { t } = useTranslation()

    // Hardcoded supervisors dataset grouped by state and division (mock backend)
    const stateDivisionData = useMemo(() => ({
        'Madhya Pradesh / मध्य प्रदेश': [
            { division: 'Bhopal / भोपाल', name: 'Anil Verma / अनिल वर्मा', phone: '+91 9812345670', email: 'anil.verma@krishisetu.in' },
            { division: 'Indore / इंदौर', name: 'Priya Sharma / प्रिया शर्मा', phone: '+91 9812345671', email: 'priya.sharma@krishisetu.in' },
            { division: 'Gwalior / ग्वालियर', name: 'Rohit Singh / रोहित सिंह', phone: '+91 9812345672', email: 'rohit.singh@krishisetu.in' },
            { division: 'Jabalpur / जबलपुर', name: 'Kavita Jain / कविता जैन', phone: '+91 9812345673', email: 'kavita.jain@krishisetu.in' },
            { division: 'Ujjain / उज्जैन', name: 'Vikas Mehta / विकास मेहता', phone: '+91 9812345674', email: 'vikas.mehta@krishisetu.in' },
            { division: 'Sagar / सागर', name: 'Neha Gupta / नेहा गुप्ता', phone: '+91 9812345675', email: 'neha.gupta@krishisetu.in' },
            { division: 'Rewa / रीवा', name: 'Amit Patel / अमित पटेल', phone: '+91 9812345676', email: 'amit.patel@krishisetu.in' },
            { division: 'Ratlam / रतलाम', name: 'Sunita Rao / सुनीता राव', phone: '+91 9812345677', email: 'sunita.rao@krishisetu.in' }
        ],
        'Maharashtra / महाराष्ट्र': [
            { division: 'Mumbai / मुंबई', name: 'Suresh Iyer / सुरेश अय्यर', phone: '+91 9822345670', email: 'suresh.iyer@krishisetu.in' },
            { division: 'Pune / पुणे', name: 'Aarti Kulkarni / आर्टी कुलकर्णी', phone: '+91 9822345671', email: 'aarti.kulkarni@krishisetu.in' },
            { division: 'Nagpur / नागपुर', name: 'Rahul Deshmukh / राहुल देशमुख', phone: '+91 9822345672', email: 'rahul.deshmukh@krishisetu.in' },
            { division: 'Nashik / नासिक', name: 'Pooja Joshi / पूजा जोशी', phone: '+91 9822345673', email: 'pooja.joshi@krishisetu.in' },
            { division: 'Aurangabad / औरंगाबाद', name: 'Manoj Patil / मनोज पाटिल', phone: '+91 9822345674', email: 'manoj.patil@krishisetu.in' },
            { division: 'Kolhapur / कोल्हापुर', name: 'Sneha Gokhale / स्नेहा गोखले', phone: '+91 9822345675', email: 'sneha.gokhale@krishisetu.in' },
            { division: 'Solapur / सोलापुर', name: 'Nilesh Jagtap / नीलेश जगताप', phone: '+91 9822345676', email: 'nilesh.jagtap@krishisetu.in' },
            { division: 'Amravati / अमरावती', name: 'Meera Phadke / मीरा फडके', phone: '+91 9822345677', email: 'meera.phadke@krishisetu.in' }
        ],
        'Uttar Pradesh / उत्तर प्रदेश': [
            { division: 'Lucknow / लखनऊ', name: 'Alok Tiwari / आलोक तिवारी', phone: '+91 9833345670', email: 'alok.tiwari@krishisetu.in' },
            { division: 'Kanpur / कानपुर', name: 'Shivani Agarwal / शिवानी अग्रवाल', phone: '+91 9833345671', email: 'shivani.agarwal@krishisetu.in' },
            { division: 'Varanasi / वाराणसी', name: 'Deepak Yadav / दीपक यादव', phone: '+91 9833345672', email: 'deepak.yadav@krishisetu.in' },
            { division: 'Prayagraj / प्रयागराज', name: 'Ritu Srivastava / ऋतु श्रीवास्तव', phone: '+91 9833345673', email: 'ritu.srivastava@krishisetu.in' },
            { division: 'Ghaziabad / गाज़ियाबाद', name: 'Mohit Sharma / मोहित शर्मा', phone: '+91 9833345674', email: 'mohit.sharma@krishisetu.in' },
            { division: 'Meerut / मेरठ', name: 'Swati Gupta / स्वाति गुप्ता', phone: '+91 9833345675', email: 'swati.gupta@krishisetu.in' },
            { division: 'Agra / आगरा', name: 'Sanjay Singh / संजय सिंह', phone: '+91 9833345676', email: 'sanjay.singh@krishisetu.in' },
            { division: 'Gorakhpur / गोरखपुर', name: 'Anita Verma / अनिता वर्मा', phone: '+91 9833345677', email: 'anita.verma@krishisetu.in' }
        ]
    }), [])



    const states = Object.keys(stateDivisionData)
    const allDivisions = useMemo(
        () =>
            Object.entries(stateDivisionData).flatMap(([state, items]) =>
                items.map((d) => ({ state, division: d.division }))
            ),
        [stateDivisionData]
    )
    const [selectedState, setSelectedState] = useState('')
    const [selectedDivision, setSelectedDivision] = useState('')

    // Chat form state
    const [chatForm, setChatForm] = useState({
        farmerName: '',
        division: '',
        query: '',
        replyMobile: '',
    })

    const recognitionRef = useRef(null)
    const [isListening, setIsListening] = useState(false)

    // Initialize Web Speech API lazily when starting
    const startVoiceTyping = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) {
            alert(t('helpdesk.voiceUnsupported'))
            return
        }
        if (!recognitionRef.current) {
            const recognition = new SpeechRecognition()
            recognition.lang = (navigator.language || 'en-IN')
            recognition.interimResults = false
            recognition.maxAlternatives = 1
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript
                setChatForm((prev) => ({ ...prev, query: (prev.query ? prev.query + ' ' : '') + transcript }))
            }
            recognition.onend = () => setIsListening(false)
            recognition.onerror = () => setIsListening(false)
            recognitionRef.current = recognition
        }
        setIsListening(true)
        recognitionRef.current.start()
    }

    const stopVoiceTyping = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop()
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setChatForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Simulate sending to backend / SMS gateway
        console.log('Helpdesk query submitted:', chatForm)
        alert(t('helpdesk.submitSuccess'))
        setChatForm({ farmerName: '', division: '', query: '', replyMobile: '' })
    }

    return (
        <div className="FarmerHelpdesk-page">
            <Navbar />
            <div className="container py-4">
                {/* Title */}
                <div className="row mb-4">
                    <div className="col-12">
                        <h1 className="fw-bold text-success">{t('helpdesk.title')}</h1>
                        <p className="text-muted mb-0">{t('helpdesk.intro')}</p>
                    </div>
                </div>

                {/* Helpline Selector */}
                <div className="row g-3 mb-5">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-success mb-3">{t('helpdesk.findSupervisor')}</h5>
                                <div className="row g-3 align-items-end">
                                    <div className="col-md-6">
                                        <label className="form-label">{t('helpdesk.state')} *</label>
                                        <select
                                            className="form-select"
                                            value={selectedState}
                                            onChange={(e) => {
                                                setSelectedState(e.target.value)
                                                setSelectedDivision('')
                                            }}
                                        >
                                            <option value="">{t('helpdesk.selectState')}</option>
                                            {states.map((st) => (
                                                <option key={st} value={st}>{st}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">{t('helpdesk.division')} *</label>
                                        <select
                                            className="form-select"
                                            value={selectedDivision}
                                            onChange={(e) => setSelectedDivision(e.target.value)}
                                            disabled={!selectedState}
                                        >
                                            <option value="">{selectedState ? t('helpdesk.selectDivision') : t('helpdesk.selectStateFirst')}</option>
                                            {selectedState && stateDivisionData[selectedState].map((d) => (
                                                <option key={d.division} value={d.division}>{d.division}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Supervisor Card */}
                                {selectedState && selectedDivision && (
                                    (() => {
                                        const sup = stateDivisionData[selectedState].find((d) => d.division === selectedDivision)
                                        if (!sup) return null
                                        return (
                                            <div className="row mt-4">
                                                <div className="col-12 col-lg-8">
                                                    <h5 className="card-title text-success mb-2">{t('helpdesk.details')}</h5>
                                                    <p className="mb-1"><span className="fw-semibold">{t('helpdesk.state')}:</span> {selectedState}</p>
                                                    <p className="mb-1"><span className="fw-semibold">{t('helpdesk.division')}:</span> {sup.division}</p>
                                                    <p className="mb-1"><span className="fw-semibold">{t('helpdesk.name')}:</span> {sup.name}</p>
                                                    <p className="mb-1"><span className="fw-semibold">{t('helpdesk.helpline')}:</span> {sup.phone}</p>
                                                    <p className="mb-3"><span className="fw-semibold">{t('helpdesk.email')}:</span> {sup.email}</p>
                                                    <div className="d-flex gap-2">
                                                        <a className="btn btn-success" href={`tel:${sup.phone.replace(/\s/g, '')}`}>{t('helpdesk.callNow')}</a>
                                                        <a className="btn btn-outline-success" href={`mailto:${sup.email}`}>{t('helpdesk.sendEmail')}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })()
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat Box */}
                <div className="row g-3">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title text-success mb-3">{t('helpdesk.chatTitle')}</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <label className="form-label">{t('helpdesk.farmerName')} *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="farmerName"
                                                value={chatForm.farmerName}
                                                onChange={handleChange}
                                                required
                                                placeholder={t('helpdesk.placeholder.farmerName')}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">{t('helpdesk.division')} *</label>
                                            <select
                                                className="form-select"
                                                name="division"
                                                value={chatForm.division}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">{t('helpdesk.selectDivision')}</option>
                                                {allDivisions.map((d) => (
                                                    <option key={`${d.state}-${d.division}`} value={`${d.state} - ${d.division}`}>
                                                        {d.state} - {d.division}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label">{t('helpdesk.replyMobile')} *</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="replyMobile"
                                                value={chatForm.replyMobile}
                                                onChange={handleChange}
                                                required
                                                placeholder={t('helpdesk.placeholder.mobile')}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">{t('helpdesk.yourQuery')} *</label>
                                            <div className="input-group">
                                                <textarea
                                                    className="form-control"
                                                    name="query"
                                                    rows="3"
                                                    value={chatForm.query}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder={t('helpdesk.typeQuestion')}
                                                ></textarea>
                                                <button
                                                    type="button"
                                                    className={`btn ${isListening ? 'btn-danger' : 'btn-success'}`}
                                                    onClick={isListening ? stopVoiceTyping : startVoiceTyping}
                                                    title="Voice typing"
                                                >
                                                    {isListening ? t('helpdesk.stop') : t('helpdesk.speak')}
                                                </button>
                                            </div>
                                            <div className="form-text">{t('helpdesk.micHint')}</div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end mt-3">
                                        <button type="submit" className="btn btn-success">{t('helpdesk.submit')}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FarmerHelpdesk