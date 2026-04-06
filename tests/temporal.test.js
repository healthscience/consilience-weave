import { describe, it, expect } from 'vitest';
import { HistoricalLookback } from '../src/temporal/HistoricalLookback.js';

describe('HistoricalLookback Echo Logic', () => {
  const hl = new HistoricalLookback();

  it('should find optimal lag for highest resonance', () => {
    const current = { value: 0.8 };
    const history = [
      { value: 0.2 }, // lag 0
      { value: 0.4 }, // lag 1
      { value: 0.79 }, // lag 2 (Target)
      { value: 0.5 }, // lag 3
    ];

    const result = hl.analyzeLag(current, history);
    expect(result.optimalLag).toBe(2);
    expect(result.resonanceScore).toBeCloseTo(0.99);
  });
});
