// Board Manager - Handles board state and rendering
class BoardManager {
    constructor() {
        this.board = this.createEmptyBoard();
        this.capturedPieces = { white: [], black: [] };
        this.isFlipped = false;
    }

    createEmptyBoard() {
        return Array(8).fill(null).map(() => Array(8).fill(null));
    }

    initializeBoard() {
        this.board = this.createEmptyBoard();
        this.capturedPieces = { white: [], black: [] };

        // Setup black pieces (top)
        for (let col = 0; col < 8; col++) {
            const pieceType = INITIAL_BOARD_SETUP[0][col];
            this.board[0][col] = this.createPiece(pieceType, COLORS.BLACK, 0, col);
            this.board[1][col] = new Pawn(COLORS.BLACK, 1, col);
        }

        // Setup white pieces (bottom)
        for (let col = 0; col < 8; col++) {
            this.board[6][col] = new Pawn(COLORS.WHITE, 6, col);
            const pieceType = INITIAL_BOARD_SETUP[7][col];
            this.board[7][col] = this.createPiece(pieceType, COLORS.WHITE, 7, col);
        }
    }

    createPiece(type, color, row, col) {
        switch (type) {
            case PIECE_TYPES.PAWN: return new Pawn(color, row, col);
            case PIECE_TYPES.ROOK: return new Rook(color, row, col);
            case PIECE_TYPES.KNIGHT: return new Knight(color, row, col);
            case PIECE_TYPES.BISHOP: return new Bishop(color, row, col);
            case PIECE_TYPES.QUEEN: return new Queen(color, row, col);
            case PIECE_TYPES.KING: return new King(color, row, col);
            default: return null;
        }
    }

    getPiece(row, col) {
        return this.board[row][col];
    }

    setPiece(row, col, piece) {
        this.board[row][col] = piece;
        if (piece) {
            piece.row = row;
            piece.col = col;
        }
    }

    movePiece(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        const capturedPiece = this.board[toRow][toCol];

        if (capturedPiece) {
            this.capturedPieces[capturedPiece.color].push(capturedPiece);
        }

        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        if (piece) {
            piece.moveTo(toRow, toCol);
        }

        return capturedPiece;
    }

    findKing(color) {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.type === PIECE_TYPES.KING && piece.color === color) {
                    return { row, col, piece };
                }
            }
        }
        return null;
    }

    getAllPieces(color) {
        const pieces = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === color) {
                    pieces.push({ piece, row, col });
                }
            }
        }
        return pieces;
    }

    cloneBoard() {
        const cloned = this.createEmptyBoard();
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece) {
                    cloned[row][col] = piece.clone();
                }
            }
        }
        return cloned;
    }

    renderBoard(boardElement) {
        boardElement.innerHTML = '';
        
        const startRow = this.isFlipped ? 0 : 7;
        const endRow = this.isFlipped ? 8 : -1;
        const rowStep = this.isFlipped ? 1 : -1;
        
        const startCol = this.isFlipped ? 7 : 0;
        const endCol = this.isFlipped ? -1 : 8;
        const colStep = this.isFlipped ? -1 : 1;

        for (let row = startRow; row !== endRow; row += rowStep) {
            for (let col = startCol; col !== endCol; col += colStep) {
                const square = document.createElement('div');
                square.className = 'square';
                square.dataset.row = row;
                square.dataset.col = col;

                // Checkerboard pattern
                if ((row + col) % 2 === 0) {
                    square.classList.add('light');
                } else {
                    square.classList.add('dark');
                }

                const piece = this.board[row][col];
                if (piece) {
                    square.textContent = piece.getSymbol();
                    square.classList.add('has-piece');
                }

                boardElement.appendChild(square);
            }
        }
    }

    flipBoard() {
        this.isFlipped = !this.isFlipped;
    }

    renderCapturedPieces() {
        const whiteContainer = document.getElementById('captured-white');
        const blackContainer = document.getElementById('captured-black');

        whiteContainer.innerHTML = this.capturedPieces.white
            .map(p => `<span class="captured-piece">${p.getSymbol()}</span>`)
            .join('');

        blackContainer.innerHTML = this.capturedPieces.black
            .map(p => `<span class="captured-piece">${p.getSymbol()}</span>`)
            .join('');
    }
}