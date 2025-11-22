import React, { useState } from 'react';
import { Cpu, Zap } from 'lucide-react';

const LogicGateSimulator = ({ type }) => {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    const getOutput = () => {
        switch (type) {
            case 'AND': return a && b;
            case 'OR': return a || b;
            case 'NAND': return !(a && b);
            case 'NOR': return !(a || b);
            case 'XOR': return a !== b;
            default: return 0;
        }
    };

    const output = getOutput();

    return (
        <div className="glass-panel p-6 my-4 border border-white/10">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
                <Cpu className="w-5 h-5 text-primary-400" />
                {type} Gate Simulator
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-gray-400">Input A</span>
                        <button
                            onClick={() => setA(!a ? 1 : 0)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${a ? 'bg-green-500' : 'bg-gray-600'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${a ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                        <span className="font-mono text-white">{a}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-gray-400">Input B</span>
                        <button
                            onClick={() => setB(!b ? 1 : 0)}
                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${b ? 'bg-green-500' : 'bg-gray-600'}`}
                        >
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${b ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                        <span className="font-mono text-white">{b}</span>
                    </div>
                </div>

                <div className="hidden md:block w-16 h-0.5 bg-gray-600 relative">
                    <div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-gray-600 rotate-45"></div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-inner transition-all duration-300 ${output ? 'bg-red-500 border-red-600 shadow-red-500/50' : 'bg-gray-700 border-gray-600'}`}>
                        <Zap className={`w-8 h-8 ${output ? 'text-white fill-white' : 'text-gray-500'}`} />
                    </div>
                    <span className="font-mono font-bold text-gray-300">Output Y = {output ? 1 : 0}</span>
                </div>
            </div>
        </div>
    );
};

export default LogicGateSimulator;
