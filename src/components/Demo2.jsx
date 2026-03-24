import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Demo2 = () => {
    // --- Logic & State ---
    const [institution, setInstitution] = useState('Alliance High School');
    const [level, setLevel] = useState('Junior Secondary - Grade 7 (CBC)');
    const [step, setStep] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    // Form submission handler
    const handleViewLists = () => {
        setStep(2);
        // Simulate loading then alert
        setTimeout(() => {
            alert(`Loading approved kits for ${institution} - ${level}`);
        }, 300);
    };

    return (
        <div className="min-h-screen bg-white text-[#1C3B61] font-sans selection:bg-orange-100">
            {/* --- Login Modal --- */}
            <AnimatePresence>
                {showLogin && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            onClick={() => setShowLogin(false)}
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white p-8 rounded-3xl shadow-2xl relative z-10 w-full max-w-sm"
                        >
                            <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
                            <div className="space-y-4">
                                <input type="email" placeholder="Email Address" className="w-full p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 ring-orange-400" />
                                <button 
                                    onClick={() => { setIsLoggedIn(true); setShowLogin(false); }}
                                    className="w-full py-4 bg-[#1C3B61] text-white font-bold rounded-xl"
                                >
                                    Log In
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* --- Header --- */}
            <header className="border-b border-gray-100 px-4 md:px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-40">
                <div 
                    className="text-lg md:text-xl font-bold tracking-tight text-[#1C3B61] cursor-pointer"
                    onClick={() => setStep(1)}
                >
                    INSTITUTIONAL SUPPLY
                </div>
                <button 
                    onClick={() => isLoggedIn ? setIsLoggedIn(false) : setShowLogin(true)}
                    className="text-sm md:text-base text-gray-600 hover:text-black transition-colors font-medium bg-slate-50 px-4 py-2 rounded-lg"
                >
                    {isLoggedIn ? 'Sign Out' : 'Log In'}
                </button>
            </header>

            <main className="max-w-3xl mx-auto pt-8 md:pt-12 px-4 md:px-6">
                {/* --- Multi-Step Progress Bar --- */}
                <div className="flex justify-between items-center border-b border-gray-100 mb-8 md:mb-12 relative overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div 
                        onClick={() => setStep(1)}
                        className={`flex-1 text-center pb-4 cursor-pointer transition-all border-b-2 font-bold ${step === 1 ? 'border-[#ED8936] text-[#ED8936]' : 'border-transparent text-gray-400'}`}
                    >
                        1. Institution <span className="hidden sm:inline">& Level</span>
                    </div>
                    <div 
                        className={`flex-1 text-center pb-4 transition-all border-b-2 font-medium ${step === 2 ? 'border-[#ED8936] text-[#ED8936]' : 'border-transparent text-gray-400'}`}
                    >
                        2. Select Kit<span className="hidden sm:inline">/Items</span>
                    </div>
                    <div 
                        className={`flex-1 text-center pb-4 transition-all border-b-2 font-medium ${step === 3 ? 'border-[#ED8936] text-[#ED8936]' : 'border-transparent text-gray-400'}`}
                    >
                        3. Checkout
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="space-y-6 md:space-y-8"
                        >
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                                {isLoggedIn ? 'Welcome back! Setup your order' : 'Set up your order'}
                            </h1>

                            <div className="space-y-3">
                                <label className="block font-bold text-slate-800 text-sm md:text-base">Search High School or University</label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        value={institution}
                                        onChange={(e) => setInstitution(e.target.value)}
                                        placeholder="Type school name..."
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#ED8936]/10 transition-all text-sm md:text-base"
                                    />
                                    {institution.length > 3 && (
                                        <motion.div 
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                            className="mt-2 flex items-center gap-1.5 text-emerald-600 text-sm font-semibold"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                            Institution Verified: Nairobi Campus
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block font-bold text-slate-800 text-sm md:text-base">Select Level / Class</label>
                                <div className="relative">
                                    <select 
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-4 focus:ring-[#ED8936]/10 cursor-pointer text-sm md:text-base"
                                    >
                                        <option>Junior Secondary - Grade 7 (CBC)</option>
                                        <option>Junior Secondary - Grade 8 (CBC)</option>
                                        <option>Senior School - Grade 10</option>
                                        <option>Undergraduate - Year 1</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                    </div>
                                </div>
                            </div>

                            <motion.div 
                                initial={{ scale: 0.98, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-sky-50 border border-sky-100 p-4 md:p-5 rounded-2xl flex items-start gap-4"
                            >
                                <span className="text-2xl">📅</span>
                                <div>
                                    <p className="font-bold text-sky-900 text-sm md:text-base">Next Scheduled Delivery</p>
                                    <p className="text-sky-700 text-xs md:text-sm">Tuesday, March 31st • Alliance Campus Pick-up Point</p>
                                </div>
                            </motion.div>

                            <motion.button 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleViewLists}
                                className="w-full bg-[#ED8936] hover:bg-[#d7782b] text-white font-bold py-4 rounded-2xl shadow-xl shadow-orange-500/20 transition-all text-base md:text-lg"
                            >
                                View Approved Lists
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-12"
                        >
                            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">School Catalog Loaded</h2>
                            <p className="text-slate-500 mb-8">Fetching lists for {institution}...</p>
                            <button 
                                onClick={() => setStep(1)}
                                className="px-8 py-3 bg-slate-100 font-bold rounded-xl hover:bg-slate-200 transition-all"
                            >
                                ← Go Back
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="mt-20 py-8 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
                    Official Supplier for Kenyan Institutions
                </p>
            </footer>
        </div>
    );
};

export default Demo2;