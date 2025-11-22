import React, { useState, useEffect } from 'react';
import { Zap, RotateCcw, Activity, Info, AlertTriangle, CheckCircle } from 'lucide-react';

// --- Circuit Configuration ---
const R1_VAL = 1000; // 1k Ohm
const R2_VAL = 2200; // 2.2k Ohm
const R3_VAL = 4700; // 4.7k Ohm
const V_SOURCE = 10; // 10 Volts

// --- Sub-component: Probe Point ---
// Moved outside for better performance and clarity.
const ProbePoint = ({ id, x, y, label, activeRed, activeBlack, onClick }) => (
    <div
        className={`absolute w-6 h-6 rounded-full border-2 bg-slate-100 hover:bg-yellow-200 cursor-pointer flex items-center justify-center z-20 transition-transform hover:scale-125
      ${activeRed ? 'ring-4 ring-red-500 bg-red-100 border-red-500' : ''}
      ${activeBlack ? 'ring-4 ring-slate-800 bg-slate-800 border-slate-800' : 'border-slate-400'}
    `}
        style={{ left: x, top: y }}
        onClick={(e) => {
            e.stopPropagation();
            onClick(id);
        }}
        title={`Test Point ${label || id}`}
    >
        {/* Center Dot */}
        <div className={`w-1 h-1 rounded-full ${activeBlack ? 'bg-white' : 'bg-slate-500'}`}></div>

        {/* Floating Labels for Active Probes */}
        {activeRed && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded shadow-md whitespace-nowrap z-30">
                RED (+)
            </span>
        )}
        {activeBlack && (
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded shadow-md whitespace-nowrap z-30">
                BLACK (-)
            </span>
        )}
    </div>
);

const KCLKVLSimulator = () => {
    const [powerOn, setPowerOn] = useState(false);
    const [probes, setProbes] = useState({ red: null, black: null });
    const [multimeterMode, setMultimeterMode] = useState('OFF'); // OFF, V, A
    const [measurements, setMeasurements] = useState({ value: 0, unit: '' });
    const [fault, setFault] = useState(null); // 'OPEN_R2', 'SHORT_R3', null

    // Circuit State (Calculated)
    const [circuitState, setCircuitState] = useState({
        I_total: 0, I_R1: 0, I_R2: 0, I_R3: 0,
        V_R1: 0, V_R2: 0, V_R3: 0,
        V_Nodes: { A: 0, B: 0, C: 0, G: 0 }
    });

    // --- Physics Engine ---
    useEffect(() => {
        if (!powerOn) {
            setCircuitState({
                I_total: 0, I_R1: 0, I_R2: 0, I_R3: 0,
                V_R1: 0, V_R2: 0, V_R3: 0,
                V_Nodes: { A: 0, B: 0, C: 0, G: 0 }
            });
            return;
        }

        const r1 = R1_VAL;
        let r2 = R2_VAL;
        let r3 = R3_VAL;

        if (fault === 'OPEN_R2') r2 = Infinity;
        if (fault === 'SHORT_R3') r3 = 0.1;

        // Calculation Logic
        const g2 = r2 === Infinity ? 0 : 1 / r2;
        const g3 = r3 === Infinity ? 0 : 1 / r3;
        const r_parallel = (g2 + g3) === 0 ? Infinity : 1 / (g2 + g3);
        const r_total = r1 + r_parallel;
        const i_total = V_SOURCE / r_total;
        const v_node_b = r_parallel === 0 ? 0 : i_total * r_parallel;
        const i_r2 = r2 === Infinity ? 0 : v_node_b / r2;
        const i_r3 = r3 === Infinity ? 0 : v_node_b / r3;

        setCircuitState({
            I_total: i_total,
            I_R1: i_total,
            I_R2: i_r2,
            I_R3: i_r3,
            V_R1: V_SOURCE - v_node_b,
            V_R2: v_node_b,
            V_R3: v_node_b,
            V_Nodes: { A: V_SOURCE, B: v_node_b, C: 0, G: 0 }
        });
    }, [powerOn, fault]);

    // --- Multimeter Logic ---
    useEffect(() => {
        if (multimeterMode === 'OFF') {
            setMeasurements({ value: '', unit: '' });
            return;
        }

        if (!probes.red || !probes.black) {
            setMeasurements({ value: '---', unit: '' });
            return;
        }

        const redLoc = probes.red;
        const blackLoc = probes.black;

        if (multimeterMode === 'V') {
            const v1 = circuitState.V_Nodes[redLoc] || 0;
            const v2 = circuitState.V_Nodes[blackLoc] || 0;
            const diff = v1 - v2;
            setMeasurements({ value: diff.toFixed(2), unit: 'V' });
        } else if (multimeterMode === 'A') {
            let measuredI = 0;
            if ((redLoc === 'A' && blackLoc === 'R1_IN') || (redLoc === 'R1_IN' && blackLoc === 'A')) measuredI = circuitState.I_total;
            else if ((redLoc === 'B' && blackLoc === 'R2_IN') || (redLoc === 'R2_IN' && blackLoc === 'B')) measuredI = circuitState.I_R2;
            else if ((redLoc === 'B' && blackLoc === 'R3_IN') || (redLoc === 'R3_IN' && blackLoc === 'B')) measuredI = circuitState.I_R3;
            else measuredI = 0;
            setMeasurements({ value: (measuredI * 1000).toFixed(2), unit: 'mA' });
        }
    }, [multimeterMode, probes, circuitState]);

    // --- Probe Click Logic ---
    const handleProbeClick = (id) => {
        // 1. Toggle off if clicking same probe
        if (probes.red === id) {
            setProbes(prev => ({ ...prev, red: null }));
            return;
        }
        if (probes.black === id) {
            setProbes(prev => ({ ...prev, black: null }));
            return;
        }

        // 2. Place Red first, then Black
        if (!probes.red) {
            setProbes(prev => ({ ...prev, red: id }));
        } else if (!probes.black) {
            setProbes(prev => ({ ...prev, black: id }));
        } else {
            // 3. If both placed, cycle: Move Red to new spot, remove Black
            setProbes({ red: id, black: null });
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-slate-50 rounded-xl shadow-xl min-h-screen font-sans text-slate-800">

            {/* --- Header --- */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                        <Activity className="w-6 h-6" /> KCL & KVL Lab Simulator
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Interactive Circuit for Experiment 1</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button
                        onClick={() => setPowerOn(!powerOn)}
                        className={`px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-all ${powerOn ? 'bg-green-500 text-white shadow-green-300/50 shadow-lg' : 'bg-slate-300 text-slate-600'}`}
                    >
                        <Zap className="w-4 h-4" /> {powerOn ? 'Power ON' : 'Power OFF'}
                    </button>
                    <button
                        onClick={() => { setProbes({ red: null, black: null }); setFault(null); }}
                        className="px-4 py-2 bg-white border border-slate-300 rounded-full hover:bg-slate-100 text-slate-600 flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" /> Reset
                    </button>
                </div>
            </div>

            {/* --- Main Workspace --- */}
            <div className="flex flex-col w-full gap-6">

                {/* --- Top: Circuit Board (Larger) --- */}
                <div className="w-full bg-white rounded-xl border border-slate-200 shadow-inner relative min-h-[600px] select-none overflow-x-auto overflow-y-hidden group">
                    <div className="relative min-w-[900px] w-full h-[600px]">
                        <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 tracking-widest">BREADBOARD VIEW</div>

                        {/* Instructions Overlay (visible when probes missing) */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm border transition-colors ${!probes.red ? 'bg-red-100 text-red-700 border-red-200 animate-pulse' :
                                !probes.black ? 'bg-slate-200 text-slate-700 border-slate-300 animate-pulse' :
                                    'bg-green-100 text-green-700 border-green-200'
                                }`}>
                                {!probes.red ? '👉 Click point to place RED probe' :
                                    !probes.black ? '👉 Click point to place BLACK probe' :
                                        '✓ Probes Connected'}
                            </span>
                        </div>

                        {/* Wires (SVG) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80">
                            <path d="M 100 300 L 100 150 L 300 150" stroke="#334155" strokeWidth="4" fill="none" />
                            <path d="M 400 150 L 600 150" stroke="#334155" strokeWidth="4" fill="none" />
                            <path d="M 600 150 L 600 250" stroke="#334155" strokeWidth="4" fill="none" />
                            <path d="M 600 350 L 600 450 L 100 450 L 100 350" stroke="#334155" strokeWidth="4" fill="none" />
                            <path d="M 600 150 L 800 150 L 800 250" stroke="#334155" strokeWidth="4" fill="none" />
                            <path d="M 800 350 L 800 450 L 600 450" stroke="#334155" strokeWidth="4" fill="none" />
                        </svg>

                        {/* Components */}
                        <div className="absolute left-[70px] top-[300px] w-[60px] h-[60px] bg-slate-800 rounded flex flex-col items-center justify-center text-white z-20 shadow-lg">
                            <div className="text-[10px] text-slate-400">SOURCE</div>
                            <div className="font-bold text-yellow-400 text-lg">10V</div>
                        </div>

                        {/* R1 */}
                        <div className="absolute left-[300px] top-[135px] w-[100px] h-[30px] bg-amber-100 border-2 border-amber-700 rounded flex items-center justify-center z-20 shadow-sm transform">
                            <div className="w-full h-1 bg-slate-400 absolute"></div>
                            <div className="relative w-[80%] h-[20px] bg-amber-200 rounded-full border border-amber-800 flex justify-evenly items-center">
                                <div className="w-1 h-full bg-yellow-900"></div>
                                <div className="w-1 h-full bg-black"></div>
                                <div className="w-1 h-full bg-red-600"></div>
                                <div className="w-1 h-full bg-yellow-500"></div>
                            </div>
                            <span className="absolute -top-6 text-xs font-bold text-slate-600">R1 (1kΩ)</span>
                        </div>

                        {/* R2 */}
                        <div className="absolute left-[585px] top-[250px] w-[30px] h-[100px] bg-amber-100 border-2 border-amber-700 rounded flex flex-col items-center justify-center z-20 shadow-sm">
                            <div className="h-full w-1 bg-slate-400 absolute"></div>
                            <div className="relative h-[80%] w-[20px] bg-amber-200 rounded-full border border-amber-800 flex flex-col justify-evenly items-center">
                                <div className="h-1 w-full bg-red-600"></div>
                                <div className="h-1 w-full bg-red-600"></div>
                                <div className="h-1 w-full bg-red-600"></div>
                                <div className="h-1 w-full bg-yellow-500"></div>
                            </div>
                            <span className="absolute top-1/2 -right-20 text-xs font-bold text-slate-600">R2 (2.2kΩ)</span>
                        </div>

                        {/* R3 */}
                        <div className="absolute left-[785px] top-[250px] w-[30px] h-[100px] bg-amber-100 border-2 border-amber-700 rounded flex flex-col items-center justify-center z-20 shadow-sm">
                            <div className="h-full w-1 bg-slate-400 absolute"></div>
                            <div className="relative h-[80%] w-[20px] bg-amber-200 rounded-full border border-amber-800 flex flex-col justify-evenly items-center">
                                <div className="h-1 w-full bg-yellow-400"></div>
                                <div className="h-1 w-full bg-purple-600"></div>
                                <div className="h-1 w-full bg-red-600"></div>
                                <div className="h-1 w-full bg-yellow-500"></div>
                            </div>
                            <span className="absolute top-1/2 -right-20 text-xs font-bold text-slate-600">R3 (4.7kΩ)</span>
                        </div>

                        {/* --- Test Points (Probes) --- */}
                        <ProbePoint id="A" x={100} y={150} label="A (Src+)" activeRed={probes.red === 'A'} activeBlack={probes.black === 'A'} onClick={handleProbeClick} />
                        <ProbePoint id="B" x={600} y={150} label="B (Junc)" activeRed={probes.red === 'B'} activeBlack={probes.black === 'B'} onClick={handleProbeClick} />
                        <ProbePoint id="G" x={100} y={450} label="G (GND)" activeRed={probes.red === 'G'} activeBlack={probes.black === 'G'} onClick={handleProbeClick} />

                        {/* Current Measurement Points */}
                        <ProbePoint id="R1_IN" x={250} y={150} label="I_Total" activeRed={probes.red === 'R1_IN'} activeBlack={probes.black === 'R1_IN'} onClick={handleProbeClick} />
                        <ProbePoint id="R2_IN" x={600} y={200} label="I_R2" activeRed={probes.red === 'R2_IN'} activeBlack={probes.black === 'R2_IN'} onClick={handleProbeClick} />
                        <ProbePoint id="R3_IN" x={800} y={200} label="I_R3" activeRed={probes.red === 'R3_IN'} activeBlack={probes.black === 'R3_IN'} onClick={handleProbeClick} />

                        {/* Fault Indicators */}
                        {fault === 'OPEN_R2' && (
                            <div className="absolute left-[570px] top-[280px] text-red-600 font-bold text-xl z-30 animate-pulse bg-white px-2 rounded shadow-md">❌ OPEN</div>
                        )}
                        {fault === 'SHORT_R3' && (
                            <div className="absolute left-[770px] top-[280px] w-1 h-[100px] bg-blue-500 z-30 shadow-[0_0_15px_blue]"></div>
                        )}
                    </div>
                </div>

                {/* --- Bottom: Controls Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Multimeter Panel */}
                    <div className="bg-slate-800 rounded-2xl p-6 shadow-xl text-slate-200 relative overflow-hidden border-4 border-slate-700">
                        <div className="absolute top-0 left-0 w-full h-6 bg-slate-700 border-b border-slate-600 text-center text-[10px] font-bold tracking-wider text-slate-400 pt-1">DIGITAL MULTIMETER</div>

                        <div className="bg-[#9ea792] text-slate-900 font-mono text-3xl p-4 rounded mb-6 shadow-inner text-right border-2 border-slate-600 relative h-20 flex items-center justify-end">
                            {measurements.value === '' ? (
                                <span className="opacity-20">8.8.8.8</span>
                            ) : (
                                <span>{measurements.value} <span className="text-sm font-bold">{measurements.unit}</span></span>
                            )}

                        </div>

                        <div className="flex justify-center mb-4">
                            <div className="relative w-24 h-24 rounded-full bg-slate-700 border-4 border-slate-600 shadow-xl flex items-center justify-center">
                                <div
                                    className="w-2 h-10 bg-white rounded-full absolute top-2 origin-bottom transition-transform duration-300"
                                    style={{ transform: multimeterMode === 'OFF' ? 'rotate(-45deg)' : multimeterMode === 'V' ? 'rotate(0deg)' : 'rotate(45deg)' }}
                                ></div>
                                <div className="w-4 h-4 bg-slate-900 rounded-full z-10"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
                            <button onClick={() => setMultimeterMode('OFF')} className={`p-2 rounded ${multimeterMode === 'OFF' ? 'bg-red-500 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>OFF</button>
                            <button onClick={() => setMultimeterMode('V')} className={`p-2 rounded ${multimeterMode === 'V' ? 'bg-blue-500 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>V (Volts)</button>
                            <button onClick={() => setMultimeterMode('A')} className={`p-2 rounded ${multimeterMode === 'A' ? 'bg-yellow-500 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>A (Amps)</button>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-700 text-xs">
                            <div className="flex justify-between items-center mb-1">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> Red Probe:</span>
                                <span className="font-mono text-yellow-400">{probes.red || 'Unconnected'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-400"></div> Black Probe:</span>
                                <span className="font-mono text-yellow-400">{probes.black || 'Unconnected'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Fault Injection */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Viva Fault Simulation
                        </h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => setFault(fault === 'OPEN_R2' ? null : 'OPEN_R2')}
                                className={`w-full p-2 text-sm rounded border flex justify-between items-center transition-colors ${fault === 'OPEN_R2' ? 'bg-red-50 border-red-300 text-red-700' : 'hover:bg-slate-50'}`}
                            >
                                <span>Break R2 Connection (Open)</span>
                                {fault === 'OPEN_R2' && <CheckCircle className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => setFault(fault === 'SHORT_R3' ? null : 'SHORT_R3')}
                                className={`w-full p-2 text-sm rounded border flex justify-between items-center transition-colors ${fault === 'SHORT_R3' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'hover:bg-slate-50'}`}
                            >
                                <span>Short Circuit R3</span>
                                {fault === 'SHORT_R3' && <CheckCircle className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Verification */}
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200 shadow-sm">
                        <h3 className="text-sm font-bold text-green-700 uppercase mb-2">KCL Verification</h3>
                        <div className="text-xs text-green-800 space-y-1 font-mono">
                            <p>I_Total = {circuitState.I_total.toFixed(4)} A</p>
                            <p>I_R2 + I_R3 = {(circuitState.I_R2 + circuitState.I_R3).toFixed(4)} A</p>
                            <div className="h-px bg-green-300 my-1"></div>
                            <p className="font-bold">{Math.abs(circuitState.I_total - (circuitState.I_R2 + circuitState.I_R3)) < 0.0001 ? 'VERIFIED (ΣI = 0)' : 'MISMATCH'}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="w-full mt-6 p-4 bg-white rounded-lg border border-slate-200 text-sm text-slate-600 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                    <h4 className="font-bold mb-2 flex items-center gap-1"><Info className="w-4 h-4" /> How to use:</h4>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                        <li>Click <strong>Power ON</strong> to start the circuit.</li>
                        <li>Select <strong>V</strong> (Voltage) or <strong>A</strong> (Current) on the Multimeter.</li>
                        <li>Click on the <strong>Test Points (Circles)</strong> on the breadboard.</li>
                        <li><strong>First Click:</strong> Places the <span className="text-red-600 font-bold">RED (+)</span> probe.</li>
                        <li><strong>Second Click:</strong> Places the <span className="text-slate-800 font-bold">BLACK (-)</span> probe.</li>
                        <li>Clicking an active probe removes it.</li>
                    </ul>
                </div>
                <div className="flex-1">
                    <h4 className="font-bold mb-2 text-blue-600">Viva Tips:</h4>
                    <p className="mb-1">Try applying a fault (e.g., Open R2). Measure the voltage across the open resistor. You will see it equals the source voltage! This is a classic KVL viva question.</p>
                </div>
            </div>

        </div>
    );
};

export default KCLKVLSimulator;
