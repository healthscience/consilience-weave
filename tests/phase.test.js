import { describe, it, expect } from 'vitest';
import { getConcentration, calculateCoherence } from '../src/phase/VonMises.js';

describe('VonMises Harmonic Math', () => {
  it('should calculate global concentration (r)', () => {
    // Perfectly aligned angles should give r = 1
    const alignedAngles = [Math.PI/2, Math.PI/2, Math.PI/2];
    expect(getConcentration(alignedAngles)).toBeCloseTo(1);

    // Uniformly distributed angles should give r = 0
    const spreadAngles = [0, Math.PI/2, Math.PI, (3 * Math.PI) / 2];
    expect(getConcentration(spreadAngles)).toBeCloseTo(0);
  });

  it('should calculate coherence between two phases', () => {
    // Identical phases
    expect(calculateCoherence(0, 0)).toBe(1);
    expect(calculateCoherence(Math.PI, Math.PI)).toBe(1);

    // Opposing phases
    expect(calculateCoherence(0, Math.PI)).toBeCloseTo(0);
    expect(calculateCoherence(Math.PI/2, (3 * Math.PI)/2)).toBeCloseTo(0);

    // Quarter-turn (90 deg)
    expect(calculateCoherence(0, Math.PI/2)).toBeCloseTo(0.5);
  });
});
