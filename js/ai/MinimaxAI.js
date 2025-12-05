// Minimax AI with Alpha-Beta Pruning
class MinimaxAI {
    constructor(boardManager, rulesManager) {
        this.boardManager = boardManager;
        this.rulesManager = rulesManager;
    }

    getBestMove(color, depth = 2) {
        let bestMove = null;
        let bestValue = -Infinity;
        const alpha = -Infinity;
        const beta = Infinity;

        const pieces = this.boardManager.getAllPieces(color);

        for (const { piece } of pieces) {
            const validMoves = this.rulesManager.getValidMoves(piece);

            for (const move of validMoves) {
                // Simulate move
                const originalBoard = this.boardManager.board;
                const simulatedBoard = this.boardManager.cloneBoard();
                this.boardManager.board = simulatedBoard;

                const fromRow = piece.row;
                const fromCol = piece.col;
                const toRow = move.row;
                const toCol = move.col;

                const capturedPiece = simulatedBoard[toRow][toCol];
                simulatedBoard[toRow][toCol] = simulatedBoard[fromRow][fromCol];
                simulatedBoard[fromRow][fromCol] = null;

                if (simulatedBoard[toRow][toCol]) {
                    simulatedBoard[toRow][toCol].row = toRow;
                    simulatedBoard[toRow][toCol].col = toCol;
                }

                // Evaluate position
                const value = this.minimax(depth - 1, false, color, alpha, beta);

                // Restore board
                this.boardManager.board = originalBoard;

                if (value > bestValue) {
                    bestValue = value;
                    bestMove = {
                        from: { row: fromRow, col: fromCol },
                        to: { row: toRow, col: toCol },
                        value: value
                    };
                }
            }
        }

        return bestMove;
    }

    minimax(depth, isMaximizing, aiColor, alpha, beta) {
        if (depth === 0) {
            return this.evaluateBoard(aiColor);
        }

        const currentColor = isMaximizing ? aiColor : 
                           (aiColor === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE);

        // Check for game over
        if (this.rulesManager.isCheckmate(currentColor)) {
            return isMaximizing ? -10000 : 10000;
        }

        if (this.rulesManager.isStalemate(currentColor)) {
            return 0;
        }

        const pieces = this.boardManager.getAllPieces(currentColor);

        if (isMaximizing) {
            let maxEval = -Infinity;

            for (const { piece } of pieces) {
                const validMoves = this.rulesManager.getValidMoves(piece);

                for (const move of validMoves) {
                    const originalBoard = this.boardManager.board;
                    const simulatedBoard = this.boardManager.cloneBoard();
                    this.boardManager.board = simulatedBoard;

                    const fromRow = piece.row;
                    const fromCol = piece.col;

                    simulatedBoard[move.row][move.col] = simulatedBoard[fromRow][fromCol];
                    simulatedBoard[fromRow][fromCol] = null;

                    if (simulatedBoard[move.row][move.col]) {
                        simulatedBoard[move.row][move.col].row = move.row;
                        simulatedBoard[move.row][move.col].col = move.col;
                    }

                    const evaluation = this.minimax(depth - 1, false, aiColor, alpha, beta);
                    
                    this.boardManager.board = originalBoard;

                    maxEval = Math.max(maxEval, evaluation);
                    alpha = Math.max(alpha, evaluation);

                    if (beta <= alpha) {
                        break; // Beta cutoff
                    }
                }
            }

            return maxEval;
        } else {
            let minEval = Infinity;

            for (const { piece } of pieces) {
                const validMoves = this.rulesManager.getValidMoves(piece);

                for (const move of validMoves) {
                    const originalBoard = this.boardManager.board;
                    const simulatedBoard = this.boardManager.cloneBoard();
                    this.boardManager.board = simulatedBoard;

                    const fromRow = piece.row;
                    const fromCol = piece.col;

                    simulatedBoard[move.row][move.col] = simulatedBoard[fromRow][fromCol];
                    simulatedBoard[fromRow][fromCol] = null;

                    if (simulatedBoard[move.row][move.col]) {
                        simulatedBoard[move.row][move.col].row = move.row;
                        simulatedBoard[move.row][move.col].col = move.col;
                    }

                    const evaluation = this.minimax(depth - 1, true, aiColor, alpha, beta);
                    
                    this.boardManager.board = originalBoard;

                    minEval = Math.min(minEval, evaluation);
                    beta = Math.min(beta, evaluation);

                    if (beta <= alpha) {
                        break; // Alpha cutoff
                    }
                }
            }

            return minEval;
        }
    }

    evaluateBoard(aiColor) {
        let score = 0;

        // Material evaluation
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.boardManager.board[row][col];
                if (piece) {
                    const value = piece.getValue();
                    const positionBonus = this.getPositionBonus(piece, row, col);
                    
                    if (piece.color === aiColor) {
                        score += value + positionBonus;
                    } else {
                        score -= value + positionBonus;
                    }
                }
            }
        }

        // Mobility bonus
        const aiMoves = this.countMoves(aiColor);
        const opponentColor = aiColor === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
        const opponentMoves = this.countMoves(opponentColor);
        score += (aiMoves - opponentMoves) * 0.1;

        return score;
    }

    getPositionBonus(piece, row, col) {
        // Center control bonus
        const centerBonus = [[0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 1, 1, 1, 1, 0, 0],
                            [0, 0, 1, 2, 2, 1, 0, 0],
                            [0, 0, 1, 2, 2, 1, 0, 0],
                            [0, 0, 1, 1, 1, 1, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0, 0, 0, 0]];

        return centerBonus[row][col] * 0.1;
    }

    countMoves(color) {
        const pieces = this.boardManager.getAllPieces(color);
        let count = 0;

        for (const { piece } of pieces) {
            count += this.rulesManager.getValidMoves(piece).length;
        }

        return count;
    }
}