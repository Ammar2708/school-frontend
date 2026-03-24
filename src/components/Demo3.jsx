import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Demo3 = () => {
    // --- Functional State ---
    const [cartCount, setCartCount] = useState(0);
    const [view, setView] = useState('selection'); // 'selection', 'individual', or 'checkout'
    const [selectedKit, setSelectedKit] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [schoolPath] = useState({ school: 'Alliance High School', grade: 'Grade 7' });

    // Handle Kit Selection
    const handleKitSelect = (kit) => {
        setIsProcessing(true);
        setSelectedKit(kit);
        setCartCount(1); // Assuming 1 kit replaces the cart for simplicity
        
        // Simulate a brief "Adding to Cart" delay for UX
        setTimeout(() => {
            setIsProcessing(false);
            setView('checkout');
        }, 800);
    };

    const kits = [
        {
            id: 'basic',
            title: "Basic Kit",
            price: "KSh 4,500",
            features: ["12 Exercise Books", "Mathematical Set", "Essential Stationery Pack"],
            buttonText: "Select Kit",
            highlight: false
        },
        {
            id: 'standard',
            title: "Standard Kit",
            price: "KSh 12,200",
            features: ["Complete Uniform Set (3pcs)", "Full Stationery Bundle", "Lab Coat & Safety Gear", "Approved Textbook Set"],
            buttonText: "Add to Cart",
            highlight: true,
            badge: "BEST VALUE"
        },
        {
            id: 'individual',
            title: "Individual Items",
            price: null,
            description: "Pick precisely what you need from the approved list.",
            buttonText: "Browse Items",
            highlight: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 font-sans text-[#1C3B61] antialiased">
            {/* --- Loading Overlay --- */}
            <AnimatePresence>
                {isProcessing && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-md flex flex-col items-center justify-center"
                    >
                        <motion.div 
                            animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mb-4"
                        />
                        <p className="font-bold text-slate-900 animate-pulse text-sm uppercase tracking-widest">Adding to Order...</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Header --- */}
            <header className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
                <div 
                    className="text-xl font-bold tracking-tight uppercase cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => { setView('selection'); setSelectedKit(null); }}
                >
                    Institutional Supply
                </div>
                <div className="flex items-center gap-3 font-bold text-[#1C3B61] bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                    <span className="text-lg">🛒</span>
                    <span className="text-sm uppercase tracking-wider">Cart ({cartCount})</span>
                </div>
            </header>

            <main className="max-w-6xl mx-auto py-12 px-6">
                {/* --- Breadcrumb --- */}
                <nav className="text-gray-400 text-sm mb-10 flex gap-2 items-center overflow-x-auto whitespace-nowrap">
                    <span className="hover:text-[#ED8936] cursor-pointer" onClick={() => setView('selection')}>{schoolPath.school}</span>
                    <span className="select-none text-slate-300">/</span>
                    <span className="text-slate-900 font-bold uppercase tracking-tighter">
                        {view === 'selection' ? 'Choose Order' : view === 'checkout' ? 'Order Summary' : 'Individual Items'}
                    </span>
                </nav>

                <AnimatePresence mode="wait">
                    {view === 'selection' ? (
                        <motion.div 
                            key="selection" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                            className="grid md:grid-cols-3 gap-6 items-stretch"
                        >
                            {kits.map((kit, index) => (
                                <motion.div
                                    key={kit.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                                    className={`relative flex flex-col rounded-3xl transition-all duration-300 bg-white border ${
                                        kit.highlight ? 'border-[#ED8936] shadow-xl md:scale-105 z-10' : 'border-slate-200 shadow-sm'
                                    }`}
                                >
                                    {kit.badge && <span className="absolute -top-3 right-6 bg-[#ED8936] text-white text-[10px] font-black px-3 py-1 rounded-full tracking-wider">{kit.badge}</span>}
                                    <div className="p-8 flex-grow">
                                        <h3 className="text-xl font-bold text-slate-800 mb-4">{kit.title}</h3>
                                        <div className="text-3xl font-black mb-6">{kit.price || "—"}</div>
                                        {kit.features ? (
                                            <ul className="space-y-3">
                                                {kit.features.map((f, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-500 font-medium"><span className="text-[#ED8936]">✓</span>{f}</li>
                                                ))}
                                            </ul>
                                        ) : <p className="text-gray-500 text-sm italic">{kit.description}</p>}
                                    </div>
                                    <div className="p-6 pt-0 mt-auto">
                                        <button
                                            onClick={() => kit.id === 'individual' ? setView('individual') : handleKitSelect(kit)}
                                            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                                                kit.highlight ? 'bg-[#ED8936] text-white' : 'bg-slate-900 text-white'
                                            }`}
                                        >
                                            {kit.buttonText}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : view === 'checkout' ? (
                        /* --- Final Summary / Checkout View --- */
                        <motion.div 
                            key="checkout" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="max-w-md mx-auto bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100"
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                                <h2 className="text-2xl font-black">Order Summary</h2>
                                <p className="text-slate-500 text-sm">{schoolPath.school}</p>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center py-4 border-b border-slate-50">
                                    <div>
                                        <p className="font-bold text-slate-900">{selectedKit?.title}</p>
                                        <p className="text-xs text-slate-400 uppercase font-black">Institutional Package</p>
                                    </div>
                                    <span className="font-black text-lg">{selectedKit?.price}</span>
                                </div>
                                <div className="flex justify-between font-black text-xl pt-2">
                                    <span>Total</span>
                                    <span className="text-[#ED8936]">{selectedKit?.price}</span>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-[#ED8936] text-white font-black rounded-2xl shadow-xl shadow-orange-500/30 uppercase tracking-[0.2em] text-sm active:scale-95 transition-transform">
                                Proceed to Payment
                            </button>
                            <button 
                                onClick={() => { setView('selection'); setCartCount(0); }}
                                className="w-full mt-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600"
                            >
                                Change Selection
                            </button>
                        </motion.div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border">
                             <h2 className="text-xl font-bold">Individual Items Catalog</h2>
                             <button onClick={() => setView('selection')} className="mt-4 text-orange-500 underline font-bold">Return Home</button>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Demo3;