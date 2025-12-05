// Pawn Class
class Pawn extends Piece {
    constructor(color, row, col) {
        super(color, PIECE_TYPES.PAWN, row, col);
    }

    getLegalMoves(board) {
        const moves = [];
        const direction = this.color === COLORS.WHITE ? -1 : 1;
        const startRow = this.color === COLORS.WHITE ? 6 : 1;

        // Forward move (1 square)
        const newRow = this.row + direction;
        if (isValidPosition(newRow, this.col) && !board[newRow][this.col]) {
            moves.push({ row: newRow, col: this.col });

            // Forward move (2 squares from starting position)
            if (this.row === startRow) {
                const doubleRow = this.row + (2 * direction);
                if (!board[doubleRow][this.col]) {
                    moves.push({ row: doubleRow, col: this.col });
                }
            }
        }

        // Diagonal captures
        const capturePositions = [
            { row: newRow, col: this.col - 1 },
            { row: newRow, col: this.col + 1 }
        ];

        for (const pos of capturePositions) {
            if (isValidPosition(pos.row, pos.col)) {
                const targetPiece = board[pos.row][pos.col];
                if (targetPiece && this.isOpponent(targetPiece)) {
                    moves.push(pos);
                }
            }
        }

        // TODO: En passant (advanced feature)

        return moves;
    }
}