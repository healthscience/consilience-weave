/**
 * Pure JS implementation for HOP Consilience Weave.
 * Measures how well a set of circular data (angles) is concentrated around a mean direction.
 */

/**
 * Calculates the mean result length (r) of a set of angles.
 * r is our primary Coherence metric, ranging from 0 (Dissonance) to 1 (Resonance).
 * @param {number[]} angles - Array of phase angles in radians.
 * @returns {number} The concentration value r.
 */
export const getConcentration = (angles) => {
  if (!angles || angles.length === 0) return 0;
  
  let sumSin = 0;
  let sumCos = 0;
  for (const a of angles) {
    sumSin += Math.sin(a);
    sumCos += Math.cos(a);
  }
  
  const r = Math.sqrt(sumSin**2 + sumCos**2) / angles.length;
  return r; 
};

/**
 * Calculates the coherence between two phase angles.
 * Returns 1 if they are identical, 0 if they are diametrically opposed.
 * @param {number} phaseA - First angle in radians.
 * @param {number} phaseB - Second angle in radians.
 * @returns {number} Coherence score between 0 and 1.
 */
export const calculateCoherence = (phaseA, phaseB) => {
  // Cosine of the difference gives a value from -1 to 1.
  // We normalize it to 0 to 1 for our coherence metric.
  const diff = phaseA - phaseB;
  return (Math.cos(diff) + 1) / 2;
};
