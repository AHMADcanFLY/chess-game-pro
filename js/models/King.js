// King Class
class King extends Piece {
    constructor(color, row, col) {
        super(color, PIECE_TYPES.KING, row, col);
    }

    getLegalMoves(board) {
        const moves = [];
        const directions = [
            { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
            { row: 0, col: -1 },                        { row: 0, col: 1 },
            { row: 1, col: -1 },  { row: 1, col: 0 },  { row: 1, col: 1 }
        ];

        for (const dir of directions) {
            const newRow = this.row + dir.row;
            const newCol = this.col + dir.col;

            if (isValidPosition(newRow, newCol)) {
                const targetPiece = board[newRow][newCol];
                
                if (!targetPiece || this.isOpponent(targetPiece)) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }

        // TODO: Castling (advanced feature)

        return moves;
    }
}