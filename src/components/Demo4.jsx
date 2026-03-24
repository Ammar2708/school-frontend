import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Demo4 = () => {
    // 1. Manage active tab state
    const [activeTab, setActiveTab] = useState("Logistics & Batches");

    const manifestData = [
        { id: 1, institution: "Alliance Boys", date: "31 Mar 2026", orders: "142 Kits", status: "Preparing", statusColor: "text-amber-500 bg-amber-50" },
        { id: 2, institution: "Nairobi School", date: "02 Apr 2026", orders: "89 Kits", status: "Scheduled", statusColor: "text-emerald-500 bg-emerald-50" },
    ];

    const menuItems = [
        { name: "Dashboard", icon: "📊" },
        { name: "Logistics & Batches", icon: "🚚" },
        { name: "Institutions", icon: "🏫" },
        { name: "Product Kits", icon: "📦" },
    ];

    // 2. Component for the Batches Table (Extracted for cleanliness)
    const LogisticsContent = () => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <header className="mb-8">
                <h1 className="text-2xl font-black text-[#1C2B3E] tracking-tight">
                    Batch Delivery Manifest
                </h1>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white border-b border-slate-100">
                            <th className="px-8 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Institution</th>
                            <th className="px-8 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Delivery Date</th>
                            <th className="px-8 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Orders</th>
                            <th className="px-8 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="px-8 py-5 text-sm font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {manifestData.map((row, index) => (
                            <motion.tr 
                                key={row.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-slate-50/80 transition-colors group"
                            >
                                <td className="px-8 py-5 font-semibold text-slate-700">{row.institution}</td>
                                <td className="px-8 py-5 text-slate-500 font-medium">{row.date}</td>
                                <td className="px-8 py-5 text-slate-500 font-medium">{row.orders}</td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.statusColor}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <button className="text-[#1C3B61] font-bold text-sm hover:underline underline-offset-4 decoration-[#ED8936] decoration-2">
                                        View Manifest
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );

    // 3. Placeholder for other tabs
    const PlaceholderContent = ({ title }) => (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border-2 border-dashed border-slate-200"
        >
            <div className="text-4xl mb-4 opacity-20">📂</div>
            <h2 className="text-xl font-bold text-slate-400">{title} Section</h2>
            <p className="text-slate-400 text-sm">Module functionality coming soon.</p>
        </motion.div>
    );

    return (
        <div className="flex min-h-screen bg-[#F1F5F9] font-sans antialiased">
            {/* --- Sidebar --- */}
            <aside className="w-72 bg-[#1C2B3E] text-slate-300 flex flex-col shadow-xl sticky top-0 h-screen">
                <div className="p-8 pb-12">
                    <div className="text-white font-black text-lg mb-8 tracking-tighter">ADMIN PANEL</div>
                    <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase opacity-50">Main Menu</h2>
                </div>

                <nav className="flex-1 space-y-1 px-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)} // Set active tab on click
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all duration-200 group relative ${
                                activeTab === item.name 
                                ? 'bg-[#2D3E50] text-[#ED8936] font-bold' 
                                : 'hover:bg-[#2D3E50]/50 hover:text-white'
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-sm tracking-wide">{item.name}</span>
                            
                            {activeTab === item.name && (
                                <motion.div 
                                    layoutId="activePill" // Framer Motion handles the slide animation automatically
                                    className="absolute right-0 w-1.5 h-6 bg-[#ED8936] rounded-l-full" 
                                />
                            )}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 p-10 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {activeTab === "Logistics & Batches" ? (
                        <LogisticsContent key="logistics" />
                    ) : (
                        <PlaceholderContent key={activeTab} title={activeTab} />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default Demo4;