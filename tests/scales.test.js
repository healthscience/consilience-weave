import { describe, it, expect } from 'vitest';
import { ScaleBridge } from '../src/scales/ScaleBridge.js';

describe('ScaleBridge Zoom Logic', () => {
  const sb = new ScaleBridge();

  it('should map intensity across scales', () => {
    // 0 on [0, 100] scale maps to 50 on [50, 150] scale
    expect(sb.mapIntensity(0, 0, 100, 50, 150)).toBe(50);
    expect(sb.mapIntensity(50, 0, 100, 50, 150)).toBe(100);
    expect(sb.mapIntensity(100, 0, 100, 50, 150)).toBe(150);
  });

  it('should correlate micro and macro changes', () => {
    // Micro up (Mitochondrial efficiency) -> Macro down (Swim time)
    // Positive correlation (resonance)
    const micro = { change: 0.1 };
    const macro = { change: -0.02 };
    expect(sb.crossScaleCheck(micro, macro)).toBeGreaterThan(0);

    // Micro up -> Macro up (Performance decrease)
    // Negative correlation (dissonance)
    const badMacro = { change: 0.05 };
    expect(sb.crossScaleCheck(micro, badMacro)).toBeLessThan(0);
  });
});
