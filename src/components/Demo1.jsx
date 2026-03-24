import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Assets ---
const GraduationCapIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-yellow-600">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
);

const BuildingIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-yellow-600">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
        <path d="M9 22v-4h6v4"/>
        <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>
    </svg>
);

const Demo1 = () => {
    const [activeForm, setActiveForm] = useState(null); // 'support', 'track', 'student', 'admin'

    // --- Form Components ---
    const renderForm = () => {
        switch (activeForm) {
            case 'support':
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-gray-900">Customer Support</h2>
                        <input type="text" placeholder="Full Name" className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 ring-orange-400" />
                        <select className="w-full p-3 bg-slate-50 border rounded-xl outline-none">
                            <option>Order Issue</option>
                            <option>Payment Query</option>
                            <option>Technical Support</option>
                        </select>
                        <textarea placeholder="How can we help?" rows="4" className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 ring-orange-400" />
                        <button onClick={() => {alert('Ticket Created'); setActiveForm(null);}} className="w-full py-4 bg-orange-500 text-white font-bold rounded-xl shadow-lg shadow-orange-200">Submit Ticket</button>
                    </div>
                );
            case 'track':
                return (
                    <div className="space-y-4 text-center">
                        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                        </div>
                        <h2 className="text-2xl font-bold">Track Shipment</h2>
                        <p className="text-gray-500 text-sm">Enter your 12-digit tracking number</p>
                        <input type="text" placeholder="e.g. 4829-1029-3321" className="w-full p-4 text-center text-xl font-mono tracking-widest bg-slate-100 border-none rounded-xl outline-none focus:ring-2 ring-blue-500" />
                        <button onClick={() => {alert('Locating Package...'); setActiveForm(null);}} className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl">Track Now</button>
                    </div>
                );
            case 'student':
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Find Your School</h2>
                        <div className="relative">
                            <input type="text" placeholder="Search school name..." className="w-full p-4 pl-12 bg-slate-100 rounded-2xl outline-none" />
                            <svg className="absolute left-4 top-4 text-gray-400" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        </div>
                        <div className="max-h-48 overflow-y-auto border-t pt-2 space-y-2">
                            {['Lincoln High School', 'Springfield Academy', 'Global International College'].map(s => (
                                <div key={s} onClick={() => {alert(`Selected: ${s}`); setActiveForm(null);}} className="p-3 hover:bg-orange-50 rounded-lg cursor-pointer flex justify-between items-center group">
                                    <span className="font-medium text-gray-700">{s}</span>
                                    <span className="text-orange-500 opacity-0 group-hover:opacity-100">Select →</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'admin':
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-blue-900">Institutional Access</h2>
                        <p className="text-sm text-gray-500">Sign in to manage your campus procurement.</p>
                        <input type="text" placeholder="Institution Code" className="w-full p-3 bg-slate-50 border rounded-xl outline-none" />
                        <input type="password" placeholder="Access Pin" className="w-full p-3 bg-slate-50 border rounded-xl outline-none" />
                        <button onClick={() => {alert('Accessing Dashboard'); setActiveForm(null);}} className="w-full py-4 bg-blue-900 text-white font-bold rounded-xl shadow-xl shadow-blue-200">Login to Dashboard</button>
                    </div>
                );
            default: return null;
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 + i * 0.15, duration: 0.5, ease: 'easeOut' },
        }),
    };

    return (
        <div className="min-h-screen bg-slate-100 text-gray-900 flex flex-col font-sans">
            {/* --- MODAL OVERLAY --- */}
            <AnimatePresence>
                {activeForm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveForm(null)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl relative z-10">
                            {renderForm()}
                            <button onClick={() => setActiveForm(null)} className="w-full mt-4 text-gray-400 text-sm hover:text-gray-600 font-medium">Cancel and return</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
                <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold text-gray-950 flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#ED8936] rounded-sm"></div>
                        INSTITUTIONAL SUPPLY
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-6">
                        <button onClick={() => setActiveForm('support')} className="text-gray-700 hover:text-gray-950 transition-colors font-medium">Support</button>
                        <button onClick={() => setActiveForm('track')} className="text-[#ED8936] hover:text-[#d7782b] transition-colors font-semibold flex items-center gap-1">
                            Track Order
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                    </motion.div>
                </nav>
            </header>

            <section className="bg-[#1C3B61] text-white flex-grow flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg width="100%" height="100%"><rect width="100%" height="100%" fill="url(#grid)"/><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="currentColor"/></pattern></defs></svg>
                </div>

                <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center">
                    <div className="text-center mb-16 space-y-4 max-w-3xl">
                        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                            Institutional Procurement Simplified
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-lg md:text-xl text-slate-200">
                            From approved student kits to full institutional supply — delivered direct to campus.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 w-full">
                        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants} whileHover={{ y: -5 }} className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 text-center flex flex-col items-center justify-between">
                            <div className="space-y-6 flex flex-col items-center">
                                <div className="p-4 bg-yellow-50 rounded-2xl"><GraduationCapIcon /></div>
                                <h3 className="text-2xl font-bold text-gray-950">I'm a Parent / Student</h3>
                                <p className="text-gray-600 max-w-sm">Order kits, stationery, and uniforms for your school.</p>
                            </div>
                            <button onClick={() => setActiveForm('student')} className="w-full mt-10 bg-[#ED8936] hover:bg-[#d7782b] text-white font-bold py-4 px-8 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-orange-500/20">
                                Start Student Flow
                            </button>
                        </motion.div>

                        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants} whileHover={{ y: -5 }} className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 text-center flex flex-col items-center justify-between">
                            <div className="space-y-6 flex flex-col items-center">
                                <div className="p-4 bg-yellow-50 rounded-2xl"><BuildingIcon /></div>
                                <h3 className="text-2xl font-bold text-gray-950">I'm an Institution</h3>
                                <p className="text-gray-600 max-w-sm">Request bulk quotes and manage campus contracts.</p>
                            </div>
                            <button onClick={() => setActiveForm('admin')} className="w-full mt-10 bg-[#1C3B61] hover:bg-[#162f4e] text-white font-bold py-4 px-8 rounded-xl transition-all active:scale-[0.98] shadow-md shadow-blue-900/10">
                                Institutional Dashboard
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm">
                <p>&copy; 2024 Institutional Supply. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Demo1;