// JS/chess/replay.js
// ================================================================
// CHESS REPLAY SYSTEM · ANIME FULL EDITION
// ================================================================

import { board, animateMove, renderBoard } from "./board.js";
import { inBounds } from "./moves.js";

// -------------------------------------------------------------
// Replay‑Variablen
// -------------------------------------------------------------
export let currentGame = null;
export let currentGameMoves = [];
export let moveIndex = 0;
export let autoMode = false;
export let moveSpeed = 700;

// -------------------------------------------------------------
// Zufällige Demo‑Games erzeugen (Anime‑Edition)
// -------------------------------------------------------------
export function generateGames(n = 20) {
    const games = [];
    const names = [
        "Unsterbliche Partie", "Opernpartie", "Evergreen",
        "Kasparov vs Deep Blue", "Königsangriff", "Damen‑Opfer",
        "Turm‑Sprung", "Bauern‑Welle", "Schäferzug", "Läufer‑Coup"
    ];

    const pieces = ["♟","♞","♝","♜","♛","♚"];
    const types  = ["pawn","knight","bishop","rook","queen","king"];

    for (let i = 0; i < n; i++) {
        const moves = [];

        const moveCount = 12 + Math.floor(Math.random() * 20);

        for (let m = 0; m < moveCount; m++) {
            const from = String.fromCharCode(97 + Math.floor(Math.random() * 8)) + (1 + Math.floor(Math.random() * 8));
            const to   = String.fromCharCode(97 + Math.floor(Math.random() * 8)) + (1 + Math.floor(Math.random() * 8));

            const idx = Math.floor(Math.random() * 6);

            moves.push({
                from,
                to,
                piece: pieces[idx],
                type: types[idx],
                color: m % 2 === 0 ? "white" : "black",
                notation: `${from}→${to}`
            });
        }

        games.push({
            id: i,
            name: names[i % names.length] + " #" + (i + 1),
            year: 1800 + Math.floor(Math.random() * 200),
            moves,
            winner: ["Weiß", "Schwarz", "Remis"][Math.floor(Math.random() * 3)]
        });
    }

    return games;
}

// -------------------------------------------------------------
// Alle Replay‑Games
// -------------------------------------------------------------
export const allGames = generateGames(30);

// -------------------------------------------------------------
// Spiel laden
// -------------------------------------------------------------
export function loadGame(game) {
    currentGame = game;
    currentGameMoves = game.moves.slice();
    moveIndex = 0;

    renderBoard(document.getElementById("chessCanvas"));

    const total = document.getElementById("totalMoves");
    const count = document.getElementById("moveCount");
    const turn  = document.getElementById("turnIndicator");

    if (total) total.textContent = currentGameMoves.length;
    if (count) count.textContent = "0";
    if (turn)  turn.textContent  = "Weiß";
}

// -------------------------------------------------------------
// Nächsten Zug abspielen
// -------------------------------------------------------------
export function playNextMove() {
    if (!currentGame || moveIndex >= currentGameMoves.length) {
        if (autoMode) stopAuto();
        return;
    }

    const m = currentGameMoves[moveIndex];
    const color = m.color;

    let from = null;
    let piece = null;

    // Figur suchen
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const p = board[r][c];
            if (p && p.type === m.type && p.color === color) {
                from = { r, c };
                piece = p;
                break;
            }
        }
        if (from) break;
    }

    // Fallback: nach Symbol suchen
    if (!from) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const p = board[r][c];
                if (p && p.piece === m.piece) {
                    from = { r, c };
                    piece = p;
                    break;
                }
            }
            if (from) break;
        }
    }

    // Zielkoordinaten
    const to = {
        r: 8 - parseInt(m.to[1]),
        c: m.to.charCodeAt(0) - 97
    };

    // Animation
    if (from && piece && inBounds(to.r, to.c)) {
        animateMove(from, to, piece, () => {
            moveIndex++;

            const count = document.getElementById("moveCount");
            const turn  = document.getElementById("turnIndicator");

            if (count) count.textContent = moveIndex;
            if (turn)  turn.textContent  = moveIndex % 2 === 0 ? "Weiß" : "Schwarz";

            if (autoMode && moveIndex < currentGameMoves.length) {
                setTimeout(playNextMove, moveSpeed);
            } else if (autoMode) {
                stopAuto();
            }
        });
    } else {
        moveIndex++;
        setTimeout(playNextMove, 100);
    }
}

// -------------------------------------------------------------
// Auto‑Modus stoppen
// -------------------------------------------------------------
export function stopAuto() {
    autoMode = false;
    const btn = document.getElementById("btnAuto");
    if (btn) btn.textContent = "▶ Auto";
}
