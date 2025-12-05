// Rules Manager - Handles game rules and validation
class RulesManager {
    constructor(boardManager) {
        this.boardManager = boardManager;
    }

    isSquareUnderAttack(row, col, byColor) {
        const pieces = this.boardManager.getAllPieces(byColor);
        
        for (const { piece } of pieces) {
            const moves = piece.getLegalMoves(this.boardManager.board);
            if (moves.some(move => move.row === row && move.col === col)) {
                return true;
            }
        }
        
        return false;
    }

    isKingInCheck(color) {
        const kingPos = this.boardManager.findKing(color);
        if (!kingPos) return false;

        const opponentColor = color === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
        return this.isSquareUnderAttack(kingPos.row, kingPos.col, opponentColor);
    }

    wouldMoveResultInCheck(fromRow, fromCol, toRow, toCol, color) {
        // Simulate the move
        const originalBoard = this.boardManager.board;
        const simulatedBoard = this.boardManager.cloneBoard();
        this.boardManager.board = simulatedBoard;

        const piece = simulatedBoard[fromRow][fromCol];
        const capturedPiece = simulatedBoard[toRow][toCol];
        
        simulatedBoard[toRow][toCol] = piece;
        simulatedBoard[fromRow][fromCol] = null;
        
        if (piece) {
            piece.row = toRow;
            piece.col = toCol;
        }

        const inCheck = this.isKingInCheck(color);

        // Restore original board
        this.boardManager.board = originalBoard;

        return inCheck;
    }

    getValidMoves(piece) {
        const legalMoves = piece.getLegalMoves(this.boardManager.board);
        const validMoves = [];

        for (const move of legalMoves) {
            if (!this.wouldMoveResultInCheck(piece.row, piece.col, move.row, move.col, piece.color)) {
                validMoves.push(move);
            }
        }

        return validMoves;
    }

    hasAnyValidMoves(color) {
        const pieces = this.boardManager.getAllPieces(color);
        
        for (const { piece } of pieces) {
            const validMoves = this.getValidMoves(piece);
            if (validMoves.length > 0) {
                return true;
            }
        }
        
        return false;
    }

    isCheckmate(color) {
        return this.isKingInCheck(color) && !this.hasAnyValidMoves(color);
    }

    isStalemate(color) {
        return !this.isKingInCheck(color) && !this.hasAnyValidMoves(color);
    }

    getGameStatus(currentColor) {
        if (this.isCheckmate(currentColor)) {
            const winner = currentColor === COLORS.WHITE ? 'Black' : 'White';
            return { status: GAME_STATUS.CHECKMATE, winner, gameOver: true };
        }

        if (this.isStalemate(currentColor)) {
            return { status: GAME_STATUS.STALEMATE, winner: null, gameOver: true };
        }

        if (this.isKingInCheck(currentColor)) {
            return { status: GAME_STATUS.CHECK, winner: null, gameOver: false };
        }

        return { status: GAME_STATUS.IN_PROGRESS, winner: null, gameOver: false };
    }
}