import React, { useState } from 'react';
import { Cpu, Power, Lightbulb, ToggleLeft, ToggleRight } from 'lucide-react';

const BasicGatesSimulator = () => {
  const [gateType, setGateType] = useState('AND'); // AND, OR, NOT
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const getOutput = () => {
    switch (gateType) {
      case 'AND': return inputA && inputB;
      case 'OR': return inputA || inputB;
      case 'NOT': return !inputA;
      default: return false;
    }
  };

  const output = getOutput();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-50 rounded-xl shadow-xl font-sans text-slate-800">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <Cpu className="w-6 h-6" /> Basic Gates Lab
          </h1>
          <p className="text-sm text-slate-500">Experiment 8: AND, OR, NOT Verification</p>
        </div>
        
        <div className="flex gap-2">
          {['AND', 'OR', 'NOT'].map(type => (
            <button
              key={type}
              onClick={() => setGateType(type)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${gateType === type ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-600'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Circuit Area */}
      <div className="bg-white p-8 rounded-xl border border-slate-300 shadow-inner flex flex-col items-center gap-8">
        
        <div className="flex items-center gap-8">
          {/* Inputs */}
          <div className="flex flex-col gap-4">
            {/* Input A */}
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-600 w-6">A</span>
              <button 
                onClick={() => setInputA(!inputA)}
                className={`w-16 h-8 rounded-full p-1 transition-colors flex items-center ${inputA ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}`}
              >
                <div className="w-6 h-6 bg-white rounded-full shadow-sm mx-1"></div>
              </button>
              <span className="font-mono text-xs">{inputA ? '1' : '0'}</span>
            </div>

            {/* Input B (Hidden for NOT) */}
            {gateType !== 'NOT' && (
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-600 w-6">B</span>
                <button 
                  onClick={() => setInputB(!inputB)}
                  className={`w-16 h-8 rounded-full p-1 transition-colors flex items-center ${inputB ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}`}
                >
                  <div className="w-6 h-6 bg-white rounded-full shadow-sm mx-1"></div>
                </button>
                <span className="font-mono text-xs">{inputB ? '1' : '0'}</span>
              </div>
            )}
          </div>

          {/* Gate Visual */}
          <div className="w-32 h-24 bg-slate-100 border-2 border-slate-400 rounded flex items-center justify-center relative">
            <div className="absolute -left-4 top-6 w-4 h-1 bg-black"></div>
            {gateType !== 'NOT' && <div className="absolute -left-4 top-16 w-4 h-1 bg-black"></div>}
            <div className="absolute -right-4 top-11 w-4 h-1 bg-black"></div>
            
            <div className="font-bold text-xl text-slate-700">{gateType}</div>
            {gateType === 'AND' && <div className="text-[10px] text-slate-400 absolute bottom-1">IC 7408</div>}
            {gateType === 'OR' && <div className="text-[10px] text-slate-400 absolute bottom-1">IC 7432</div>}
            {gateType === 'NOT' && <div className="text-[10px] text-slate-400 absolute bottom-1">IC 7404</div>}
          </div>

          {/* Output */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-200 ${output ? 'bg-red-500 border-red-600 shadow-[0_0_20px_rgba(239,68,68,0.6)]' : 'bg-slate-200 border-slate-300'}`}>
              <Lightbulb className={`w-8 h-8 ${output ? 'text-white' : 'text-slate-400'}`} />
            </div>
            <span className="font-mono font-bold text-slate-700">Y = {output ? '1' : '0'}</span>
          </div>
        </div>

        {/* Truth Table Reference */}
        <div className="w-full max-w-xs bg-slate-50 p-4 rounded border border-slate-200">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 text-center">Expected Truth Table</h4>
          <div className="grid grid-cols-3 text-center text-sm gap-y-1">
            <div className="font-bold border-b">A</div>
            {gateType !== 'NOT' && <div className="font-bold border-b">B</div>}
            <div className="font-bold border-b">Y</div>

            {/* Row 1 */}
            <div>0</div>
            {gateType !== 'NOT' && <div>0</div>}
            <div>{gateType === 'AND' || gateType === 'OR' ? '0' : '1'}</div>

            {/* Row 2 */}
            {gateType !== 'NOT' ? (
              <>
                <div>0</div>
                <div>1</div>
                <div>{gateType === 'OR' ? '1' : '0'}</div>
                
                <div>1</div>
                <div>0</div>
                <div>{gateType === 'OR' ? '1' : '0'}</div>

                <div>1</div>
                <div>1</div>
                <div>1</div>
              </>
            ) : (
              <>
                <div>1</div>
                <div>0</div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BasicGatesSimulator;