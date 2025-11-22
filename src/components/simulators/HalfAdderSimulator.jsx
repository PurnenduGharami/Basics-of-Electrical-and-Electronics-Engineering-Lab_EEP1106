import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';

const HalfAdderSimulator = () => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    const sum = a !== b; // XOR
    const carry = a && b; // AND

    return (
        <div className="glass-panel p-6 my-4 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <Maximize2 className="w-5 h-5 text-primary-400" />
                Half Adder Simulator
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Inputs */}
                <div className="flex flex-col gap-4 bg-white/5 p-4 rounded-lg shadow-sm border border-white/10">
                    <h4 className="text-sm font-bold text-gray-400 uppercase">Inputs</h4>
                    <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-white">A</span>
                        <button
                            onClick={() => setA(!a ? 1 : 0)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${a ? 'bg-primary-500' : 'bg-gray-600'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${a ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-white">B</span>
                        <button
                            onClick={() => setB(!b ? 1 : 0)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${b ? 'bg-primary-500' : 'bg-gray-600'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${b ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </div>
                </div>

                {/* Logic Graphic (Simplified) */}
                <div className="flex flex-col items-center text-primary-300 text-xs gap-2">
                    <div className="flex gap-1">
                        <span className="bg-primary-500/20 px-2 py-1 rounded text-primary-300 font-bold">XOR</span>
                        <span className="text-gray-400">→ Sum</span>
                    </div>
                    <div className="flex gap-1">
                        <span className="bg-primary-500/20 px-2 py-1 rounded text-primary-300 font-bold">AND</span>
                        <span className="text-gray-400">→ Carry</span>
                    </div>
                </div>

                {/* Outputs */}
                <div className="flex flex-col gap-4 bg-white/5 p-4 rounded-lg shadow-sm border border-white/10">
                    <h4 className="text-sm font-bold text-gray-400 uppercase">Outputs</h4>
                    <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-white">Sum (S)</span>
                        <div className={`w-4 h-4 rounded-full transition-all duration-300 ${sum ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]' : 'bg-red-900'}`}></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-white">Carry (C)</span>
                        <div className={`w-4 h-4 rounded-full transition-all duration-300 ${carry ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]' : 'bg-red-900'}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HalfAdderSimulator;
