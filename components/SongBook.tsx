import React, { useState } from 'react';
import { INITIAL_SONGS } from '../constants';
import { Song } from '../types';
import { ChevronRight, Music2 } from 'lucide-react';

const SongBook: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  if (selectedSong) {
    return (
      <div className="w-full max-w-2xl bg-white border-4 border-black rounded-3xl p-6 shadow-cartoon relative">
        <button 
          onClick={() => setSelectedSong(null)}
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 font-bold py-1 px-3 rounded-full border-2 border-black text-sm"
        >
          ← Voltar
        </button>
        
        <div className="text-center mt-8 mb-6">
          <h2 className="text-3xl font-bold text-dark">{selectedSong.title}</h2>
          <p className="text-gray-500 font-bold">{selectedSong.artist}</p>
          <div className="flex justify-center gap-2 mt-2">
             {selectedSong.requiredChords.map(c => (
               <span key={c} className="bg-accent text-white px-2 py-1 rounded border-2 border-black text-xs font-bold">
                 {c}
               </span>
             ))}
          </div>
        </div>

        <div className="space-y-6 text-left">
          {selectedSong.content.map((line, idx) => (
            <div key={idx} className="relative pt-6 pb-2 border-b-2 border-dashed border-gray-200">
               {/* Lyrics Line */}
              <p className="text-xl font-medium tracking-wide leading-relaxed text-dark font-sans">
                {line.lyrics.split('').map((char, charIdx) => {
                   // Check if there is a chord at this position
                   const chord = line.chords.find(c => c.position === charIdx);
                   return (
                     <span key={charIdx} className="relative">
                       {chord && (
                         <span className="absolute -top-6 left-0 text-danger font-bold text-lg">
                           {chord.name}
                         </span>
                       )}
                       {char}
                     </span>
                   )
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl space-y-4">
      <h2 className="text-3xl font-bold text-dark mb-6 text-center">Livro de Músicas</h2>
      <div className="grid gap-4">
        {INITIAL_SONGS.map(song => (
          <button
            key={song.id}
            onClick={() => setSelectedSong(song)}
            className="flex items-center justify-between w-full bg-white p-4 rounded-2xl border-4 border-black shadow-cartoon hover:shadow-cartoon-active hover:translate-x-[2px] hover:translate-y-[2px] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-secondary p-3 rounded-full border-2 border-black text-white">
                <Music2 size={24} />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-dark group-hover:text-secondary transition-colors">{song.title}</h3>
                <p className="text-gray-500 font-semibold text-sm">{song.artist}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded border border-yellow-300">
                {song.difficulty}
              </span>
              <ChevronRight size={24} className="text-gray-400" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SongBook;