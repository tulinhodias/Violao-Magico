export type ChordCategory = 'major' | 'minor' | 'major-barre' | 'minor-barre';

export interface ChordData {
  name: string;
  suffix?: string;
  category: ChordCategory;
  frets: number[]; // -1 for mute, 0 for open, 1+ for fret
  fingers: number[]; // 0 for none, 1-4 for fingers
  barre?: number; // Fret number for barre (pestana)
}

export interface SongLine {
  lyrics: string;
  chords: {
    name: string;
    position: number; // Character index in the lyrics line
  }[];
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: 'Fácil' | 'Médio';
  content: SongLine[];
  requiredChords: string[];
}

export enum AppView {
  CHORDS = 'CHORDS',
  TUNER = 'TUNER',
  SONGS = 'SONGS',
}