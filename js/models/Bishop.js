// Bishop Class
class Bishop extends Piece {
    constructor(color, row, col) {
        super(color, PIECE_TYPES.BISHOP, row, col);
    }

    getLegalMoves(board) {
        const moves = [];
        const directions = [
            { row: -1, col: -1 },  // Up-Left
            { row: -1, col: 1 },   // Up-Right
            { row: 1, col: -1 },   // Down-Left
            { row: 1, col: 1 }     // Down-Right
        ];

        for (const dir of directions) {
            let newRow = this.row + dir.row;
            let newCol = this.col + dir.col;

            while (isValidPosition(newRow, newCol)) {
                const targetPiece = board[newRow][newCol];

                if (!targetPiece) {
                    // Empty square
                    moves.push({ row: newRow, col: newCol });
                } else if (this.isOpponent(targetPiece)) {
                    // Capture opponent
                    moves.push({ row: newRow, col: newCol });
                    break;
                } else {
                    // Blocked by same color
                    break;
                }

                newRow += dir.row;
                newCol += dir.col;
            }
        }

        return moves;
    }
}