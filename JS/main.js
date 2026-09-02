// JS/main.js
// ================================================================
// MAIN STARTER · ANIME FULL EDITION
// Verbindet: AtmoBoard · ChessBoard · Replay · Engine · UI · Resize
// ================================================================

import { AtmoBoard } from "./atmo/atmoBoard.js";
import { initBoard, renderBoard } from "./chess/board.js";
import { loadGame, allGames } from "./chess/replay.js";
import { engine } from "./engine/general.js";
import { bindUI } from "./ui/events.js";
import { resizeCanvases } from "./ui/resize.js";

// -------------------------------------------------------------
// DOM READY
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    // Canvas holen
    const atmoCanvas  = document.getElementById("atmoCanvas");
    const chessCanvas = document.getElementById("chessCanvas");

    // Canvas Pixelgröße setzen
    resizeCanvases(atmoCanvas, chessCanvas);
    window.addEventListener("resize", () => resizeCanvases(atmoCanvas, chessCanvas));

    // ---------------------------------------------------------
    // ATMOSPHERE BOARD (Anime Edition)
    // ---------------------------------------------------------
    window.atmo = new AtmoBoard(atmoCanvas);
    atmo.setMood("anime");
    atmo.start();

    // ---------------------------------------------------------
    // CHESS BOARD
    // ---------------------------------------------------------
    initBoard(chessCanvas);
    renderBoard(chessCanvas);

    // Erstes Replay‑Game laden
    if (allGames.length > 0) {
        loadGame(allGames[0]);
    }

    // ---------------------------------------------------------
    // ENGINE STARTEN
    // ---------------------------------------------------------
    engine.init();

    // ---------------------------------------------------------
    // UI EVENTS VERBINDEN
    // ---------------------------------------------------------
    bindUI({
        playNextMove: window.playNextMove,
        loadGame,
        engine,
        atmo
    });

    console.log("⭐ ANIME FULL EDITION · MAIN.js gestartet");
});

