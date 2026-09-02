// JS/chess/board.js
// ================================================================
// CHESS BOARD RENDERER · ANIME FULL EDITION
// ================================================================

export let board = [];
export let animations = [];

// -------------------------------------------------------------
// INITIALISIERUNG DES SCHACHBRETTS
// -------------------------------------------------------------
export function initBoard(canvas) {
    board = [];

    for (let r = 0; r < 8; r++) {
        board[r] = [];
        for (let c = 0; c < 8; c++) {
            board[r][c] = {
                piece: null,
                type: null,
                color: null
            };
        }
    }

    // Standard‑Startposition
    const back = ["rook","knight","bishop","queen","king","bishop","knight","rook"];

    for (let c = 0; c < 8; c++) {
        board[0][c] = { piece:"♜", type:"rook",   color:"black" };
        board[1][c] = { piece:"♟", type:"pawn",   color:"black" };
        board[6][c] = { piece:"♙", type:"pawn",   color:"white" };
        board[7][c] = { piece:"♖", type:"rook",   color:"white" };
    }

    board[0][1].type = "knight"; board[0][1].piece = "♞";
    board[0][6].type = "knight"; board[0][6].piece = "♞";
    board[7][1].type = "knight"; board[7][1].piece = "♘";
    board[7][6].type = "knight"; board[7][6].piece = "♘";

    board[0][2].type = "bishop"; board[0][2].piece = "♝";
    board[0][5].type = "bishop"; board[0][5].piece = "♝";
    board[7][2].type = "bishop"; board[7][2].piece = "♗";
    board[7][5].type = "bishop"; board[7][5].piece = "♗";

    board[0][3].type = "queen"; board[0][3].piece = "♛";
    board[7][3].type = "queen"; board[7][3].piece = "♕";

    board[0][4].type = "king"; board[0][4].piece = "♚";
    board[7][4].type = "king"; board[7][4].piece = "♔";

    renderBoard(canvas);
}

// -------------------------------------------------------------
// RENDER DES SCHACHBRETTS
// -------------------------------------------------------------
export function renderBoard(canvas) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const cs = w / 8;

    ctx.clearRect(0, 0, w, w);

    // Felder
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            ctx.fillStyle = (r + c) % 2 === 0 ? "#eee" : "#444";
            ctx.fillRect(c * cs, r * cs, cs, cs);
        }
    }

    // Figuren
    ctx.font = `${cs * 0.7}px 'Segoe UI Symbol'`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const p = board[r][c];
            if (!p || !p.piece) continue;

            ctx.fillStyle = p.color === "white" ? "#fff" : "#111";
            ctx.fillText(p.piece, c * cs + cs / 2, r * cs + cs / 2);
        }
    }
}

// -------------------------------------------------------------
// ANIMATION EINES ZUGES
// -------------------------------------------------------------
export function animateMove(from, to, piece, callback) {
    animations.push
