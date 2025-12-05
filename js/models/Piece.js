// Base Piece Class
class Piece {
    constructor(color, type, row, col) {
        this.color = color;
        this.type = type;
        this.row = row;
        this.col = col;
        this.hasMoved = false;
    }

    getSymbol() {
        return PIECE_SYMBOLS[this.color][this.type];
    }

    getValue() {
        return PIECE_VALUES[this.type];
    }

    moveTo(row, col) {
        this.row = row;
        this.col = col;
        this.hasMoved = true;
    }

    // To be overridden by child classes
    getLegalMoves(board) {
        return [];
    }

    // Helper method to check if a square is occupied by opponent
    isOpponent(piece) {
        return piece && piece.color !== this.color;
    }

    // Helper method to check if a square is occupied by same color
    isSameColor(piece) {
        return piece && piece.color === this.color;
    }

    clone() {
        const cloned = new this.constructor(this.color, this.row, this.col);
        cloned.hasMoved = this.hasMoved;
        return cloned;
    }
}