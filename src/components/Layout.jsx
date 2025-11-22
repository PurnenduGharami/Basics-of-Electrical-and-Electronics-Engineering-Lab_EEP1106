import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-dark-bg text-dark-text selection:bg-primary-500/30">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-dark-card/90 backdrop-blur-md border-b border-white/10 p-4 z-20 flex items-center justify-between">
                <span className="font-bold text-white">Lab Viva Prep</span>
                <button onClick={() => setSidebarOpen(true)} className="text-gray-400 hover:text-white">
                    <Menu size={24} />
                </button>
            </div>

            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Content */}
            <main className="flex-grow md:ml-72 pt-20 md:pt-8 px-4 sm:px-6 lg:px-8 pb-8 min-h-screen transition-all duration-200">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
