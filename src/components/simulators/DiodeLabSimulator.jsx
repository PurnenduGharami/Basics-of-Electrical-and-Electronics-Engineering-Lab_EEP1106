import React, { useState, useEffect } from 'react';
import { Zap, TrendingUp, RefreshCcw, AlertCircle, Info } from 'lucide-react';

const DiodeLabSimulator = () => {
    // State
    const [biasMode, setBiasMode] = useState('FORWARD'); // 'FORWARD' or 'REVERSE'
    const [voltage, setVoltage] = useState(0); // Applied Voltage (0-10V)
    const [dataPoints, setDataPoints] = useState([]);

    // Constants
    const KNEE_VOLTAGE = 0.7; // Silicon
    const SERIES_RESISTANCE = 100; // Ohms

    // Calculations
    const calculateValues = () => {
        let diodeV = 0;
        let current = 0; // mA for Fwd, uA for Rev

        if (biasMode === 'FORWARD') {
            // Simple Piecewise Model
            if (voltage < KNEE_VOLTAGE) {
                diodeV = voltage;
                current = 0;
            } else {
                diodeV = KNEE_VOLTAGE + (voltage - KNEE_VOLTAGE) * 0.05; // Small drop increase
                // I = (V_source - V_diode) / R
                current = ((voltage - diodeV) / SERIES_RESISTANCE) * 1000; // mA
            }
        } else {
            // Reverse Bias
            diodeV = voltage; // Diode takes full voltage (Open switch mostly)
            current = voltage * 0.1; // Tiny leakage (uA) - linear approx for sim
            if (voltage > 20) current = 1000; // Breakdown sim (not reachable with 10V slider)
        }
        return { v: diodeV, i: current };
    };

    const vals = calculateValues();

    // Add point to graph on button click
    const recordReading = () => {
        setDataPoints([...dataPoints, {
            v_source: voltage,
            v_diode: vals.v,
            i: vals.i,
            mode: biasMode
        }]);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-slate-50 rounded-xl shadow-xl font-sans text-slate-800">

            <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                        <Zap className="w-6 h-6" /> P-N Junction Diode Lab
                    </h1>
                    <p className="text-sm text-slate-500">Experiment 6: V-I Characteristics</p>
                </div>
                <button
                    onClick={() => { setDataPoints([]); setVoltage(0); }}
                    className="px-4 py-2 bg-white border rounded-full text-slate-600 hover:bg-slate-100 flex items-center gap-2"
                >
                    <RefreshCcw className="w-4 h-4" /> Reset Data
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left: Circuit Controls */}
                <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-inner">

                    {/* Bias Toggle */}
                    <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                        <button
                            onClick={() => { setBiasMode('FORWARD'); setVoltage(0); }}
                            className={`flex-1 py-2 rounded-md font-bold transition-all ${biasMode === 'FORWARD' ? 'bg-blue-600 text-white shadow' : 'text-slate-500'}`}
                        >
                            Forward Bias
                        </button>
                        <button
                            onClick={() => { setBiasMode('REVERSE'); setVoltage(0); }}
                            className={`flex-1 py-2 rounded-md font-bold transition-all ${biasMode === 'REVERSE' ? 'bg-red-600 text-white shadow' : 'text-slate-500'}`}
                        >
                            Reverse Bias
                        </button>
                    </div>

                    {/* Visual Diagram */}
                    <div className="h-40 bg-slate-50 border rounded-lg mb-6 relative flex items-center justify-center">
                        {/* Battery */}
                        <div className="absolute left-4 top-14 flex flex-col items-center">
                            <div className="text-xs font-bold mb-1">{voltage}V</div>
                            <div className="w-8 h-8 border-2 border-slate-800 rounded flex items-center justify-center font-bold bg-white">DC</div>
                        </div>
                        {/* Resistor */}
                        <div className="absolute top-14 left-24 w-12 h-4 bg-amber-100 border border-amber-600 flex items-center justify-center text-[8px]">100Ω</div>
                        {/* Diode */}
                        <div className="absolute top-12 right-20 flex flex-col items-center">
                            <div className={`w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] ${biasMode === 'FORWARD' ? 'border-b-slate-800' : 'border-b-slate-300'} rotate-90`}></div>
                            <div className={`w-[2px] h-[20px] bg-black absolute right-[-2px] top-0`}></div>
                            <span className="text-xs mt-2 font-bold">{biasMode === 'FORWARD' ? 'D (Si)' : 'D (Rev)'}</span>
                        </div>
                        {/* Wires */}
                        <svg className="absolute inset-0 pointer-events-none">
                            <path d="M 50 70 L 100 70 M 140 70 L 200 70" stroke="black" strokeWidth="2" />
                        </svg>
                    </div>

                    {/* Voltage Slider */}
                    <div className="mb-6">
                        <label className="text-sm font-bold text-slate-600 block mb-2">Source Voltage: {voltage} V</label>
                        <input
                            type="range" min="0" max="10" step="0.1"
                            value={voltage} onChange={(e) => setVoltage(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    {/* Live Readings */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-800 p-3 rounded text-green-400 font-mono text-center">
                            <div className="text-xs text-slate-400">Diode Current</div>
                            <div className="text-xl">{vals.i.toFixed(2)} <span className="text-sm">{biasMode === 'FORWARD' ? 'mA' : 'μA'}</span></div>
                        </div>
                        <div className="bg-slate-800 p-3 rounded text-yellow-400 font-mono text-center">
                            <div className="text-xs text-slate-400">Diode Voltage</div>
                            <div className="text-xl">{vals.v.toFixed(2)} V</div>
                        </div>
                    </div>

                    <button
                        onClick={recordReading}
                        className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <TrendingUp className="w-4 h-4" /> Record Reading
                    </button>

                </div>

                {/* Right: Graph Plotter */}
                <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-inner flex flex-col">
                    <h3 className="font-bold text-slate-700 mb-4">V-I Characteristic Graph</h3>

                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded relative overflow-hidden min-h-[300px]">
                        {/* Axes */}
                        <div className="absolute left-10 bottom-10 w-[calc(100%-60px)] h-[1px] bg-slate-400"></div> {/* X Axis */}
                        <div className="absolute left-10 top-10 h-[calc(100%-60px)] w-[1px] bg-slate-400"></div> {/* Y Axis */}
                        <div className="absolute left-2 bottom-10 text-xs font-bold">0</div>

                        {/* Labels */}
                        <div className="absolute bottom-2 right-10 text-xs font-bold text-slate-500">Voltage (V)</div>
                        <div className="absolute top-10 left-2 text-xs font-bold text-slate-500 -rotate-90 origin-bottom-left">Current</div>

                        {/* Points */}
                        {dataPoints.filter(p => p.mode === biasMode).map((p, i) => {
                            // Scaling: 
                            // X: 0-2V (Fwd) or 0-10V (Rev) -> map to width
                            // Y: 0-100mA (Fwd) or 0-2uA (Rev) -> map to height
                            const xMax = biasMode === 'FORWARD' ? 2 : 10;
                            const yMax = biasMode === 'FORWARD' ? 100 : 2;

                            const left = 40 + (p.v_diode / xMax) * 250; // Simple scaling
                            const bottom = 40 + (p.i / yMax) * 250;

                            return (
                                <div
                                    key={i}
                                    className="absolute w-2 h-2 bg-red-500 rounded-full hover:scale-150 transition-transform cursor-pointer"
                                    style={{ left: `${Math.min(left, 300)}px`, bottom: `${Math.min(bottom, 300)}px` }}
                                    title={`V:${p.v_diode.toFixed(2)}, I:${p.i.toFixed(2)}`}
                                ></div>
                            );
                        })}

                        {/* Knee Voltage Indicator */}
                        {biasMode === 'FORWARD' && (
                            <div className="absolute bottom-10 border-l border-dashed border-green-500 h-full" style={{ left: `${40 + (0.7 / 2) * 250}px` }}>
                                <span className="text-[10px] text-green-700 bg-white px-1 absolute top-1/2 -left-4">Knee (0.7V)</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 text-xs text-slate-500">
                        <Info className="w-3 h-3 inline mr-1" />
                        Click "Record Reading" at different voltages to plot the points.
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DiodeLabSimulator;
