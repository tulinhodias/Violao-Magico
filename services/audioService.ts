import { GUITAR_STRINGS } from '../constants';

class AudioService {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.ctx;
  }

  public playTone(frequency: number, duration: number = 2) {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Use triangle wave for a softer, more string-like sound than sine or square
    osc.type = 'triangle';
    osc.frequency.value = frequency;

    // Envelope for plucking sound
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration); // Decay

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }

  // Calculate frequency for a specific fret on a string
  private getNoteFrequency(baseFreq: number, fret: number): number {
    if (fret < 0) return 0; // Muted
    // Formula: f = f0 * (2 ^ (n/12))
    return baseFreq * Math.pow(2, fret / 12);
  }

  public async strumChord(frets: number[]) {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    // Strumming effect: play strings with a slight delay
    frets.forEach((fret, stringIndex) => {
      if (fret >= 0) {
        const baseFreq = GUITAR_STRINGS[stringIndex].freq; // 0 is low E (top string visually, but usually index 0 in our array logic needs mapping)
        // Correct mapping: GUITAR_STRINGS in constants is [Low E, A, D, G, B, High e]
        // frets array usually comes as [Low E, A, D, G, B, High e]
        
        const freq = this.getNoteFrequency(baseFreq, fret);
        
        setTimeout(() => {
          this.playTone(freq, 2.5);
        }, stringIndex * 60); // 60ms delay between strings for "strum" feel
      }
    });
  }
}

export const audioService = new AudioService();