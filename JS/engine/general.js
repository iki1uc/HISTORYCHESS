// JS/engine/general.js
// ================================================================
// GENERAL ENGINE · ANIME FULL EDITION
// Axles · Pump · QDF · Fusion · CPU-Bias · LiveWindow
// ================================================================

import { FusionEngine } from "./fusion.js";

class GeneralEngine {
    constructor() {
        this.fusion = new FusionEngine(9);

        this.time = 0;
        this.running = false;

        this.pump = 0;          // Pump-Level
        this.bias = 0;          // CPU-Bias
        this.axlesOn = false;   // Axle-Mode

        this.state = {
            predict: "IDLE",
            root: 0,
            energy: 0,
            pulse: 0,
            drift: 0,
            pump: 0,
            bias: 0,
            liveWindow: []
        };
    }

    // -------------------------------------------------------------
    // Engine starten
    // -------------------------------------------------------------
    init() {
        this.running = true;
        this.loop();
    }

    // -------------------------------------------------------------
    // Haupt-Loop
    // -------------------------------------------------------------
    loop() {
        if (!this.running) return;

        this.time = performance.now();

        // Fusion aktualisieren
        this.fusion.setPump(this.pump);
        this.fusion.update(this.time);

        // Snapshot holen
        const snap = this.fusion.getSnapshot();

        // Engine-State aktualisieren
        this.state.energy = snap.value;
        this.state.pulse  = snap.pulse;
        this.state.drift  = snap.drift;
        this.state.root   = snap.root;
        this.state.pump   = snap.pump;
        this.state.liveWindow = snap.liveWindow;

        // CPU-Bias
        this.state.bias = this.bias;

        // Prediction (Anime-Style)
        this.state.predict = this.state.energy > 0 ? "ACTIVE" : "IDLE";

        requestAnimationFrame(() => this.loop());
    }

    // -------------------------------------------------------------

