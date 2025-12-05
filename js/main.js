// Main Application Entry Point
let game;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Chess Game Pro - Initializing...');
    
    // Initialize game
    game = new GameController();
    game.initialize();

    // Setup event listeners
    setupEventListeners();

    console.log('Chess Game Pro - Ready!');
});

function setupEventListeners() {
    // Board click handler
    const boardElement = document.getElementById('chess-board');
    boardElement.addEventListener('click', (e) => {
        const square = e.target.closest('.square');
        if (square) {
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            game.handleSquareClick(row, col);
        }
    });

    // New Game button
    document.getElementById('new-game-btn').addEventListener('click', () => {
        if (confirm('Start a new game? Current game will be lost.')) {
            game.initialize();
        }
    });

    // Undo button
    document.getElementById('undo-btn').addEventListener('click', () => {
        game.undo();
    });

    // Redo button
    document.getElementById('redo-btn').addEventListener('click', () => {
        game.redo();
    });

    // Flip Board button
    document.getElementById('flip-board-btn').addEventListener('click', () => {
        game.boardManager.flipBoard();
        game.updateUI();
        if (game.selectedPiece) {
            game.highlightSquares();
        }
    });

    // AI Enable checkbox
    document.getElementById('ai-enabled').addEventListener('change', (e) => {
        game.aiEnabled = e.target.checked;
        
        if (game.aiEnabled && game.currentTurn === COLORS.BLACK && !game.gameOver) {
            setTimeout(() => game.makeAIMove(), 500);
        }
    });

    // AI Difficulty selector
    document.getElementById('ai-difficulty').addEventListener('change', (e) => {
        game.aiDifficulty = parseInt(e.target.value);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'z':
                    e.preventDefault();
                    game.undo();
                    break;
                case 'y':
                    e.preventDefault();
                    game.redo();
                    break;
                case 'n':
                    e.preventDefault();
                    if (confirm('Start a new game?')) {
                        game.initialize();
                    }
                    break;
            }
        }

        // Escape to clear selection
        if (e.key === 'Escape') {
            game.clearSelection();
        }
    });
}

// Debug helpers (accessible from console)
window.debugGame = {
    getBoard: () => game.boardManager.board,
    getCurrentTurn: () => game.currentTurn,
    getMoveHistory: () => game.moveHistory.toArray(),
    isCheck: () => game.rulesManager.isKingInCheck(game.currentTurn),
    getValidMoves: (row, col) => {
        const piece = game.boardManager.getPiece(row, col);
        return piece ? game.rulesManager.getValidMoves(piece) : [];
    }
};