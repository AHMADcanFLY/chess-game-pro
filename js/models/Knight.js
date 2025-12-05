// Knight Class
class Knight extends Piece {
    constructor(color, row, col) {
        super(color, PIECE_TYPES.KNIGHT, row, col);
    }

    getLegalMoves(board) {
        const moves = [];
        const knightMoves = [
            { row: -2, col: -1 }, { row: -2, col: 1 },
            { row: -1, col: -2 }, { row: -1, col: 2 },
            { row: 1, col: -2 },  { row: 1, col: 2 },
            { row: 2, col: -1 },  { row: 2, col: 1 }
        ];

        for (const move of knightMoves) {
            const newRow = this.row + move.row;
            const newCol = this.col + move.col;

            if (isValidPosition(newRow, newCol)) {
                const targetPiece = board[newRow][newCol];
                
                if (!targetPiece || this.isOpponent(targetPiece)) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }

        return moves;
    }
}