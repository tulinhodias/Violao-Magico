import React from 'react';
import { GUITAR_STRINGS } from '../constants';
import { audioService } from '../services/audioService';
import { Music } from 'lucide-react';

const Tuner: React.FC = () => {
  const playString = (freq: number) => {
    audioService.playTone(freq, 4); // Play longer for tuning reference
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-4 w-full">
      <div className="text-center bg-white p-6 rounded-3xl border-4 border-black shadow-cartoon max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2 text-accent flex items-center justify-center gap-2">
          <Music /> Afinador
        </h2>
        <p className="text-dark mb-6">Toque no botão e afine sua corda igual ao som!</p>

        <div className="grid grid-cols-2 gap-4">
          {GUITAR_STRINGS.map((str, index) => (
            <button
              key={str.name}
              onClick={() => playString(str.freq)}
              className="group relative flex items-center justify-between p-4 bg-primary rounded-2xl border-4 border-black shadow-cartoon-sm hover:shadow-cartoon-active hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              <span className="text-3xl font-black text-white [-webkit-text-stroke:1.5px_black]">
                {str.name}
              </span>
              <span className="text-sm font-bold bg-white px-2 py-1 rounded border-2 border-black">
                Corda {6 - index}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-sky-100 border-2 border-sky-300 p-4 rounded-xl text-center max-w-sm">
        <p className="text-sky-800 text-sm font-semibold">
          💡 Dica: A corda "E" (Mizon) é a mais grossa e fica em cima!
        </p>
      </div>
    </div>
  );
};

export default Tuner;