export class AtmoBoard {
    constructor(canvas, size = 9) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.size = size;          // 9×9 Anime‑Slots
        this.slots = [];           // 81 dynamische Werte
        this.lines = [];           // Geo‑Matrix‑Linien
        this.particles = [];       // Anime‑Partikel
        this.mood = "anime";       // aktueller Stil
        this.t = 0;                // Zeit
        this.running = true;

        this.resize();
        this.initSlots();
        this.initLines();
    }

    resize() {
        this.canvas.width  = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.cell = this.canvas.width / this.size;
    }

    // -------------------------------------------------------------
    // 81 Anime‑Slots
    // -------------------------------------------------------------
    initSlots() {
        this.slots = [];
        for (let i = 0; i < 81; i++) {
            this.slots.push({
                value: Math.sin(i * 0.2),
                pulse: 0,
                drift: 0,
                angle: 0
            });
        }
    }

    updateSlots(time) {
        for (let i = 0; i < 81; i++) {
            const s = this.slots[i];
            s.value = Math.sin(i * 0.2 + time * 0.001);
            s.pulse = Math.sin(time / 120 + i * 0.1);
            s.drift = Math.cos(time / 240 + i * 0.05);
            s.angle = (time / 10 + i * 4) % 360;
        }
    }

    // -------------------------------------------------------------
    // Geo‑Matrix Linien
    // -------------------------------------------------------------
    initLines() {
        this.lines = [];
        for (let i = 0; i < 20; i++) {
            const start = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height
            };
            const end = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height
            };
            this.lines.push({
                start,
                end,
                progress: Math.random(),
                speed: 0.002 + Math.random() * 0.005,
                width: 0.5 + Math.random() * 2,
                color: `rgba(100,220,255,${0.05 + Math.random() * 0.15})`
            });
        }
    }

    setMood(mood) {
        this.mood = mood;
    }

    // -------------------------------------------------------------
    // Haupt‑Zeichenroutine
    // -------------------------------------------------------------
    draw() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        const cs = this.cell;
        const t = Date.now();

        this.updateSlots(t);

        // Hintergrund
        ctx.fillStyle = "rgba(0,0,20,0.4)";
        ctx.fillRect(0, 0, w, h);

        // Geo‑Matrix Linien
        for (const line of this.lines) {
            const p = (line.progress + t * line.speed * 0.001) % 1;
            const x1 = line.start.x + (line.end.x - line.start.x) * p;
            const y1 = line.start.y + (line.end.y - line.start.y) * p;
            const x2 = line.start.x + (line.end.x - line.start.x) * ((p + 0.2) % 1);
            const y2 = line.start.y + (line.end.y - line.start.y) * ((p + 0.2) % 1);

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = line.color;
            ctx.lineWidth = line.width;
            ctx.stroke();
        }

        // Anime‑Slots
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                const idx = r * this.size + c;
                const slot = this.slots[idx];

                const x = c * cs;
                const y = r * cs;

                const val = slot.value * 0.5 + 0.5;
                const pulse = slot.pulse * 0.3 + 0.7;

                const rCol = Math.floor(80 + val * 120 + pulse * 40);
                const gCol = Math.floor(100 + slot.drift * 30 + pulse * 20);
                const bCol = Math.floor(200 + val * 30 + slot.drift * 20);

                ctx.fillStyle = `rgba(${rCol},${gCol},${bCol},0.15)`;
                ctx.fillRect(x, y, cs, cs);

                ctx.strokeStyle = `rgba(${rCol+50},${gCol+50},${bCol+50},0.2)`;
                ctx.lineWidth = 0.5;
                ctx.strokeRect(x, y, cs, cs);

                const angleRad = slot.angle * Math.PI / 180;
                const dotX = x + cs/2 + Math.cos(angleRad) * cs * 0.3;
                const dotY = y + cs/2 + Math.sin(angleRad) * cs * 0.3;

                ctx.fillStyle = "rgba(255,255,255,0.2)";
                ctx.beginPath();
                ctx.arc(dotX, dotY, 2 + pulse, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Partikel
        if (Math.random() > 0.93) {
            const idx = Math.floor(Math.random() * 81);
            const slot = this.slots[idx];
            const r = Math.floor(idx / this.size);
            const c = idx % this.size;

            const x = c * cs + cs / 2;
            const y = r * cs + cs / 2;

            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 2;

            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed + slot.drift * 0.5,
                vy: Math.sin(angle) * speed + slot.drift * 0.5,
                life: 1,
                size: 1 + Math.random() * 3,
                color: `rgba(${120 + slot.value * 80}, ${180 + slot.pulse * 60}, 255, 0.4)`
            });
        }

        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.003;

            if (p.life <= 0) return false;

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;

            return true;
        });
    }

    loop() {
        if (!this.running) return;
        this.draw();
        requestAnimationFrame(() => this.loop());
    }

    start() {
        this.running = true;
        this.loop();
    }

    stop() {
        this.running = false;
    }
}

