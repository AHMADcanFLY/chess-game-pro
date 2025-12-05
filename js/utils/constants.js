// Game Constants
const COLORS = {
    WHITE: 'white',
    BLACK: 'black'
};

const PIECE_TYPES = {
    PAWN: 'pawn',
    ROOK: 'rook',
    KNIGHT: 'knight',
    BISHOP: 'bishop',
    QUEEN: 'queen',
    KING: 'king'
};

const PIECE_SYMBOLS = {
    white: {
        pawn: '♙',
        rook: '♖',
        knight: '♘',
        bishop: '♗',
        queen: '♕',
        king: '♔'
    },
    black: {
        pawn: '♟',
        rook: '♜',
        knight: '♞',
        bishop: '♝',
        queen: '♛',
        king: '♚'
    }
};

const PIECE_VALUES = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 1000
};

const INITIAL_BOARD_SETUP = [
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
];

const GAME_STATUS = {
    IN_PROGRESS: 'Game in Progress',
    CHECK: 'Check!',
    CHECKMATE: 'Checkmate!',
    STALEMATE: 'Stalemate - Draw',
    DRAW: 'Draw'
};

// Helper Functions
function isValidPosition(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function positionToNotation(row, col) {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return files[col] + (8 - row);
}

function notationToPosition(notation) {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const col = files.indexOf(notation[0]);
    const row = 8 - parseInt(notation[1]);
    return { row, col };
}