import React, { useState, useEffect, useRef } from 'react';
import { Activity, Zap, RefreshCcw, Info } from 'lucide-react';

const RectifierWorkbench = () => {
  const [type, setType] = useState('HALF'); // 'HALF' or 'FULL'
  const [filter, setFilter] = useState(false); // Capacitor Filter On/Off
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [time, setTime] = useState(0);

  // Draw Waveforms
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Constants
    const midY = height / 2;
    const amp = 60;
    const freq = 0.05;
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Grid
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      // Input Wave (AC) - Ghosted
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.3)'; // Slate-600 low opacity
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = midY - Math.sin((x + time) * freq) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Output Wave (DC)
      ctx.strokeStyle = '#fbbf24'; // Amber-400
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      let lastY = midY;

      for (let x = 0; x < width; x++) {
        const rawSin = Math.sin((x + time) * freq);
        let rectifiedY = 0;

        if (type === 'HALF') {
          // Half Wave: Clip negative
          rectifiedY = rawSin > 0 ? rawSin * amp : 0;
        } else {
          // Full Wave: Absolute value
          rectifiedY = Math.abs(rawSin) * amp;
        }

        let finalY = midY - rectifiedY;

        // Capacitor Filter Simulation (Simple decay model)
        if (filter) {
          // If raw signal is dropping, cap discharges slowly
          // If raw signal pushes up, cap follows up
          // In a draw loop like this, we need history. 
          // Simplified visual trick:
          // Ideally, V_cap decays exponentially: V_peak * e^(-t/RC)
          
          // Since we redraw every frame, let's cheat for visuals:
          // The filter effect prevents Y from dropping too fast.
          // We compare 'rectifiedY' with a 'decayed previous Y'.
          // But here we are iterating X. This is spatial.
          
          // Let's calculate the "ideal" filtered wave spatially
          // Peak is at sin(theta) = 1. Decay starts after peak.
          
          const cyclePos = ((x + time) * freq) % (type === 'HALF' ? Math.PI * 2 : Math.PI);
          // Peak is roughly at PI/2 (1.57)
          
          // This logic is complex for a simple loop. Let's use a simpler visual approximation.
          // If filter is ON, we draw a line connecting peaks.
          
          // Let's just draw the rectified wave first for reference
          // Then calculate filter path if needed? No, simpler to just modify finalY logic.
          // Actually, real-time cap sim is hard in stateless draw.
          // Let's stick to basic rectification visual if filter is OFF.
          // If filter is ON, we draw a separate "Filtered" line.
        }

        if (x === 0) ctx.moveTo(x, finalY);
        else ctx.lineTo(x, finalY);
      }
      ctx.stroke();

      // Filter Overlay (if ON)
      if (filter) {
        ctx.strokeStyle = '#22c55e'; // Green-500
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        let capVoltage = 0;
        for (let x = 0; x < width; x++) {
           const rawSin = Math.sin((x + time) * freq);
           let inputV = 0;
           if (type === 'HALF') inputV = rawSin > 0 ? rawSin : 0;
           else inputV = Math.abs(rawSin);
           
           // Charge
           if (inputV >= capVoltage) {
             capVoltage = inputV;
           } else {
             // Discharge (Decay)
             capVoltage -= 0.005; // Decay rate
             if (capVoltage < 0) capVoltage = 0;
           }
           
           const plotY = midY - (capVoltage * amp);
           if (x === 0) ctx.moveTo(x, plotY);
           else ctx.lineTo(x, plotY);
        }
        ctx.stroke();
      }

      setTime(prev => prev + 2);
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationRef.current);
  }, [type, filter]); // Re-bind when state changes? No, refs handle time.

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-50 rounded-xl shadow-xl font-sans text-slate-800">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <Activity className="w-6 h-6" /> Rectifier Workbench
          </h1>
          <p className="text-sm text-slate-500">Experiment 7: HWR & FWR Analysis</p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200">
           <button 
             onClick={() => setType('HALF')}
             className={`px-4 py-2 rounded-md font-bold transition-all ${type === 'HALF' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
           >
             Half-Wave
           </button>
           <button 
             onClick={() => setType('FULL')}
             className={`px-4 py-2 rounded-md font-bold transition-all ${type === 'FULL' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
           >
             Full-Wave
           </button>
        </div>
      </div>

      {/* Oscilloscope Screen */}
      <div className="bg-slate-900 rounded-xl border-4 border-slate-700 shadow-inner mb-6 relative overflow-hidden">
        <div className="absolute top-2 left-4 text-xs font-mono text-green-400 tracking-widest opacity-70">OSCILLOSCOPE VIEW</div>
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={300} 
          className="w-full h-64 md:h-80"
        />
        
        {/* Legend Overlay */}
        <div className="absolute bottom-4 right-4 bg-slate-800/80 p-2 rounded text-xs text-white border border-slate-600">
           <div className="flex items-center gap-2 mb-1">
             <div className="w-4 h-0.5 bg-slate-400 border-dashed border-t border-slate-400"></div> <span>Input AC</span>
           </div>
           <div className="flex items-center gap-2 mb-1">
             <div className="w-4 h-1 bg-amber-400"></div> <span>Rectified DC</span>
           </div>
           {filter && (
             <div className="flex items-center gap-2">
               <div className="w-4 h-1 bg-green-500"></div> <span>Filtered Output</span>
             </div>
           )}
        </div>
      </div>

      {/* Controls & Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
           <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
             <Zap className="w-4 h-4" /> Circuit Controls
           </h3>
           
           <div className="flex items-center justify-between p-4 bg-slate-100 rounded-lg">
             <span className="font-bold text-slate-600">Capacitor Filter</span>
             <button 
               onClick={() => setFilter(!filter)}
               className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center ${filter ? 'bg-green-500 justify-end' : 'bg-slate-300 justify-start'}`}
             >
               <div className="w-6 h-6 bg-white rounded-full shadow-sm mx-1"></div>
             </button>
           </div>

           <div className="mt-6 space-y-2 text-sm text-slate-600">
             <p><strong>Configuration:</strong> {type === 'HALF' ? '1 Diode' : '4 Diodes (Bridge)'}</p>
             <p><strong>Output Freq:</strong> {type === 'HALF' ? '50 Hz' : '100 Hz'}</p>
             <p><strong>Ripple Factor:</strong> {type === 'HALF' ? '1.21 (High)' : '0.48 (Low)'}</p>
           </div>
        </div>

        {/* Theory Snippet */}
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
           <h3 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">
             <Info className="w-4 h-4" /> Key Observations
           </h3>
           <ul className="list-disc list-inside space-y-2 text-sm text-indigo-900">
             {type === 'HALF' ? (
               <>
                 <li>Notice the <strong>gaps</strong> between pulses where the negative cycle is blocked.</li>
                 <li>This results in a very "bumpy" DC voltage.</li>
                 <li>Efficiency is low because half the power is wasted.</li>
               </>
             ) : (
               <>
                 <li>Notice the negative cycle is <strong>flipped up</strong> to positive.</li>
                 <li>No gaps between pulses = smoother output.</li>
                 <li>Higher efficiency and easier to filter.</li>
               </>
             )}
             {filter && (
               <li className="font-bold mt-2 text-green-700">
                 The capacitor (Green line) "fills in" the drops, creating a nearly steady DC line!
               </li>
             )}
           </ul>
        </div>

      </div>
    </div>
  );
};

export default RectifierWorkbench;