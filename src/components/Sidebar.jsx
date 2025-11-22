import React from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { experiments } from '../data/experiments';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const currentId = parseInt(location.pathname.split('/').pop());

    return (
        <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition duration-200 ease-in-out z-30 w-72 bg-dark-card/95 backdrop-blur-xl border-r border-white/10 flex flex-col shadow-2xl`}>
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-400">Lab Viva Prep</h1>
                    <p className="text-xs text-gray-400">Digital Companion</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                    <X size={24} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
                <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all duration-200 ${location.pathname === '/' ? 'bg-primary-500/10 text-white border border-primary-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                >
                    <span className="font-medium">Home</span>
                </Link>

                <div className="pt-4 pb-2 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Experiments</div>

                {experiments.map((exp) => (
                    <Link
                        key={exp.id}
                        to={`/experiment/${exp.id}`}
                        onClick={() => setIsOpen(false)}
                        className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all duration-200 group ${currentId === exp.id ? 'bg-primary-500/10 text-white border border-primary-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                    >
                        <div className={`${currentId === exp.id ? 'text-primary-400' : 'text-gray-500 group-hover:text-primary-400'}`}>
                            {exp.icon}
                        </div>
                        <div className="text-left overflow-hidden">
                            <p className="font-medium truncate">{exp.title}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t border-white/10 text-xs text-center text-gray-500">
                Ready for Viva Voce
            </div>
        </div>
    );
};

export default Sidebar;
