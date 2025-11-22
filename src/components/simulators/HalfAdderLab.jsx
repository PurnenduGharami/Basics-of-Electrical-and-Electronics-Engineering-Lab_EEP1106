import React, { useState } from 'react';
import { Maximize2, Power, Zap, CheckCircle } from 'lucide-react';

const HalfAdderLab = () => {
    const [a, setA] = useState(false);
    const [b, setB] = useState(false);

    const sum = a !== b; // XOR Logic
    const carry = a && b; // AND Logic

    return (
        <div className="max-w-3xl mx-auto p-6 bg-slate-50 rounded-xl shadow-xl font-sans text-slate-800">

            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
                        <Maximize2 className="w-6 h-6" /> Half Adder Lab
                    </h1>
                    <p className="text-sm text-slate-500">Experiment 9: Binary Addition Logic</p>
                </div>
                <div className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">
                    Sum = A ⊕ B | Carry = A • B
                </div>
            </div>

            {/* Main Simulation Area */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                {/* Left: Inputs */}
                <div className="md:col-span-1 flex flex-col justify-center gap-8 border-r border-slate-200 pr-4">

                    {/* Switch A */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="font-bold text-slate-600">Input A</span>
                        <button
                            onClick={() => setA(!a)}
                            className={`w-16 h-24 rounded-lg border-2 flex flex-col items-center justify-between p-2 shadow-md transition-all ${a ? 'bg-green-100 border-green-500' : 'bg-slate-200 border-slate-400'}`}
                        >
                            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                            <Power className={`w-8 h-8 ${a ? 'text-green-600' : 'text-slate-400'}`} />
                            <span className="font-mono font-bold">{a ? '1' : '0'}</span>
                        </button>
                    </div>

                    {/* Switch B */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="font-bold text-slate-600">Input B</span>
                        <button
                            onClick={() => setB(!b)}
                            className={`w-16 h-24 rounded-lg border-2 flex flex-col items-center justify-between p-2 shadow-md transition-all ${b ? 'bg-green-100 border-green-500' : 'bg-slate-200 border-slate-400'}`}
                        >
                            <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                            <Power className={`w-8 h-8 ${b ? 'text-green-600' : 'text-slate-400'}`} />
                            <span className="font-mono font-bold">{b ? '1' : '0'}</span>
                        </button>
                    </div>

                </div>

                {/* Center: Circuit Diagram Visualization */}
                <div className="md:col-span-3 relative bg-white rounded-lg border border-slate-200 shadow-inner h-80 overflow-hidden">
                    <div className="absolute top-2 left-2 text-[10px] text-slate-400 tracking-widest font-bold">LOGIC DIAGRAM</div>

                    {/* Gates */}
                    <div className="absolute top-1/4 left-1/3 transform -translate-y-1/2">
                        {/* XOR GATE Visual */}
                        <div className="w-24 h-20 border-2 border-slate-800 rounded-r-full relative flex items-center justify-center bg-slate-50 z-10">
                            <div className="absolute left-[-6px] h-full w-4 border-r-2 border-slate-800 rounded-r-[50%] bg-white"></div>
                            <span className="font-bold text-xs z-20">XOR (7486)</span>
                        </div>
                    </div>

                    <div className="absolute bottom-1/4 left-1/3 transform translate-y-1/2">
                        {/* AND GATE Visual */}
                        <div className="w-24 h-20 border-2 border-slate-800 rounded-r-full bg-slate-50 flex items-center justify-center z-10">
                            <div className="absolute left-0 h-full w-2 bg-slate-800"></div>
                            <span className="font-bold text-xs z-20 text-white mix-blend-difference">AND (7408)</span>
                        </div>
                    </div>

                    {/* Wiring Logic (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {/* Input A Lines */}
                        <path d="M 0 60 L 100 60" stroke={a ? "#22c55e" : "#cbd5e1"} strokeWidth="4" fill="none" />
                        <path d="M 100 60 L 100 220" stroke={a ? "#22c55e" : "#cbd5e1"} strokeWidth="4" fill="none" />
                        <path d="M 100 60 L 130 60" stroke={a ? "#22c55e" : "#cbd5e1"} strokeWidth="4" fill="none" /> {/* To XOR */}
                        <path d="M 100 220 L 130 220" stroke={a ? "#22c55e" : "#cbd5e1"} strokeWidth="4" fill="none" /> {/* To AND */}

                        {/* Input B Lines */}
                        <path d="M 0 260 L 80 260" stroke={b ? "#22c55e" : "#cbd5e1"} strokeWidth="4" fill="none" />
                        <path d="M 80 260 L 80 100" stroke={b ? "#22c55e" : "#cbd5e1"} strokeWidth="4" fill="none" />
                        <path d="M 80 100 L 130 100" stroke={b ? "#22c55e" : "#cbd5e1"} strokeWidth="4" fill="none" /> {/* To XOR */}
                        <path d="M 80 260 L 130 260" stroke={b ? "#22c55e" : "#cbd5e1"} strokeWidth="4" fill="none" /> {/* To AND */}

                        {/* Output Lines */}
                        <path d="M 230 80 L 400 80" stroke={sum ? "#ef4444" : "#cbd5e1"} strokeWidth="4" fill="none" /> {/* Sum Out */}
                        <path d="M 230 240 L 400 240" stroke={carry ? "#ef4444" : "#cbd5e1"} strokeWidth="4" fill="none" /> {/* Carry Out */}
                    </svg>

                </div>

                {/* Right: Outputs */}
                <div className="md:col-span-1 flex flex-col justify-center gap-8 border-l border-slate-200 pl-4">

                    {/* Output Sum */}
                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${sum ? 'bg-red-500 border-red-600 shadow-[0_0_20px_rgba(239,68,68,0.6)]' : 'bg-slate-200 border-slate-300'}`}>
                            <Zap className={`w-8 h-8 ${sum ? 'text-white fill-white' : 'text-slate-400'}`} />
                        </div>
                        <div className="text-center">
                            <span className="block font-bold text-slate-700">SUM</span>
                            <span className="font-mono text-xs text-slate-500">Pin 3 (7486)</span>
                        </div>
                    </div>

                    {/* Output Carry */}
                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${carry ? 'bg-red-500 border-red-600 shadow-[0_0_20px_rgba(239,68,68,0.6)]' : 'bg-slate-200 border-slate-300'}`}>
                            <Zap className={`w-8 h-8 ${carry ? 'text-white fill-white' : 'text-slate-400'}`} />
                        </div>
                        <div className="text-center">
                            <span className="block font-bold text-slate-700">CARRY</span>
                            <span className="font-mono text-xs text-slate-500">Pin 3 (7408)</span>
                        </div>
                    </div>

                </div>

            </div>

            {/* Truth Table Verification */}
            <div className="mt-8 p-6 bg-slate-100 rounded-xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Truth Table Check
                </h3>
                <div className="grid grid-cols-5 text-center text-sm gap-y-2">
                    <div className="font-bold text-slate-400 border-b pb-1">A</div>
                    <div className="font-bold text-slate-400 border-b pb-1">B</div>
                    <div className="font-bold text-slate-400 border-b pb-1">Sum</div>
                    <div className="font-bold text-slate-400 border-b pb-1">Carry</div>
                    <div className="font-bold text-slate-400 border-b pb-1">Status</div>

                    {/* Rows */}
                    {[
                        { ia: 0, ib: 0, s: 0, c: 0 },
                        { ia: 0, ib: 1, s: 1, c: 0 },
                        { ia: 1, ib: 0, s: 1, c: 0 },
                        { ia: 1, ib: 1, s: 0, c: 1 },
                    ].map((row, i) => {
                        const isActive = (a === !!row.ia) && (b === !!row.ib);
                        return (
                            <React.Fragment key={i}>
                                <div className={isActive ? 'font-bold text-indigo-700' : 'text-slate-400'}>{row.ia}</div>
                                <div className={isActive ? 'font-bold text-indigo-700' : 'text-slate-400'}>{row.ib}</div>
                                <div className={isActive ? 'font-bold text-indigo-700' : 'text-slate-400'}>{row.s}</div>
                                <div className={isActive ? 'font-bold text-indigo-700' : 'text-slate-400'}>{row.c}</div>
                                <div className="flex justify-center">
                                    {isActive && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default HalfAdderLab;
