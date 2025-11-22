import React, { useState, useEffect } from 'react';
import { Settings, Activity, Zap, RotateCcw, Info, AlertTriangle } from 'lucide-react';

const TransformerLabSimulator = () => {
    // State: 'OC' (Open Circuit) or 'SC' (Short Circuit)
    const [testType, setTestType] = useState('OC');
    const [variacVal, setVariacVal] = useState(0); // 0 to 100%
    const [powerOn, setPowerOn] = useState(false);

    // Transformer Ratings
    const RATED_V_HV = 2000; // High Voltage Side
    const RATED_V_LV = 200;  // Low Voltage Side
    const RATED_KVA = 10;    // 10 kVA

    // Calculated Rated Currents
    const I_RATED_HV = (RATED_KVA * 1000) / RATED_V_HV; // 5A
    const I_RATED_LV = (RATED_KVA * 1000) / RATED_V_LV; // 50A

    // Simplified Physics Model
    // OC Test: on LV side. Rated V = 200V. No load I ~ 1A. Core Loss ~ 60W.
    // SC Test: on HV side. Rated I = 5A. Voltage required ~ 100V. Copper Loss ~ 120W.

    const getReadings = () => {
        if (!powerOn) return { v: 0, i: 0, w: 0 };

        if (testType === 'OC') {
            // OC is on LV Side (200V max)
            const appliedV = (variacVal / 100) * 230; // Max variac output
            // Current is non-linear (saturation), but linear approx for sim
            // At 200V, I0 is approx 1.2A
            const i0 = (appliedV / 200) * 1.2;
            // Wattmeter ~ V^2 (Iron loss)
            const w0 = Math.pow((appliedV / 200), 2) * 60;
            return { v: appliedV, i: i0, w: w0 };
        } else {
            // SC is on HV Side (Rated I = 5A)
            // Voltage required to drive 5A is approx 100V (5% of 2000V)
            const appliedV = (variacVal / 100) * 230; // Variac output to HV
            // Impedance is constant. Z = 100V / 5A = 20 Ohms
            const z_eq = 20;
            const isc = appliedV / z_eq;
            // Copper loss = I^2 * R_eq. Let R_eq = 5 Ohms.
            const wsc = Math.pow(isc, 2) * 5;
            return { v: appliedV, i: isc, w: wsc };
        }
    };

    const readings = getReadings();
    const isOverload = testType === 'SC' && readings.i > I_RATED_HV * 1.2;

    // Effects for safety
    useEffect(() => {
        if (testType === 'SC' && readings.i > I_RATED_HV * 1.5) {
            // Trip mechanism
            alert("⚠️ CIRCUIT TRIP! Current exceeded 150% rating during SC Test.");
            setPowerOn(false);
            setVariacVal(0);
        }
    }, [readings.i, testType]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-slate-50 rounded-xl shadow-xl font-sans text-slate-800">

            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                        <Settings className="w-6 h-6" /> Transformer Lab
                    </h1>
                    <p className="text-sm text-slate-500">Experiment 4: OC & SC Tests</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => { setPowerOn(false); setVariacVal(0); setTestType('OC'); }}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${testType === 'OC' ? 'bg-blue-600 text-white' : 'bg-white border text-slate-600'}`}
                    >
                        OC Test (LV)
                    </button>
                    <button
                        onClick={() => { setPowerOn(false); setVariacVal(0); setTestType('SC'); }}
                        className={`px-4 py-2 rounded-lg font-bold transition-all ${testType === 'SC' ? 'bg-red-600 text-white' : 'bg-white border text-slate-600'}`}
                    >
                        SC Test (HV)
                    </button>
                </div>
            </div>

            {/* Lab Bench */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                {/* Left: Controls */}
                <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-inner flex flex-col items-center">
                    <div className="w-full flex justify-between mb-4">
                        <span className="text-xs font-bold text-slate-400 tracking-widest">VARIAC CONTROL</span>
                        <div className={`w-3 h-3 rounded-full ${powerOn ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    </div>

                    {/* Variac Knob Visual */}
                    <div className="relative w-40 h-40 mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
                        <div
                            className="absolute w-full h-full rounded-full border-4 border-transparent border-t-indigo-500 transition-transform duration-75"
                            style={{ transform: `rotate(${-135 + (variacVal / 100) * 270}deg)` }}
                        ></div>
                        <input
                            type="range" min="0" max="100" value={variacVal}
                            onChange={(e) => setVariacVal(Number(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-grab"
                            disabled={!powerOn}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-slate-700">{variacVal}%</span>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            if (variacVal > 0 && !powerOn) {
                                alert("⚠️ Safety: Set Variac to 0 before switching ON!");
                            } else {
                                setPowerOn(!powerOn);
                            }
                        }}
                        className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-lg ${powerOn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                    >
                        {powerOn ? 'SWITCH OFF' : 'SWITCH ON'}
                    </button>
                </div>

                {/* Right: Meters */}
                <div className="flex flex-col gap-4">
                    {/* Voltmeter */}
                    <div className="bg-slate-800 p-4 rounded-lg border-2 border-slate-600 shadow-lg relative">
                        <span className="text-[10px] text-slate-400 font-bold absolute top-2 left-3">VOLTMETER (V)</span>
                        <div className="text-right font-mono text-3xl text-yellow-400">{readings.v.toFixed(1)} V</div>
                    </div>

                    {/* Ammeter */}
                    <div className={`bg-slate-800 p-4 rounded-lg border-2 shadow-lg relative transition-colors ${isOverload ? 'border-red-500 animate-pulse' : 'border-slate-600'}`}>
                        <span className="text-[10px] text-slate-400 font-bold absolute top-2 left-3">AMMETER (A)</span>
                        <div className={`text-right font-mono text-3xl ${isOverload ? 'text-red-500' : 'text-cyan-400'}`}>
                            {readings.i.toFixed(2)} A
                        </div>
                        {testType === 'SC' && <div className="text-[10px] text-slate-500 text-right mt-1">Rated: 5.00 A</div>}
                    </div>

                    {/* Wattmeter */}
                    <div className="bg-slate-800 p-4 rounded-lg border-2 border-slate-600 shadow-lg relative">
                        <span className="text-[10px] text-slate-400 font-bold absolute top-2 left-3">WATTMETER (W)</span>
                        <div className="text-right font-mono text-3xl text-green-400">{readings.w.toFixed(1)} W</div>
                    </div>
                </div>

            </div>

            {/* Schematic Visualization */}
            <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 text-center">
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-2">
                    Current Setup: {testType === 'OC' ? 'OPEN CIRCUIT (LV Side)' : 'SHORT CIRCUIT (HV Side)'}
                </h3>
                <div className="flex items-center justify-center gap-4 opacity-80">
                    <div className="w-16 h-20 border-2 border-black bg-white flex items-center justify-center text-xs font-bold">VARIAC</div>
                    <div className="h-0.5 w-8 bg-black"></div>
                    <div className="w-16 h-20 border-2 border-black bg-white flex flex-col items-center justify-center text-xs">
                        <span>METERS</span>
                        <span className="text-[8px]">(V, A, W)</span>
                    </div>
                    <div className="h-0.5 w-8 bg-black"></div>
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-16 border-2 border-indigo-600 bg-indigo-50 rounded flex items-center justify-center font-bold text-indigo-800">
                            {testType === 'OC' ? 'LV' : 'HV'}
                        </div>
                        <span className="text-[8px] mt-1">Primary</span>
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                        <div className="w-0.5 h-16 bg-slate-400"></div>
                        <div className="w-0.5 h-16 bg-slate-400"></div>
                    </div>
                    <div className="flex flex-col items-center relative">
                        <div className="w-12 h-16 border-2 border-slate-400 bg-white rounded flex items-center justify-center font-bold text-slate-400">
                            {testType === 'OC' ? 'HV' : 'LV'}
                        </div>
                        <span className="text-[8px] mt-1">Secondary</span>
                        {/* Short Link Visual */}
                        {testType === 'SC' && (
                            <div className="absolute -right-4 top-4 w-4 h-8 border-r-4 border-t-4 border-b-4 border-red-500 rounded-r-md"></div>
                        )}
                        {testType === 'OC' && (
                            <span className="absolute -right-8 top-6 text-red-500 text-xs font-bold">OPEN</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Instruction */}
            <div className="mt-4 p-4 bg-blue-50 text-blue-800 text-sm rounded-lg flex gap-3">
                <Info className="w-5 h-5 flex-shrink-0" />
                <div>
                    <strong>Task:</strong>
                    {testType === 'OC' ? (
                        <ul className="list-disc pl-4 mt-1">
                            <li>Increase Variac to <strong>Rated Voltage (200V)</strong>.</li>
                            <li>Note readings. Wattmeter = <strong>Core Loss</strong>.</li>
                        </ul>
                    ) : (
                        <ul className="list-disc pl-4 mt-1">
                            <li>Increase Variac SLOWLY until Ammeter shows <strong>Rated Current (5.00 A)</strong>.</li>
                            <li><strong>STOP</strong> there. Do not go to 230V!</li>
                            <li>Note readings. Wattmeter = <strong>Copper Loss</strong>.</li>
                        </ul>
                    )}
                </div>
            </div>

        </div>
    );
};

export default TransformerLabSimulator;
