import { describe, it, expect } from 'vitest';
import { Weaver } from '../src/index.js';

describe('The Weaver Integration', () => {
  const weaver = new Weaver();

  it('should weave active entities into a consilience report', () => {
    // Entities with coherent phase angles (close to Math.PI/2)
    const entities = new Map();
    entities.set('entity1', { components: { Geometry: { theta: 1.5 } } });
    entities.set('entity2', { components: { Geometry: { theta: 1.6 } } });
    entities.set('entity3', { components: { Geometry: { theta: 1.7 } } });

    const report = weaver.weave(entities);
    expect(report.score).toBeGreaterThan(0.9);
    expect(report.alerts).toContain('RESONANCE_PEAK_DETECTED: High Coherence across the weave.');
  });

  it('should detect bifurcation points (high dissonance)', () => {
    // Entities with spread out angles
    const entities = new Map();
    entities.set('entity1', { components: { Geometry: { theta: 0 } } });
    entities.set('entity2', { components: { Geometry: { theta: 2.1 } } });
    entities.set('entity3', { components: { Geometry: { theta: 4.2 } } });

    const report = weaver.weave(entities);
    expect(report.score).toBeLessThan(0.3);
    expect(report.alerts).toContain('BIFURCATION_DETECTED: High Dissonance across scales.');
  });
});
