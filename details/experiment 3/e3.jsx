import React, { useState } from 'react';
import { Cpu, CheckCircle, Zap, RotateCcw, Info, ArrowRight, Settings } from 'lucide-react';

// --- Logic Helper Functions ---
const logicFunctions = {
    AND: (a, b) => a && b,
    OR: (a, b) => a || b,
    NOT: (a) => !a,
    NAND: (a, b) => !(a && b),
    NOR: (a, b) => !(a || b),
    XOR: (a, b) => a !== b,
    XNOR: (a, b) => a === b,
};

// --- Simulation Components ---

const GateSimulator = () => {
    const [gateType, setGateType] = useState('AND');
    const [inputA, setInputA] = useState(false);
    const [inputB, setInputB] = useState(false);

    const output = gateType === 'NOT'
        ? logicFunctions[gateType](inputA)
        : logicFunctions[gateType](inputA, inputB);

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-500" /> Logic Gate Playground
                </h3>
                <select
                    value={gateType}
                    onChange={(e) => setGateType(e.target.value)}
                    className="bg-slate-100 border-none text-slate-700 text-sm rounded-lg focus:ring-blue-500 block p-2 font-bold"
                >
                    {Object.keys(logicFunctions).map(gate => (
                        <option key={gate} value={gate}>{gate} Gate</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8">
                {/* Inputs */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setInputA(!inputA)}
                            className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${inputA ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}`}
                        >
                            <div className="w-6 h-6 bg-white rounded-full shadow-sm mx-1"></div>
                        </button>
                        <span className="font-mono font-bold text-slate-600">Input A: {inputA ? '1' : '0'}</span>
                    </div>

                    {gateType !== 'NOT' && (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setInputB(!inputB)}
                                className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${inputB ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}`}
                            >
                                <div className="w-6 h-6 bg-white rounded-full shadow-sm mx-1"></div>
                            </button>
                            <span className="font-mono font-bold text-slate-600">Input B: {inputB ? '1' : '0'}</span>
                        </div>
                    )}
                </div>

                {/* Visualization */}
                <div className="hidden md:flex items-center text-slate-300">
                    <div className="h-0.5 w-12 bg-current"></div>
                    <div className="border-2 border-current rounded px-3 py-1 text-xs font-bold">{gateType}</div>
                    <div className="h-0.5 w-12 bg-current"></div>
                </div>

                {/* Output */}
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-xl transition-all duration-300 ${output ? 'bg-red-500 border-red-600 shadow-red-500/50' : 'bg-slate-200 border-slate-300'}`}>
                        <Zap className={`w-10 h-10 ${output ? 'text-white fill-white' : 'text-slate-400'}`} />
                    </div>
                    <span className="font-mono font-bold text-slate-600">Output Y: {output ? '1' : '0'}</span>
                </div>
            </div>
        </div>
    );
};

const AdderSubtractorSimulator = ({ mode }) => {
    // Mode: 'half-adder', 'full-adder', 'half-sub', 'full-sub'
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);
    const [c, setC] = useState(false); // Carry/Borrow In

    let out1 = false; // Sum or Diff
    let out2 = false; // Carry or Borrow

    const isFull = mode.includes('full');
    const isSub = mode.includes('sub');

    // Logic Calculation
    if (!isSub) {
        // Adder Logic
        if (!isFull) {
            // Half Adder
            out1 = a !== b; // Sum = A XOR B
            out2 = a && b;  // Carry = A AND B
        } else {
            // Full Adder
            const sum1 = a !== b;
            out1 = sum1 !== c; // Sum = A XOR B XOR Cin
            out2 = (a && b) || (sum1 && c); // Carry = AB + Cin(A XOR B)
        }
    } else {
        // Subtractor Logic
        if (!isFull) {
            // Half Subtractor (A - B)
            out1 = a !== b; // Diff = A XOR B
            out2 = !a && b; // Borrow = (NOT A) AND B
        } else {
            // Full Subtractor (A - B - Bin)
            const diff1 = a !== b;
            out1 = diff1 !== c; // Diff = A XOR B XOR Bin
            out2 = (!a && b) || (!diff1 && c); // Borrow = (!A)B + (!(A XOR B))Bin
        }
    }

    const title = mode.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const out1Label = isSub ? 'Diff (D)' : 'Sum (S)';
    const out2Label = isSub ? 'Borrow (Bo)' : 'Carry (Co)';

    return (
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 my-4">
            <h3 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2 uppercase">
                <Settings className="w-5 h-5 text-indigo-500" /> {title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Inputs */}
                <div className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Inputs</span>

                    {/* Input A */}
                    <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-slate-700">A ({isSub ? 'Minuend' : 'Bit 1'})</span>
                        <button onClick={() => setA(!a)} className={`w-10 h-6 rounded-full p-0.5 transition-colors ${a ? 'bg-blue-500' : 'bg-slate-300'}`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${a ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* Input B */}
                    <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-slate-700">B ({isSub ? 'Subtrahend' : 'Bit 2'})</span>
                        <button onClick={() => setB(!b)} className={`w-10 h-6 rounded-full p-0.5 transition-colors ${b ? 'bg-blue-500' : 'bg-slate-300'}`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${b ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* Input C (Full only) */}
                    {isFull && (
                        <div className="flex justify-between items-center border-t pt-2 mt-1">
                            <span className="font-mono font-bold text-slate-700">{isSub ? 'Bin (Borrow In)' : 'Cin (Carry In)'}</span>
                            <button onClick={() => setC(!c)} className={`w-10 h-6 rounded-full p-0.5 transition-colors ${c ? 'bg-purple-500' : 'bg-slate-300'}`}>
                                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${c ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Logic Diagram Placeholder */}
                <div className="hidden md:flex flex-col items-center justify-center text-slate-300 gap-2">
                    <ArrowRight className="w-8 h-8" />
                    <span className="text-xs font-mono">PROCESSING</span>
                </div>

                {/* Outputs */}
                <div className="flex flex-col gap-3 bg-slate-800 p-4 rounded-lg shadow-inner">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Outputs</span>

                    <div className="flex justify-between items-center text-white">
                        <span className="font-mono font-bold">{out1Label}</span>
                        <div className={`w-4 h-4 rounded-full ${out1 ? 'bg-green-400 shadow-[0_0_10px_#4ade80]' : 'bg-green-900'}`}></div>
                    </div>

                    <div className="flex justify-between items-center text-white">
                        <span className="font-mono font-bold">{out2Label}</span>
                        <div className={`w-4 h-4 rounded-full ${out2 ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-red-900'}`}></div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-700 text-center">
                        <span className="text-xs text-slate-400">Binary Result: </span>
                        <span className="font-mono font-bold text-yellow-400 text-lg">{out2 ? '1' : '0'}{out1 ? '1' : '0'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Container ---

const DigitalLogicSimulator = () => {
    const [activeTab, setActiveTab] = useState('gates'); // gates, adders, subtractors

    return (
        <div className="max-w-5xl mx-auto bg-slate-100 min-h-screen p-6 font-sans text-slate-800">

            {/* Header */}
            <div className="mb-8 pb-4 border-b border-slate-200">
                <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                    <Cpu className="w-8 h-8 text-indigo-600" /> Digital Logic Lab
                </h1>
                <p className="text-slate-500">Interactive Simulation for Unit 3 (Logic Gates & Combinational Circuits)</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
                <button
                    onClick={() => setActiveTab('gates')}
                    className={`px-4 py-2 rounded-full font-bold transition-all ${activeTab === 'gates' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                    Logic Gates
                </button>
                <button
                    onClick={() => setActiveTab('adders')}
                    className={`px-4 py-2 rounded-full font-bold transition-all ${activeTab === 'adders' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                    Adders
                </button>
                <button
                    onClick={() => setActiveTab('subtractors')}
                    className={`px-4 py-2 rounded-full font-bold transition-all ${activeTab === 'subtractors' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                    Subtractors
                </button>
            </div>

            {/* Content Area */}
            <div className="animate-fadeIn">
                {activeTab === 'gates' && (
                    <div>
                        <GateSimulator />
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                                    <Info className="w-4 h-4 text-blue-500" /> Universal Gates
                                </h4>
                                <p className="text-sm text-slate-600">
                                    <strong>NAND</strong> and <strong>NOR</strong> are universal gates. You can build any other logic function (AND, OR, NOT, XOR) using combinations of just NANDs or just NORs.
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
                                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                                    <Info className="w-4 h-4 text-purple-500" /> XOR Gate
                                </h4>
                                <p className="text-sm text-slate-600">
                                    The <strong>XOR</strong> gate outputs High (1) only when the inputs are <em>different</em>. It is the fundamental component for binary addition (Sum bit).
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'adders' && (
                    <div className="space-y-6">
                        <AdderSubtractorSimulator mode="half-adder" />
                        <AdderSubtractorSimulator mode="full-adder" />
                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm text-indigo-800">
                            <strong>Viva Tip:</strong> The <strong>Half Adder</strong> only adds two bits. The <strong>Full Adder</strong> adds three bits (A, B, Cin) and is used to chain multiple adders together for multi-bit addition (e.g., 4-bit Adder).
                        </div>
                    </div>
                )}

                {activeTab === 'subtractors' && (
                    <div className="space-y-6">
                        <AdderSubtractorSimulator mode="half-sub" />
                        <AdderSubtractorSimulator mode="full-sub" />
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-sm text-purple-800">
                            <strong>Note:</strong> In subtraction (A - B), if A &lt; B, the output borrows 1 from the next higher bit. The <strong>Borrow</strong> output indicates this need.
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default DigitalLogicSimulator;