// JS/ui/resize.js
// ================================================================
// RESIZE SYSTEM · ANIME FULL EDITION
// ================================================================

export function resizeCanvases(atmoCanvas, chessCanvas) {
    if (!atmoCanvas || !chessCanvas) return;

    // Canvas bekommt echte Pixelgröße
    atmoCanvas.width  = atmoCanvas.clientWidth;
    atmoCanvas.height = atmoCanvas.clientHeight;

    chessCanvas.width  = chessCanvas.clientWidth;
    chessCanvas.height = chessCanvas.clientHeight;
}

// Optional: automatische Verbindung
export function bindResize(atmoCanvas, chessCanvas) {
    resizeCanvases(atmoCanvas, chessCanvas);

    window.addEventListener("resize", () => {
        resizeCanvases(atmoCanvas, chessCanvas);
    });
}

