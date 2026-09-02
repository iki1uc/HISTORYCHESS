// JS/ui/events.js
// ================================================================
// UI EVENTS · ANIME FULL EDITION
// ================================================================

import { playNextMove, loadGame, allGames, stopAuto } from "../chess/replay.js";
import { engine } from "../engine/general.js";

// -------------------------------------------------------------
// UI binden
// -------------------------------------------------------------
export function bindUI(ctx) {

    const {
        playNextMove,
        loadGame,
        engine,
        atmo
    } = ctx;

    // ---------------------------------------------------------
    // STEP
    // ---------------------------------------------------------
    const btnStep = document.getElementById("btnStep");
    if (btnStep) {
        btnStep.onclick = () => {
            playNextMove();
        };
    }

    // ---------------------------------------------------------
    // AUTO
    // ---------------------------------------------------------
    const btnAuto = document.getElementById("btnAuto");
    if (btnAuto) {
        btnAuto.onclick = () => {
            if (!window.autoMode) {
                window.autoMode = true;
                btnAuto.textContent = "⏸ Stop";
                playNextMove();
            } else {
                window.autoMode = false;
                btnAuto.textContent = "▶ Auto";
                stopAuto();
            }
        };
    }

    // ---------------------------------------------------------
    // RESET BOARD
    // ---------------------------------------------------------
    const btnResetBoard = document.getElementById("btnResetBoard");
    if (btnResetBoard) {
        btnResetBoard.onclick = () => {
            const canvas = document.getElementById("chessCanvas");
            const { initBoard, renderBoard } = await import("../chess/board.js");
            initBoard(canvas);
            renderBoard(canvas);
        };
    }

    // ---------------------------------------------------------
    // GENERAL RUN
    // ---------------------------------------------------------
    const btnGeneral = document.getElementById("btnGeneral");
    if (btnGeneral) {
        btnGeneral.onclick = () => {
            engine.runGeneral();
        };
    }

    // ---------------------------------------------------------
    // PUMP
    // ---------------------------------------------------------
    const btnPump = document.getElementById("btnPump");
    if (btnPump) {
        btnPump.onclick = () => {
            engine.pumpCycle();
        };
    }

    // ---------------------------------------------------------
    // RANDOM AXLES
    // ---------------------------------------------------------
    const btnRandom = document.getElementById("btnRandom");
    if (btnRandom) {
        btnRandom.onclick = () => {
            engine.randomize();
        };
    }

    // ---------------------------------------------------------
    // TOGGLE ALL AXLES
    // ---------------------------------------------------------
    const btnToggleAll = document.getElementById("btnToggleAll");
    if (btnToggleAll) {
        btnToggleAll.onclick = () => {
            engine.toggleAll();
        };
    }

    // ---------------------------------------------------------
    // RESET ENGINE
    // ---------------------------------------------------------
    const btnReset = document.getElementById("btnReset");
    if (btnReset) {
        btnReset.onclick = () => {
            engine.resetAll();
        };
    }

    // ---------------------------------------------------------
    // GAME SELECT (falls UI vorhanden)
    // ---------------------------------------------------------
    const gameSelect = document.getElementById("gameSelect");
    if (gameSelect) {
        gameSelect.innerHTML = "";
        allGames.forEach(g => {
            const opt = document.createElement("option");
            opt.value = g.id;
            opt.textContent = `${g.name} (${g.year})`;
            gameSelect.appendChild(opt);
        });

        gameSelect.onchange = () => {
            const id = parseInt(gameSelect.value);
            const game = allGames.find(g => g.id === id);
            if (game) loadGame(game);
        };
    }

    // ---------------------------------------------------------
    // STYLE SELECT (Anime Mood)
    // ---------------------------------------------------------
    const styleSelect = document.getElementById("styleSelect");
    if (styleSelect) {
        styleSelect.onchange = () => {
            const mood = styleSelect.value;
            atmo.setMood(mood);
        };
    }

    console.log("UI Events verbunden ✔");
}

