import { EventEmitter } from 'events';

/**
 * Normalizing data across biological and environmental scales.
 * Maps unit-less "Intensity" scores from one domain (micro) to another (macro).
 */

export class ScaleBridge {
  /**
   * Performs a cross-scale consilience check between micro and macro entities.
   * Compares the normalized performance/efficiency changes.
   * @param {Object} microEntity - Entity representing micro-scale changes (e.g., Mitochondrial_Efficiency).
   * @param {Object} macroEntity - Entity representing macro-scale changes (e.g., 100m_Swim_Time).
   * @returns {number} Correlation/Consilience score between -1 and 1.
   */
  crossScaleCheck(microEntity, macroEntity) {
    // Basic logic to compare normalized changes
    const microChange = microEntity.change || 0;
    const macroChange = macroEntity.change || 0;

    // In many biological systems, micro improvement (increase) leads to macro improvement (decrease in time)
    // We assume inverse correlation for time-based macro metrics.
    // If macroEntity is NOT time-based, the caller should adjust the sign of macroChange.
    
    // Simple product as a rough correlation proxy for this prototype
    // In a real system, this would use a more complex regression or alignment algorithm.
    const consilience = microChange * (-macroChange); 
    
    return Math.tanh(consilience); // Clamp to [-1, 1]
  }

  /**
   * Maps an intensity value from a source range to a target scale.
   * @param {number} value - Input value.
   * @param {number} srcMin - Minimum value of source scale.
   * @param {number} srcMax - Maximum value of source scale.
   * @param {number} targetMin - Minimum value of target scale.
   * @param {number} targetMax - Maximum value of target scale.
   * @returns {number} Normalized value on target scale.
   */
  mapIntensity(value, srcMin, srcMax, targetMin, targetMax) {
    return (value - srcMin) * (targetMax - targetMin) / (srcMax - srcMin) + targetMin;
  }
}

export class SwarmBridge extends EventEmitter {
  constructor(options = {}) {
    super();
    console.log('SwarmBridge initializing...');
    console.log('Options received:', options);

    this.swarm = options.hyperswarm;
    this.altruism = options.altruism || 0.1; // Default 10% altruism
    this.peers = new Map();

    if (!this.swarm) {
      console.warn('SwarmBridge: No hyperswarm provided in options.');
    }
  }

  async init(topicBuffer) {
    if (!this.swarm) return;

    const discovery = this.swarm.join(topicBuffer, { client: true, server: true });
    await discovery.flushed();

    this.swarm.on('connection', (socket, info) => {
      const peerId = info.publicKey.toString('hex');
      this.peers.set(peerId, socket);

      socket.on('data', (raw) => this._handleMessage(peerId, raw));
    });
  }

  _handleMessage(peerId, raw) {
    const msg = JSON.parse(raw);
    
    switch (msg.type) {
      case 'DML_CHALLENGE_REQ':
        this.emit('challenge-received', peerId, msg.payload);
        break;
      
      case 'GIFT_VERIFY_REQ':
        // The Altruism Check: Do we do the work for a third party?
        if (Math.random() < this.altruism) {
          this.emit('gifting-work-accepted', peerId, msg.payload);
        } else {
          this._send(peerId, { type: 'GIFT_REJECTED', reason: 'BUSY' });
        }
        break;
      
      // ... handle other types ...
    }
  }

  _send(peerId, msg) {
    const socket = this.peers.get(peerId);
    if (socket) socket.write(JSON.stringify(msg));
  }
}
