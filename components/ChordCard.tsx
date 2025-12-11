import React from 'react';
import { ChordData } from '../types';
import { audioService } from '../services/audioService';
import { Play } from 'lucide-react';

interface ChordCardProps {
  chord: ChordData;
}

const ChordCard: React.FC<ChordCardProps> = ({ chord }) => {
  const handlePlay = () => {
    audioService.strumChord(chord.frets);
  };

  // Constants for layout logic
  const X_START = 22;      // Shift grid to right to make space for fret number
  const X_SPACING = 14;    // Slightly narrower strings to fit in view
  const Y_START = 10;
  const Y_SPACING = 25;
  const GRID_WIDTH = X_SPACING * 5; // 70px total width

  const isNut = !chord.barre || chord.barre === 1;

  return (
    <div className="bg-white border-4 border-black rounded-3xl p-4 shadow-cartoon flex flex-col items-center w-full max-w-[200px] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-cartoon-active transition-all duration-150">
      <div className="text-center mb-2">
        <h3 className="text-3xl font-bold text-dark">{chord.name}</h3>
        <p className="text-sm text-gray-500 font-semibold">{chord.suffix || 'Maior'}</p>
      </div>

      {/* SVG Chord Diagram */}
      <div className="relative w-32 h-40 bg-white">
        <svg viewBox="0 0 100 120" className="w-full h-full">
          
          {/* Fret Number Indicator (Outside Grid on the Left) */}
          {!isNut && chord.barre && (
            <text 
              x="10" 
              y={Y_START + Y_SPACING / 2 + 5} 
              fontSize="14" 
              fontWeight="bold" 
              fill="#2D3436" 
              textAnchor="middle"
            >
              {chord.barre}ª
            </text>
          )}

          {/* Top Line (Nut or Fret Wire) */}
          <line 
            x1={X_START} 
            y1={Y_START} 
            x2={X_START + GRID_WIDTH} 
            y2={Y_START} 
            stroke="#2D3436" 
            strokeWidth={isNut ? 4 : 1} 
          />
          
          {/* Strings (Vertical) */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line 
              key={`str-${i}`} 
              x1={X_START + i * X_SPACING} 
              y1={Y_START} 
              x2={X_START + i * X_SPACING} 
              y2={Y_START + 100} 
              stroke="#b2bec3" 
              strokeWidth={i < 3 ? 2 : 1} // Thicker bass strings
            />
          ))}

          {/* Frets (Horizontal) */}
          {[1, 2, 3, 4].map(i => (
            <line 
              key={`fret-${i}`} 
              x1={X_START} 
              y1={Y_START + i * Y_SPACING} 
              x2={X_START + GRID_WIDTH} 
              y2={Y_START + i * Y_SPACING} 
              stroke="#636e72" 
              strokeWidth="2" 
            />
          ))}

          {/* Barre (Pestana) Logic */}
          {chord.barre && (
            (() => {
              const stringsWithBarreFret = chord.frets
                .map((fret, idx) => ({ fret, idx }))
                .filter(item => item.fret === chord.barre);

              if (stringsWithBarreFret.length > 1) {
                const firstStr = stringsWithBarreFret[0].idx;
                const lastStr = stringsWithBarreFret[stringsWithBarreFret.length - 1].idx;
                
                // If barre is at start (1st fret of view), it's at index 1 visually
                const visualFret = (chord.barre > 1) ? 1 : chord.barre;

                return (
                  <rect
                    x={X_START + firstStr * X_SPACING - 6}
                    y={Y_START + visualFret * Y_SPACING - 18}
                    width={(lastStr - firstStr) * X_SPACING + 12}
                    height="12"
                    rx="6"
                    fill="#FF6B6B"
                    stroke="black"
                    strokeWidth="1"
                    opacity="0.9"
                  />
                );
              }
            })()
          )}

          {/* Dots/Fingers */}
          {chord.frets.map((fret, stringIndex) => {
            if (fret <= 0) return null;
            
            let visualFret = fret;
            if (chord.barre && chord.barre > 1) {
               visualFret = fret - (chord.barre - 1);
            }
            
            return (
              <circle
                key={`dot-${stringIndex}`}
                cx={X_START + stringIndex * X_SPACING}
                cy={Y_START + visualFret * Y_SPACING - 12.5}
                r="6"
                fill="#FF6B6B"
                stroke="black"
                strokeWidth="1"
              />
            );
          })}

          {/* X and O symbols at the top */}
          {chord.frets.map((fret, stringIndex) => {
            if (fret !== 0 && fret !== -1) return null;
            const isMute = fret === -1;
            
            // Don't show open string circles if we are in barre mode at higher frets (unless explicitly muted)
            if (chord.barre && chord.barre > 1 && !isMute) return null;

            return (
              <text
                key={`top-${stringIndex}`}
                x={X_START + stringIndex * X_SPACING}
                y={Y_START - 4}
                fontSize="10"
                textAnchor="middle"
                fill={isMute ? "#d63031" : "#2D3436"}
                fontWeight="bold"
              >
                {isMute ? 'x' : 'o'}
              </text>
            );
          })}
        </svg>
      </div>

      <button
        onClick={handlePlay}
        className="mt-4 bg-secondary text-white p-3 rounded-full border-2 border-black shadow-cartoon-sm active:shadow-cartoon-active active:translate-x-[1px] active:translate-y-[1px] transition-all"
        aria-label={`Tocar acorde ${chord.name}`}
      >
        <Play fill="currentColor" size={24} />
      </button>
    </div>
  );
};

export default ChordCard;