import React, { useState } from 'react';
import { Waves } from 'lucide-react';

const RectifierSimulator = () => {
    const [type, setType] = useState('half');

    return (
        <div className="glass-panel p-6 my-4 border border-white/10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
                    <Waves className="w-5 h-5 text-primary-400" />
                    Rectifier Waveform
                </h3>
                <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                    <button
                        onClick={() => setType('half')}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${type === 'half' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:bg-white/10'}`}
                    >
                        Half Wave
                    </button>
                    <button
                        onClick={() => setType('full')}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${type === 'full' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:bg-white/10'}`}
                    >
                        Full Wave
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="bg-dark-bg rounded-lg p-4 h-32 relative flex items-center justify-center overflow-hidden border-2 border-white/10">
                    <div className="absolute top-2 left-2 text-xs text-gray-400">Input (AC)</div>
                    {/* Simple SVG Sine Wave */}
                    <svg viewBox="0 0 300 100" className="w-full h-full text-green-500">
                        <path d="M0,50 Q25,0 50,50 T100,50 T150,50 T200,50 T250,50 T300,50" fill="none" stroke="currentColor" strokeWidth="2" />
                        {/* Dashed center line */}
                        <line x1="0" y1="50" x2="300" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="4" />
                    </svg>
                </div>

                <div className="flex justify-center">
                    <div className="bg-primary-500/20 text-primary-300 text-xs font-bold px-2 py-1 rounded border border-primary-500/30">
                        ↓ {type === 'half' ? '1 Diode Blocks Negative Cycle' : '4 Diodes Flip Negative Cycle'} ↓
                    </div>
                </div>

                <div className="bg-dark-bg rounded-lg p-4 h-32 relative flex items-center justify-center overflow-hidden border-2 border-white/10">
                    <div className="absolute top-2 left-2 text-xs text-gray-400">Output (DC)</div>
                    {/* Simulated Output Wave */}
                    <svg viewBox="0 0 300 100" className="w-full h-full text-yellow-400">
                        {type === 'half' ? (
                            <path d="M0,50 Q25,0 50,50 L100,50 Q125,0 150,50 L200,50 Q225,0 250,50 L300,50" fill="none" stroke="currentColor" strokeWidth="2" />
                        ) : (
                            <path d="M0,50 Q25,0 50,50 Q75,0 100,50 Q125,0 150,50 Q175,0 200,50 Q225,0 250,50 Q275,0 300,50" fill="none" stroke="currentColor" strokeWidth="2" />
                        )}
                        <line x1="0" y1="50" x2="300" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="4" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default RectifierSimulator;
