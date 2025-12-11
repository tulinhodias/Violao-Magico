import { ChordData, Song } from './types';

// Standard Tuning Frequencies (E2 A2 D3 G3 B3 E4)
export const GUITAR_STRINGS = [
  { name: 'E', freq: 82.41, note: 'E2' },
  { name: 'A', freq: 110.00, note: 'A2' },
  { name: 'D', freq: 146.83, note: 'D3' },
  { name: 'G', freq: 196.00, note: 'G3' },
  { name: 'B', freq: 246.94, note: 'B3' },
  { name: 'e', freq: 329.63, note: 'E4' },
];

export const CHORDS: ChordData[] = [
  // --- MAIORES (Sem Pestana) ---
  { name: 'C', suffix: 'Maior', category: 'major', frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0] },
  { name: 'D', suffix: 'Maior', category: 'major', frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2] },
  { name: 'E', suffix: 'Maior', category: 'major', frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0] },
  { name: 'G', suffix: 'Maior', category: 'major', frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3] },
  { name: 'A', suffix: 'Maior', category: 'major', frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 2, 1, 3, 0] },
  
  // --- MENORES (Sem Pestana) ---
  { name: 'Dm', suffix: 'Menor', category: 'minor', frets: [-1, -1, 0, 2, 3, 1], fingers: [0, 0, 0, 2, 3, 1] },
  { name: 'Em', suffix: 'Menor', category: 'minor', frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] },
  { name: 'Am', suffix: 'Menor', category: 'minor', frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },

  // --- PESTANAS MAIORES (Para completar C, D, E, F, G, A, B) ---
  { name: 'F', suffix: 'Maior', category: 'major-barre', frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barre: 1 },
  { name: 'B', suffix: 'Maior', category: 'major-barre', frets: [-1, 2, 4, 4, 4, 2], fingers: [0, 1, 2, 3, 4, 1], barre: 2 },

  // --- PESTANAS MENORES (Para completar Cm, Dm, Em, Fm, Gm, Am, Bm) ---
  { name: 'Cm', suffix: 'Menor', category: 'minor-barre', frets: [-1, 3, 5, 5, 4, 3], fingers: [0, 1, 3, 4, 2, 1], barre: 3 },
  { name: 'Fm', suffix: 'Menor', category: 'minor-barre', frets: [1, 3, 3, 1, 1, 1], fingers: [1, 3, 4, 1, 1, 1], barre: 1 },
  { name: 'Gm', suffix: 'Menor', category: 'minor-barre', frets: [3, 5, 5, 3, 3, 3], fingers: [1, 3, 4, 1, 1, 1], barre: 3 },
  { name: 'Bm', suffix: 'Menor', category: 'minor-barre', frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], barre: 2 },
];

export const INITIAL_SONGS: Song[] = [
  {
    id: '1',
    title: 'Brilha Brilha Estrelinha',
    artist: 'Cantiga Popular',
    difficulty: 'Fácil',
    requiredChords: ['C', 'F', 'G'], // Simplified for C Major key usually
    content: [
      { lyrics: 'Brilha brilha estrelinha', chords: [{ name: 'C', position: 0 }, { name: 'F', position: 14 }, { name: 'C', position: 22 }] },
      { lyrics: 'Quero ver você brilhar', chords: [{ name: 'F', position: 0 }, { name: 'C', position: 10 }, { name: 'G', position: 20 }] },
      { lyrics: 'Lá no alto lá no céu', chords: [{ name: 'C', position: 0 }, { name: 'F', position: 11 }, { name: 'C', position: 20 }] },
      { lyrics: 'Num desenho de cordel', chords: [{ name: 'F', position: 0 }, { name: 'C', position: 14 }, { name: 'G', position: 23 }] },
    ]
  },
  {
    id: '2',
    title: 'Parabéns pra Você',
    artist: 'Tradicional',
    difficulty: 'Fácil',
    requiredChords: ['A', 'E', 'D'], // Transposed to A for ease
    content: [
      { lyrics: 'Parabéns pra você', chords: [{ name: 'A', position: 0 }, { name: 'E', position: 10 }] },
      { lyrics: 'Nesta data querida', chords: [{ name: 'E', position: 0 }, { name: 'A', position: 11 }] },
      { lyrics: 'Muitas felicidades', chords: [{ name: 'A', position: 0 }, { name: 'D', position: 7 }] },
      { lyrics: 'Muitos anos de vida', chords: [{ name: 'A', position: 0 }, { name: 'E', position: 7 }, { name: 'A', position: 15 }] },
    ]
  }
];