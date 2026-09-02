
// JS/engine/fusion.js
// ================================================================
// FUSION ENGINE · QDF · AXLES · ANIME FULL EDITION
// ================================================================

import { AnimeSlots } from "./animeSlots.js";

// Fusion Engine erzeugt aus Q, D, F eine kombinierte Energie,
// die von der General Engine genutzt wird.
export class FusionEngine {
    constructor(size = 9) {
        this.slots = new AnimeSlots(size);

        this.fusionValue = 0;     // Gesamtenergie
        this.fusionPulse = 0;     // Pulsierende Energie
        this.fusionDrift = 0;     // Drift‑Energie
        this.fusionRoot = 0;      // Engine‑Root
        this.pump = 0;            // Pump‑Level
        this.time = 0;
    }

    // -------------------------------------------------------------
    // Pump‑Level setzen (General Engine)
    // -------------------------------------------------------------
    setPump(p) {
        this.pump = p;
    }

    // -------------------------------------------------------------
    // Anime‑Slots aktualisieren
    // -------------------------------------------------------------
    update(time) {
        this.time = time;

        // Anime‑Animation
        this.slots.updateAnime(time);

        // QDF‑Matrix aktualisieren
        this.slots.updateQDF(this.pump);

        // Fusion berechnen
        this.computeFusion();
    }

    // -------------------------------------------------------------
    // Fusion berechnen (Q + D + F)
    // -------------------------------------------------------------
    computeFusion() {
        let sumQ = 0;
        let sumD = 0;
        let sumF = 0;

        for (const s of this.slots.slots) {
            sumQ += s.q;
            sumD += s.d;
            sumF += s.f;
        }

        // Gesamtenergie
        this.fusionValue = sumQ + sumD + sumF;

        // Pulsierende Energie (Anime‑Style)
        this.fusionPulse = Math.sin(this.time * 0.002 + this.fusionValue * 0.01);

        // Drift‑Energie
        this.fusionDrift = Math.cos(this.time * 0.001 + this.fusionValue * 0.02);

        // Engine‑Root (Axles)
        this.fusionRoot = this.slots.getActiveAxles();
    }

    // -------------------------------------------------------------
    // Fusion‑Snapshot für General Engine
    // -------------------------------------------------------------
    getSnapshot() {
        return {
            value: this.fusionValue,
            pulse: this.fusionPulse,
            drift: this.fusionDrift,
            root: this.fusionRoot,
            pump: this.pump,
            liveWindow: this.slots.getLiveWindow()
        };
    }

    // -------------------------------------------------------------
    // Axles steuern
    // -------------------------------------------------------------
    toggleAxle(index) {
        this.slots.toggleAxle(index);
    }

    clearAxles() {
        this.slots.clearAxles();
    }

    setAxle(index, state) {
        this.slots.setAxle(index, state);
    }
}
