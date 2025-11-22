import React, { useState } from 'react';
import { Settings, Disc, RotateCw, Info, Layers, Zap } from 'lucide-react';

const MachinePartsExplorer = () => {
  const [machineType, setMachineType] = useState('DC'); // 'DC' or 'IM'
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-50 rounded-xl shadow-xl font-sans text-slate-800">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <Settings className="w-6 h-6" /> Machine Construction
          </h1>
          <p className="text-sm text-slate-500">Experiment 5: Cut-Section Study</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200">
           <button 
             onClick={() => { setMachineType('DC'); setIsRunning(false); }}
             className={`px-4 py-2 rounded-md font-bold transition-all ${machineType === 'DC' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
           >
             DC Machine
           </button>
           <button 
             onClick={() => { setMachineType('IM'); setIsRunning(false); }}
             className={`px-4 py-2 rounded-md font-bold transition-all ${machineType === 'IM' ? 'bg-green-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
           >
             Induction Machine
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Interactive Diagram */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-300 shadow-inner relative h-[400px] flex items-center justify-center overflow-hidden">
           
           {/* --- DC MACHINE VISUALIZATION --- */}
           {machineType === 'DC' && (
             <div className="relative w-full h-full flex items-center justify-center">
               {/* Stator (Yoke + Poles) */}
               <div className="absolute w-[300px] h-[300px] border-[15px] border-slate-700 rounded-full flex items-center justify-center">
                 {/* Poles */}
                 <div className="absolute top-0 w-16 h-12 bg-slate-600 rounded-b-lg"></div> {/* North */}
                 <div className="absolute bottom-0 w-16 h-12 bg-slate-600 rounded-t-lg"></div> {/* South */}
               </div>
               
               {/* Rotor (Armature) */}
               <div className={`relative w-[180px] h-[180px] bg-amber-200 rounded-full border-4 border-amber-600 flex items-center justify-center ${isRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '2s' }}>
                 {/* Slots/Windings */}
                 <div className="absolute w-full h-1 bg-amber-700"></div>
                 <div className="absolute w-1 h-full bg-amber-700"></div>
                 <div className="absolute w-full h-1 bg-amber-700 rotate-45"></div>
                 <div className="absolute w-1 h-full bg-amber-700 rotate-45"></div>
                 
                 {/* Commutator */}
                 <div className="absolute w-[60px] h-[60px] bg-orange-400 rounded-full border-4 border-orange-600 flex items-center justify-center z-10">
                    <div className="w-full h-[2px] bg-black"></div> {/* Segments */}
                    <div className="h-full w-[2px] bg-black"></div>
                 </div>
               </div>

               {/* Brushes (Stationary) */}
               <div className="absolute w-[10px] h-[20px] bg-black left-[calc(50%-35px)] z-20"></div> {/* Left Brush */}
               <div className="absolute w-[10px] h-[20px] bg-black right-[calc(50%-35px)] z-20"></div> {/* Right Brush */}

               {/* Labels */}
               <div className="absolute top-4 left-4 text-xs font-bold text-slate-500">STATOR (Stationary)</div>
               <div className="absolute top-[160px] left-[160px] text-xs font-bold text-amber-800 z-30 pointer-events-none">ROTOR</div>
             </div>
           )}

           {/* --- INDUCTION MACHINE VISUALIZATION --- */}
           {machineType === 'IM' && (
             <div className="relative w-full h-full flex items-center justify-center">
               {/* Stator */}
               <div className="absolute w-[300px] h-[300px] border-[20px] border-green-800 rounded-full flex items-center justify-center">
                 {/* Stator Windings */}
                 <div className={`absolute w-full h-full border-[4px] border-dashed border-green-400 rounded-full opacity-50 ${isRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '1s' }}></div>
               </div>

               {/* Rotor (Squirrel Cage) */}
               <div className={`relative w-[180px] h-[180px] bg-gray-300 rounded-full border-4 border-gray-500 flex items-center justify-center ${isRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '1.2s' }}>
                 {/* Rotor Bars */}
                 <div className="absolute w-[140px] h-[140px] border-[10px] border-copper-500 rounded-full border-orange-400"></div>
                 <div className="absolute w-2 h-full bg-slate-400"></div>
                 <div className="absolute w-full h-2 bg-slate-400"></div>
               </div>

               {/* Labels */}
               <div className="absolute top-4 left-4 text-xs font-bold text-slate-500">STATOR (RMF Source)</div>
               <div className="absolute top-[160px] left-[160px] text-xs font-bold text-slate-700 z-30 pointer-events-none">CAGE ROTOR</div>
             </div>
           )}

        </div>

        {/* Right: Information Panel */}
        <div className="flex flex-col gap-4">
          
          <div className="bg-slate-100 p-4 rounded-lg border border-slate-200">
            <h3 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Key Parts
            </h3>
            <ul className="text-sm text-slate-600 space-y-2">
              {machineType === 'DC' ? (
                <>
                  <li className="flex items-start gap-2"><span className="font-bold text-slate-800">Commutator:</span> The split orange ring. Converts AC to DC.</li>
                  <li className="flex items-start gap-2"><span className="font-bold text-slate-800">Brushes:</span> Black blocks. Collect current.</li>
                  <li className="flex items-start gap-2"><span className="font-bold text-slate-800">Armature:</span> The rotating center core.</li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2"><span className="font-bold text-slate-800">Stator:</span> Produces Rotating Magnetic Field (RMF).</li>
                  <li className="flex items-start gap-2"><span className="font-bold text-slate-800">Cage Rotor:</span> Shorted bars (no brushes).</li>
                  <li className="flex items-start gap-2"><span className="font-bold text-slate-800">Slip Rings:</span> ABSENT in this cage model.</li>
                </>
              )}
            </ul>
          </div>

          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            <RotateCw className={`w-5 h-5 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'STOP ANIMATION' : 'START ROTATION'}
          </button>

          {isRunning && (
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-xs text-yellow-800 animate-pulse">
              {machineType === 'DC' 
                ? "Observe: The Commutator rotates, brushes stay still."
                : "Observe: The Rotor chases the Stator's magnetic field (Slip)."
              }
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MachinePartsExplorer;