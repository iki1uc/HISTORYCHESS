// JS/chess/moves.js
// ================================================================
// LEGAL MOVE GENERATOR · ANIME FULL EDITION
// ================================================================

import { board } from "./board.js";

// -------------------------------------------------------------
// Hilfsfunktion: Grenzen prüfen
// -------------------------------------------------------------
export function inBounds(r, c) {
    return r >= 0 && r < 8 && c >= 0 && c < 8;
}

// -------------------------------------------------------------
// Pseudo‑legale Züge für eine Figur
// -------------------------------------------------------------
export function getPseudoLegalMoves(r, c) {
    const piece = board[r][c];
    if (!piece || !piece.type) return [];

    const moves = [];
    const enemy = piece.color === "white" ? "black" : "white";

    const add = (nr, nc) => {
        if (!inBounds(nr, nc)) return;
        const target = board[nr][nc];
        if (!target || target.color === enemy) {
            moves.push({ r: nr, c: nc });
        }
    };

    switch (piece.type) {

        // ---------------------------------------------------------
        // PAWN
        // ---------------------------------------------------------
        case "pawn": {
            const dir = piece.color === "white" ? -1 : 1;

            // 1 Schritt
            if (inBounds(r + dir, c) && !board[r + dir][c].piece) {
                moves.push({ r: r + dir, c });
            }

            // 2 Schritte
            const startRow = piece.color === "white" ? 6 : 1;
            if (r === startRow &&
                !board[r + dir][c].piece &&
                !board[r + 2 * dir][c].piece) {
                moves.push({ r: r + 2 * dir, c });
            }

            // Schlagen
            for (const dc of [-1, 1]) {
                const nr = r + dir;
                const nc = c + dc;
                if (inBounds(nr, nc) &&
                    board[nr][nc].piece &&
                    board[nr][nc].color === enemy) {
                    moves.push({ r: nr, c: nc });
                }
            }
            break;
        }

        // ---------------------------------------------------------
        // ROOK
        // ---------------------------------------------------------
        case "rook": {
            for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
                for (let i = 1; i < 8; i++) {
                    const nr = r + dr * i;
                    const nc = c + dc * i;
                    if (!inBounds(nr, nc)) break;

                    const target = board[nr][nc];
                    if (!target.piece) {
                        moves.push({ r: nr, c: nc });
                    } else {
                        if (target.color === enemy) moves.push({ r: nr, c: nc });
                        break;
                    }
                }
            }
            break;
        }

        // ---------------------------------------------------------
        // KNIGHT
        // ---------------------------------------------------------
        case "knight": {
            const jumps = [
                [1,2],[2,1],[-1,2],[-2,1],
                [1,-2],[2,-1],[-1,-2],[-2,-1]
            ];
            for (const [dr, dc] of jumps) {
                add(r + dr, c + dc);
            }
            break;
        }

        // ---------------------------------------------------------
        // BISHOP
        // ---------------------------------------------------------
        case "bishop": {
            for (const [dr, dc] of [[1,1],[1,-1],[-1,1],[-1,-1]]) {
                for (let i = 1; i < 8; i++) {
                    const nr = r + dr * i;
                    const nc = c + dc * i;
                    if (!inBounds(nr, nc)) break;

                    const target = board[nr][nc];
                    if (!target.piece) {
                        moves.push({ r: nr, c: nc });
                    } else {
                        if (target.color === enemy) moves.push({ r: nr, c: nc });
                        break;
                    }
                }
            }
            break;
        }

        // ---------------------------------------------------------
        // QUEEN
        // ---------------------------------------------------------
        case "queen": {
            // Rook‑Moves
            const rookDirs = [[1,0],[-1,0],[0,1],[0,-1]];

