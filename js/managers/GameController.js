// Game Controller - Main game logic and flow
class GameController {
    constructor() {
        this.boardManager = new BoardManager();
        this.rulesManager = new RulesManager(this.boardManager);
        this.moveHistory = new LinkedList();
        this.undoStack = new Stack();
        this.redoStack = new Stack();
        this.currentTurn = COLORS.WHITE;
        this.selectedPiece = null;
        this.selectedSquare = null;
        this.validMoves = [];
        this.gameOver = false;
        this.aiEnabled = false;
        this.aiDifficulty = 2;
        this.ai = null;
    }

    initialize() {
        this.boardManager.initializeBoard();
        this.currentTurn = COLORS.WHITE;
        this.selectedPiece = null;
        this.selectedSquare = null;
        this.validMoves = [];
        this.gameOver = false;
        this.moveHistory.clear();
        this.undoStack.clear();
        this.redoStack.clear();
        this.updateUI();
    }

    handleSquareClick(row, col) {
        if (this.gameOver) return;

        // If AI is enabled and it's black's turn, don't allow manual moves
        if (this.aiEnabled && this.currentTurn === COLORS.BLACK) return;

        const clickedPiece = this.boardManager.getPiece(row, col);

        // If a piece is already selected
        if (this.selectedPiece) {
            // Check if clicked square is a valid move
            const isValidMove = this.validMoves.some(
                move => move.row === row && move.col === col
            );

            if (isValidMove) {
                this.makeMove(this.selectedPiece.row, this.selectedPiece.col, row, col);
                this.clearSelection();
                return;
            }

            // If clicking on own piece, select it instead
            if (clickedPiece && clickedPiece.color === this.currentTurn) {
                this.selectPiece(row, col, clickedPiece);
                return;
            }

            // Otherwise, clear selection
            this.clearSelection();
            return;
        }

        // Select piece if it belongs to current player
        if (clickedPiece && clickedPiece.color === this.currentTurn) {
            this.selectPiece(row, col, clickedPiece);
        }
    }

    selectPiece(row, col, piece) {
        this.selectedPiece = piece;
        this.selectedSquare = { row, col };
        this.validMoves = this.rulesManager.getValidMoves(piece);
        this.highlightSquares();
    }

    clearSelection() {
        this.selectedPiece = null;
        this.selectedSquare = null;
        this.validMoves = [];
        this.updateUI();
    }

    makeMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.boardManager.getPiece(fromRow, fromCol);
        const capturedPiece = this.boardManager.movePiece(fromRow, fromCol, toRow, toCol);

        // Save move for undo
        const moveData = {
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol },
            piece: piece,
            capturedPiece: capturedPiece,
            boardState: this.boardManager.cloneBoard()
        };
        this.undoStack.push(moveData);
        this.redoStack.clear();

        // Add to move history
        const moveNotation = this.getMoveNotation(piece, fromRow, fromCol, toRow, toCol, capturedPiece);
        this.moveHistory.append({
            turn: this.moveHistory.getSize() + 1,
            color: this.currentTurn,
            notation: moveNotation,
            from: positionToNotation(fromRow, fromCol),
            to: positionToNotation(toRow, toCol)
        });

        // Check for pawn promotion
        if (piece.type === PIECE_TYPES.PAWN) {
            if ((piece.color === COLORS.WHITE && toRow === 0) ||
                (piece.color === COLORS.BLACK && toRow === 7)) {
                this.promotePawn(toRow, toCol);
            }
        }

        // Switch turns
        this.switchTurn();
        this.updateUI();

        // Check game status
        const status = this.rulesManager.getGameStatus(this.currentTurn);
        if (status.gameOver) {
            this.endGame(status);
        } else if (this.aiEnabled && this.currentTurn === COLORS.BLACK) {
            // AI makes move after a short delay
            setTimeout(() => this.makeAIMove(), 500);
        }
    }

    promotePawn(row, col) {
        // Auto-promote to Queen for now
        // TODO: Add UI for piece selection
        const piece = this.boardManager.getPiece(row, col);
        const newQueen = new Queen(piece.color, row, col);
        newQueen.hasMoved = true;
        this.boardManager.setPiece(row, col, newQueen);
    }

    getMoveNotation(piece, fromRow, fromCol, toRow, toCol, captured) {
        const pieceSymbol = piece.type === PIECE_TYPES.PAWN ? '' : 
                          piece.type.charAt(0).toUpperCase();
        const captureSymbol = captured ? 'x' : '';
        const destination = positionToNotation(toRow, toCol);
        return `${pieceSymbol}${captureSymbol}${destination}`;
    }

    switchTurn() {
        this.currentTurn = this.currentTurn === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
    }

    undo() {
        if (this.undoStack.isEmpty() || this.gameOver) return;

        const moveData = this.undoStack.pop();
        this.redoStack.push(moveData);

        // Restore board state
        this.boardManager.board = moveData.boardState;
        
        // Restore captured pieces
        if (moveData.capturedPiece) {
            const capturedArray = this.boardManager.capturedPieces[moveData.capturedPiece.color];
            const index = capturedArray.indexOf(moveData.capturedPiece);
            if (index > -1) {
                capturedArray.splice(index, 1);
            }
        }

        this.switchTurn();
        this.clearSelection();
        this.updateUI();
    }

    redo() {
        if (this.redoStack.isEmpty() || this.gameOver) return;

        const moveData = this.redoStack.pop();
        this.makeMove(moveData.from.row, moveData.from.col, moveData.to.row, moveData.to.col);
    }

    makeAIMove() {
        if (!this.ai) {
            this.ai = new MinimaxAI(this.boardManager, this.rulesManager);
        }

        const bestMove = this.ai.getBestMove(this.currentTurn, this.aiDifficulty);
        
        if (bestMove) {
            this.makeMove(bestMove.from.row, bestMove.from.col, bestMove.to.row, bestMove.to.col);
        }
    }

    highlightSquares() {
        this.updateUI();
        
        // Highlight selected square
        if (this.selectedSquare) {
            const selectedElement = document.querySelector(
                `[data-row="${this.selectedSquare.row}"][data-col="${this.selectedSquare.col}"]`
            );
            if (selectedElement) {
                selectedElement.classList.add('selected');
            }
        }

        // Highlight valid moves
        for (const move of this.validMoves) {
            const square = document.querySelector(
                `[data-row="${move.row}"][data-col="${move.col}"]`
            );
            if (square) {
                square.classList.add('legal-move');
            }
        }

        // Highlight king if in check
        if (this.rulesManager.isKingInCheck(this.currentTurn)) {
            const kingPos = this.boardManager.findKing(this.currentTurn);
            if (kingPos) {
                const kingSquare = document.querySelector(
                    `[data-row="${kingPos.row}"][data-col="${kingPos.col}"]`
                );
                if (kingSquare) {
                    kingSquare.classList.add('in-check');
                }
            }
        }
    }

    endGame(status) {
        this.gameOver = true;
        const statusText = status.winner ? 
            `${status.status} - ${status.winner} Wins!` : 
            status.status;
        
        document.getElementById('game-status').textContent = statusText;
        alert(statusText);
    }

    updateUI() {
        // Render board
        const boardElement = document.getElementById('chess-board');
        this.boardManager.renderBoard(boardElement);

        // Update turn indicator
        const turnElement = document.getElementById('current-turn');
        turnElement.textContent = `${this.currentTurn.charAt(0).toUpperCase() + this.currentTurn.slice(1)}'s Turn`;

        // Update game status
        const status = this.rulesManager.getGameStatus(this.currentTurn);
        document.getElementById('game-status').textContent = status.status;

        // Render captured pieces
        this.boardManager.renderCapturedPieces();

        // Render move history
        this.renderMoveHistory();

        // Update button states
        document.getElementById('undo-btn').disabled = this.undoStack.isEmpty();
        document.getElementById('redo-btn').disabled = this.redoStack.isEmpty();
    }

    renderMoveHistory() {
        const moveListElement = document.getElementById('move-list');
        const moves = this.moveHistory.toArray();
        
        let html = '';
        for (let i = 0; i < moves.length; i += 2) {
            const moveNumber = Math.floor(i / 2) + 1;
            const whiteMove = moves[i];
            const blackMove = moves[i + 1];

            html += `
                <div class="move-item">
                    <span class="move-number">${moveNumber}.</span>
                    <span class="move-white">${whiteMove.notation}</span>
                    <span class="move-black">${blackMove ? blackMove.notation : ''}</span>
                </div>
            `;
        }

        moveListElement.innerHTML = html;
        moveListElement.scrollTop = moveListElement.scrollHeight;
    }
}