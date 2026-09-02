
// JS/engine/animeSlots.js
// ================================================================
// ANIME ENGINE SLOTS · 81 CELLS · QDF MATRIX · AXLE SYSTEM
// ================================================================

export class AnimeSlots {
    constructor(size = 9) {
        this.size = size;          // 9×9 = 81 Slots
        this.slots = [];           // Slot‑Objekte
        this.time = 0;             // Zeit für Animation
        this.initSlots();
    }

    // -------------------------------------------------------------
    // 81 Anime‑Slots erzeugen
    // -------------------------------------------------------------
    initSlots() {
        this.slots = [];

        for (let i = 0; i < this.size * this.size; i++) {
            this.slots.push({
                value: Math.random(),
                pulse: Math.random(),
                drift: Math.random(),
                q: 0,
                d: 0,
                f: 0,
                axle: false
            });
        }
    }

    // -------------------------------------------------------------
    // QDF‑Matrix berechnen (Anime‑Engine)
    // -------------------------------------------------------------
    updateQDF(pump) {
        for (let i = 0; i < this.slots.length; i++) {
            const s = this.slots[i];

            // Q = leichte Schwingung + Pump‑Einfluss
            s.q = Math.sin(i * 0.15 + pump * 0.05);

            // D = Drift + Pump‑Dämpfung
            s.d = Math.cos(i * 0.12 + pump * 0.03);

            // F = Fusion‑Wert (Anime‑Style)
            s.f = Math.sin(i * 0.07 + pump * 0.02) * Math.cos(pump * 0.03);
        }
    }

    // -------------------------------------------------------------
    // Axles aktivieren / deaktivieren
    // -------------------------------------------------------------
    toggleAxle(index) {
        if (index >= 0 && index < this.slots.length) {
            this.slots[index].axle = !this.slots[index].axle;
        }
    }

    setAxle(index, state) {
        if (index >= 0 && index < this.slots.length) {
            this.slots[index].axle = state;
        }
    }

    clearAxles() {
        for (const s of this.slots) s.axle = false;
    }

    // -------------------------------------------------------------
    // Anime‑Update (Pulse, Drift, Value)
    // -------------------------------------------------------------
    updateAnime(time) {
        this.time = time;

        for (let i = 0; i < this.slots.length; i++) {
            const s = this.slots[i];

            s.value = Math.sin(time * 0.001 + i * 0.05);
            s.pulse = Math.cos(time * 0.002 + i * 0.03);
            s.drift = Math.sin(time * 0.0007 + i * 0.02);
        }
    }

    // -------------------------------------------------------------
    // Axle‑Count (Engine‑Root)
    // -------------------------------------------------------------
    getActiveAxles() {
        return this.slots.filter(s => s.axle).length;
    }

    // -------------------------------------------------------------
    // LiveWindow erzeugen (3×2 Matrix)
    // -------------------------------------------------------------
    getLiveWindow() {
        const w = [];

        for (let r = 0; r < 3; r++) {
            const row = [];
            for (let c = 0; c < 2; c++) {
                const idx = r * 2 + c;
                const s = this.slots[idx];

                row.push(
                    String(
                        Math.floor(
                            (s.q + s.d + s.f) * 100
                        )
                    )
                );
            }
            w.push(row);
        }

        return w;
    }
}
