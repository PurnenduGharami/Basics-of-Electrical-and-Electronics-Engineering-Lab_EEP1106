import React, { useState, useEffect } from 'react';
import { Activity, Power, Zap, RotateCcw, CheckCircle, Info } from 'lucide-react';

// --- Circuit Constants ---
const V1_VOLTAGE = 12;
const V2_VOLTAGE = 5;
const R1 = 100; // Ohm
const R2 = 100; // Ohm (Central Resistor)
const R3 = 100; // Ohm

const SuperpositionSimulator = () => {
    // State for sources: 'ON' or 'OFF' (Shorted)
    const [v1State, setV1State] = useState('ON');
    const [v2State, setV2State] = useState('ON');

    const [results, setResults] = useState({
        iTotal: 0,
        iPrime: 0,
        iDoublePrime: 0
    });

    // --- Physics Calculation ---
    const calculateCurrent = (v1On, v2On) => {
        // Superposition Analysis for T-Network
        // Circuit: V1 -- R1 --Node A-- R3 -- V2
        //                      |
        //                      R2
        //                      |
        //                     GND

        // Using Nodal Analysis at Node A:
        // (Va - V1)/R1 + Va/R2 + (Va - V2)/R3 = 0
        // Va(1/R1 + 1/R2 + 1/R3) = V1/R1 + V2/R2

        const v1 = v1On ? V1_VOLTAGE : 0;
        const v2 = v2On ? V2_VOLTAGE : 0;

        const conductanceSum = (1 / R1) + (1 / R2) + (1 / R3);
        const currentSourceSum = (v1 / R1) + (v2 / R3);

        const Va = currentSourceSum / conductanceSum;

        // Current through central resistor R2 (downward)
        const iR2 = Va / R2;
        return iR2 * 1000; // Convert to mA
    };

    // Update calculations whenever state changes
    const currentVal = calculateCurrent(v1State === 'ON', v2State === 'ON');

    // Store specific case results for verification
    useEffect(() => {
        if (v1State === 'ON' && v2State === 'ON') {
            setResults(prev => ({ ...prev, iTotal: currentVal }));
        } else if (v1State === 'ON' && v2State === 'OFF') {
            setResults(prev => ({ ...prev, iPrime: currentVal }));
        } else if (v1State === 'OFF' && v2State === 'ON') {
            setResults(prev => ({ ...prev, iDoublePrime: currentVal }));
        }
    }, [v1State, v2State, currentVal]);

    const isVerified = Math.abs(results.iTotal - (results.iPrime + results.iDoublePrime)) < 0.1;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-slate-50 rounded-xl shadow-xl font-sans text-slate-800">

            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                        <Activity className="w-6 h-6" /> Superposition Theorem
                    </h1>
                    <p className="text-sm text-slate-500">Experiment 2: Linear Bilateral Network Analysis</p>
                </div>
                <button
                    onClick={() => {
                        setV1State('ON');
                        setV2State('ON');
                        setResults({ iTotal: 0, iPrime: 0, iDoublePrime: 0 });
                    }}
                    className="px-4 py-2 bg-white border border-slate-300 rounded-full text-slate-600 hover:bg-slate-100 flex items-center gap-2 transition-colors"
                >
                    <RotateCcw className="w-4 h-4" /> Reset Experiment
                </button>
            </div>

            {/* Main Circuit Visualization */}
            <div className="relative h-64 bg-white rounded-xl border border-slate-300 shadow-inner mb-8 select-none overflow-hidden">
                <div className="absolute top-2 left-4 text-xs font-bold text-slate-400 tracking-widest">CIRCUIT DIAGRAM (T-NETWORK)</div>

                {/* Circuit Lines SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    {/* Left Loop */}
                    <path d="M 100 200 L 100 100 L 300 100" stroke="#475569" strokeWidth="4" fill="none" />
                    <path d="M 400 100 L 450 100" stroke="#475569" strokeWidth="4" fill="none" />

                    {/* Right Loop */}
                    <path d="M 450 100 L 500 100" stroke="#475569" strokeWidth="4" fill="none" />
                    <path d="M 600 100 L 800 100 L 800 200" stroke="#475569" strokeWidth="4" fill="none" />

                    {/* Central Branch */}
                    <path d="M 450 100 L 450 180" stroke="#475569" strokeWidth="4" fill="none" />
                    <path d="M 450 220 L 450 250" stroke="#475569" strokeWidth="4" fill="none" />

                    {/* Ground Line */}
                    <path d="M 100 200 L 800 200" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                </svg>

                {/* Component: V1 (Left Source) */}
                <div className="absolute left-[70px] top-[130px] z-20 flex flex-col items-center">
                    <button
                        onClick={() => setV1State(v1State === 'ON' ? 'OFF' : 'ON')}
                        className={`w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center shadow-lg transition-all ${v1State === 'ON' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-slate-200 border-slate-400 text-slate-500'
                            }`}
                    >
                        <Power className="w-6 h-6 mb-1" />
                        <span className="text-xs font-bold">{v1State === 'ON' ? '12V' : 'SHORT'}</span>
                    </button>
                    <span className="mt-2 text-xs font-bold text-slate-600">Source V1</span>
                </div>

                {/* Component: V2 (Right Source) */}
                <div className="absolute left-[770px] top-[130px] z-20 flex flex-col items-center">
                    <button
                        onClick={() => setV2State(v2State === 'ON' ? 'OFF' : 'ON')}
                        className={`w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center shadow-lg transition-all ${v2State === 'ON' ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-slate-200 border-slate-400 text-slate-500'
                            }`}
                    >
                        <Power className="w-6 h-6 mb-1" />
                        <span className="text-xs font-bold">{v2State === 'ON' ? '5V' : 'SHORT'}</span>
                    </button>
                    <span className="mt-2 text-xs font-bold text-slate-600">Source V2</span>
                </div>

                {/* Resistors */}
                <div className="absolute left-[300px] top-[85px] bg-amber-100 border-2 border-amber-600 px-3 py-1 rounded text-xs font-bold text-amber-800 shadow-sm">
                    R1 (100Ω)
                </div>
                <div className="absolute left-[500px] top-[85px] bg-amber-100 border-2 border-amber-600 px-3 py-1 rounded text-xs font-bold text-amber-800 shadow-sm">
                    R3 (100Ω)
                </div>

                {/* Central Resistor R2 & Ammeter */}
                <div className="absolute left-[420px] top-[180px] z-20 flex flex-col items-center">
                    <div className="w-[60px] h-[40px] bg-amber-100 border-2 border-amber-600 rounded flex items-center justify-center shadow-sm mb-1">
                        <span className="text-xs font-bold text-amber-800">R2</span>
                    </div>
                    {/* Digital Ammeter Display */}
                    <div className="bg-slate-800 text-green-400 font-mono p-2 rounded border-2 border-slate-600 shadow-lg min-w-[100px] text-center">
                        {currentVal.toFixed(2)} mA
                        <div className="text-[8px] text-slate-400 mt-1">AMMETER (A)</div>
                    </div>
                </div>

                {/* Current Flow Arrows (Animated) */}
                {currentVal !== 0 && (
                    <div className="absolute left-[455px] top-[140px]">
                        <div className="animate-bounce">
                            <Zap className="w-6 h-6 text-yellow-500 fill-yellow-500 rotate-180" />
                        </div>
                    </div>
                )}

            </div>

            {/* Control & Verification Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Steps Guide */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
                        <Info className="w-4 h-4" /> Experimental Steps
                    </h3>
                    <div className="space-y-3">
                        <div
                            onClick={() => { setV1State('ON'); setV2State('ON'); }}
                            className={`p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center ${v1State === 'ON' && v2State === 'ON' ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'hover:bg-slate-50'}`}
                        >
                            <span className="text-sm font-medium">Step 1: Measure I_Total (Both ON)</span>
                            {v1State === 'ON' && v2State === 'ON' && <span className="text-indigo-600 font-mono font-bold">{currentVal.toFixed(2)} mA</span>}
                        </div>

                        <div
                            onClick={() => { setV1State('ON'); setV2State('OFF'); }}
                            className={`p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center ${v1State === 'ON' && v2State === 'OFF' ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'hover:bg-slate-50'}`}
                        >
                            <span className="text-sm font-medium">Step 2: Measure I' (V1 Only)</span>
                            {v1State === 'ON' && v2State === 'OFF' && <span className="text-indigo-600 font-mono font-bold">{currentVal.toFixed(2)} mA</span>}
                        </div>

                        <div
                            onClick={() => { setV1State('OFF'); setV2State('ON'); }}
                            className={`p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center ${v1State === 'OFF' && v2State === 'ON' ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' : 'hover:bg-slate-50'}`}
                        >
                            <span className="text-sm font-medium">Step 3: Measure I'' (V2 Only)</span>
                            {v1State === 'OFF' && v2State === 'ON' && <span className="text-indigo-600 font-mono font-bold">{currentVal.toFixed(2)} mA</span>}
                        </div>
                    </div>
                </div>

                {/* Verification Board */}
                <div className="bg-slate-800 text-slate-200 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Activity className="w-24 h-24" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Theorem Verification</h3>

                    <div className="space-y-4 font-mono text-sm">
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                            <span>I' (Due to V1)</span>
                            <span className="text-green-400">{results.iPrime.toFixed(2)} mA</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-700 pb-2">
                            <span>I'' (Due to V2)</span>
                            <span className="text-blue-400">+ {results.iDoublePrime.toFixed(2)} mA</span>
                        </div>
                        <div className="flex justify-between pt-2 text-lg font-bold">
                            <span>Calculated Sum</span>
                            <span className="text-yellow-400">{(results.iPrime + results.iDoublePrime).toFixed(2)} mA</span>
                        </div>

                        <div className="bg-slate-900 p-3 rounded flex justify-between items-center mt-4 border border-slate-600">
                            <span className="text-xs text-slate-400">Measured Total</span>
                            <span className="text-xl font-bold text-white">{results.iTotal.toFixed(2)} mA</span>
                        </div>

                        <div className={`mt-4 text-center p-2 rounded font-bold transition-colors ${isVerified ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-slate-700 text-slate-500'}`}>
                            {isVerified ? (
                                <span className="flex items-center justify-center gap-2">
                                    <CheckCircle className="w-5 h-5" /> SUPERPOSITION VERIFIED
                                </span>
                            ) : (
                                <span>Perform all steps to verify</span>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SuperpositionSimulator;