import React, { useState, useMemo } from 'react';
import { AppView } from './types';
import { CHORDS } from './constants';
import ChordCard from './components/ChordCard';
import Tuner from './components/Tuner';
import SongBook from './components/SongBook';
import { Music, Mic2, BookOpen } from 'lucide-react';

// New Filter Types based on user request
type FilterType = 'open-major' | 'open-minor' | 'all-major' | 'all-minor' | 'all';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.CHORDS);
  const [activeFilter, setActiveFilter] = useState<FilterType>('open-major');

  // Logic to filter and sort chords
  const processedChords = useMemo(() => {
    // 1. Filter
    let filtered = CHORDS;
    
    switch (activeFilter) {
      case 'open-major':
        // C, D, E, G, A
        filtered = CHORDS.filter(c => c.category === 'major');
        break;
      case 'open-minor':
        // Dm, Em, Am
        filtered = CHORDS.filter(c => c.category === 'minor');
        break;
      case 'all-major':
        // All majors (Open + Barre)
        filtered = CHORDS.filter(c => c.category === 'major' || c.category === 'major-barre');
        break;
      case 'all-minor':
        // All minors (Open + Barre)
        filtered = CHORDS.filter(c => c.category === 'minor' || c.category === 'minor-barre');
        break;
      case 'all':
      default:
        filtered = CHORDS;
        break;
    }

    // 2. Sort: C -> D -> E -> F -> G -> A -> B
    // If same root (e.g. C and Cm), Major comes first
    const rootOrder = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    
    return filtered.sort((a, b) => {
      const rootA = a.name.charAt(0);
      const rootB = b.name.charAt(0);
      
      const indexA = rootOrder.indexOf(rootA);
      const indexB = rootOrder.indexOf(rootB);

      if (indexA !== indexB) {
        return indexA - indexB;
      }

      // If roots are the same (e.g. C and Cm), prioritize shortest name (Major)
      // C (len 1) vs Cm (len 2)
      return a.name.length - b.name.length;
    });

  }, [activeFilter]);

  const FilterButton = ({ type, label, color }: { type: FilterType, label: string, color: string }) => (
    <button
      onClick={() => setActiveFilter(type)}
      className={`px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all whitespace-nowrap
        ${activeFilter === type 
          ? `${color} text-white border-black shadow-cartoon-sm` 
          : 'bg-white text-gray-500 border-gray-200 hover:border-black'}`}
    >
      {label}
    </button>
  );

  const renderContent = () => {
    switch (currentView) {
      case AppView.CHORDS:
        return (
          <div className="w-full max-w-5xl flex flex-col items-center">
            <h2 className="text-3xl font-bold text-dark mb-6 text-center bg-white inline-block px-6 py-2 rounded-full border-2 border-black shadow-cartoon-sm mx-auto flex items-center gap-2">
               Galeria de Acordes
            </h2>

            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-full">
               <FilterButton type="open-major" label="Maiores (Fáceis)" color="bg-primary" />
               <FilterButton type="open-minor" label="Menores (Fáceis)" color="bg-secondary" />
               <FilterButton type="all-major" label="Todos Maiores" color="bg-accent" />
               <FilterButton type="all-minor" label="Todos Menores" color="bg-purple-400" />
               <FilterButton type="all" label="Todos (C a B)" color="bg-dark" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center animate-in fade-in duration-500">
              {processedChords.length > 0 ? (
                processedChords.map((chord) => (
                  <ChordCard key={chord.name} chord={chord} />
                ))
              ) : (
                <div className="col-span-full py-10 text-center text-gray-400 font-bold">
                  Nenhum acorde encontrado nesta categoria! 🎸
                </div>
              )}
            </div>
          </div>
        );
      case AppView.TUNER:
        return <Tuner />;
      case AppView.SONGS:
        return <SongBook />;
      default:
        return <div>View not found</div>;
    }
  };

  const NavButton = ({ view, icon: Icon, label, colorClass }: { view: AppView, icon: any, label: string, colorClass: string }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 border-transparent transition-all w-full md:w-auto md:px-6
        ${currentView === view 
          ? `bg-white border-black shadow-cartoon-sm -translate-y-1` 
          : 'hover:bg-white/50 text-gray-600'}`}
    >
      <div className={`p-2 rounded-full mb-1 ${currentView === view ? colorClass : 'bg-gray-200'}`}>
        <Icon size={20} className={currentView === view ? 'text-white' : 'text-gray-500'} />
      </div>
      <span className={`text-xs md:text-sm font-bold ${currentView === view ? 'text-black' : 'text-gray-500'}`}>
        {label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F7F9FC] pb-24 md:pb-0">
      {/* Top Header */}
      <header className="bg-primary border-b-4 border-black py-4 px-6 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="bg-white p-2 rounded-full border-2 border-black shadow-sm">
                <span className="text-2xl">🎸</span>
             </div>
             <h1 className="text-2xl md:text-3xl font-black text-white [-webkit-text-stroke:1.5px_black] tracking-wider">
               VIOLÃO MÁGICO
             </h1>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center p-4 md:p-8 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Bottom Navigation Bar (Mobile Friendly) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black p-2 md:relative md:border-t-0 md:bg-transparent md:mb-8 z-50">
        <div className="max-w-xl mx-auto bg-white md:bg-white/80 md:backdrop-blur-md md:rounded-2xl md:border-4 md:border-black md:shadow-cartoon md:p-2 flex justify-between md:justify-around items-center gap-1">
          <NavButton view={AppView.CHORDS} icon={Music} label="Acordes" colorClass="bg-red-400" />
          <NavButton view={AppView.SONGS} icon={BookOpen} label="Músicas" colorClass="bg-yellow-400" />
          <NavButton view={AppView.TUNER} icon={Mic2} label="Afinador" colorClass="bg-green-400" />
        </div>
      </nav>
    </div>
  );
};

export default App;