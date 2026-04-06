import { getConcentration } from './phase/VonMises.js';

/**
 * The Weaver - Main entry point for Consilience Weave.
 * Adjudicates science across multiple ResonAgents and time/scale domains.
 */
export class Weaver {
  /**
   * Weaves together active entities and historical data to produce a Consilience Report.
   * @param {Map} entities - Map of active entities/ResonAgents.
   * @param {Object[]} historyBuffer - Buffer of historical data snapshots.
   * @returns {Object} ConsilienceReport with Global Coherence Score and Alerts.
   */
  weave(entities, historyBuffer = []) {
    const report = {
      score: 0,
      alerts: []
    };

    if (!entities || entities.size === 0) {
      report.alerts.push("No active entities found.");
      return report;
    }

    // 1. Collect phase angles (theta) from active ResonAgents
    // Expecting Geometry component with theta property
    const angles = Array.from(entities.values())
      .map(e => (e.components && e.components.Geometry) ? e.components.Geometry.theta : undefined)
      .filter(t => t !== undefined);

    // 2. Calculate global resonance (concentration of phase angles)
    report.score = getConcentration(angles);

    // 3. Detect "Mastery Dips" or "Bifurcation Points" (Low coherence score)
    if (report.score < 0.3) {
      report.alerts.push("BIFURCATION_DETECTED: High Dissonance across scales.");
    }

    // 4. Identify Potential Resonance Peaks
    if (report.score > 0.8) {
      report.alerts.push("RESONANCE_PEAK_DETECTED: High Coherence across the weave.");
    }

    return report;
  }
}
