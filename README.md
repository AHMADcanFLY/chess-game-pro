# ♔ Chess Game Pro ♚

A professional, feature-rich web-based chess game built with vanilla JavaScript, HTML5, and CSS3. Play against a friend or challenge the AI with multiple difficulty levels!

![Chess Game Pro](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)

## 🎮 Live Demo

**[Play Now](https://ahmadcanfly.github.io/chess-game-pro/)** (GitHub Pages)

## ✨ Features

### 🎯 Core Gameplay
- **Full Chess Rules Implementation**
  - All piece movements (Pawn, Rook, Knight, Bishop, Queen, King)
  - Check, Checkmate, and Stalemate detection
  - Pawn promotion (auto-promotes to Queen)
  - Turn-based gameplay with visual indicators

### 🎨 User Interface
- **Beautiful 8×8 Chessboard** with classic light/dark squares
- **Interactive Piece Movement** with drag-and-drop feel
- **Visual Highlights**:
  - Selected piece highlighting
  - Legal move indicators
  - Check warning (red highlight on King)
  - Capture move indicators

### 🧠 AI Opponent
- **Minimax Algorithm** with Alpha-Beta Pruning
- **4 Difficulty Levels**:
  - Easy (Depth 1)
  - Medium (Depth 2)
  - Hard (Depth 3)
  - Expert (Depth 4)
- Smart position evaluation and move prediction

### 📊 Game Features
- **Move History** - Complete game record with algebraic notation
- **Undo/Redo** - Using Stack data structure
- **Captured Pieces Display** - Track captured pieces for both sides
- **Flip Board** - View from Black's perspective
- **Keyboard Shortcuts**:
  - `Ctrl+Z` / `Cmd+Z` - Undo
  - `Ctrl+Y` / `Cmd+Y` - Redo
  - `Ctrl+N` / `Cmd+N` - New Game
  - `Escape` - Clear selection

### 🏗️ Technical Architecture
- **Object-Oriented Design** with clean class hierarchy
- **Data Structures**:
  - Stack (Undo/Redo functionality)
  - Linked List (Move history)
- **Modular Code Structure**:
  - Piece Classes (inheritance-based)
  - Board Manager
  - Rules Manager
  - Game Controller
  - AI Module

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/AHMADcanFLY/chess-game-pro.git
   cd chess-game-pro
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   start index.html
   # or double-click index.html
   ```

3. **Start playing!**
   - Click on a piece to select it
   - Click on a highlighted square to move
   - Enable AI to play against the computer

## 📁 Project Structure

```
chess-game-pro/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # All styles
├── js/
│   ├── utils/
│   │   ├── constants.js   # Game constants
│   │   ├── Stack.js       # Stack data structure
│   │   └── LinkedList.js  # Linked list data structure
│   ├── models/
│   │   ├── Piece.js       # Base piece class
│   │   ├── Pawn.js        # Pawn implementation
│   │   ├── Rook.js        # Rook implementation
│   │   ├── Knight.js      # Knight implementation
│   │   ├── Bishop.js      # Bishop implementation
│   │   ├── Queen.js       # Queen implementation
│   │   └── King.js        # King implementation
│   ├── managers/
│   │   ├── BoardManager.js    # Board state management
│   │   ├── RulesManager.js    # Game rules validation
│   │   └── GameController.js  # Main game logic
│   ├── ai/
│   │   └── MinimaxAI.js   # AI implementation
│   └── main.js            # Application entry point
└── README.md              # This file
```

## 🎓 How to Play

### Basic Rules
1. **White moves first**
2. **Click a piece** to see its legal moves (green highlights)
3. **Click a highlighted square** to move
4. **Capture opponent pieces** by moving to their square
5. **Protect your King** - you cannot make moves that put your King in check
6. **Win by Checkmate** - trap the opponent's King

### Piece Movements
- **Pawn** ♙: Moves forward 1 square (2 on first move), captures diagonally
- **Rook** ♖: Moves horizontally or vertically any distance
- **Knight** ♘: Moves in L-shape (2+1 squares)
- **Bishop** ♗: Moves diagonally any distance
- **Queen** ♕: Combines Rook + Bishop movement
- **King** ♔: Moves 1 square in any direction

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic structure
- **CSS3** - Grid layout, animations, responsive design
- **JavaScript (ES6+)** - Game logic, OOP, data structures

### Key Algorithms
1. **Minimax with Alpha-Beta Pruning**
   - Evaluates game tree to find best moves
   - Prunes unnecessary branches for performance
   - Depth-based difficulty scaling

2. **Move Validation**
   - Checks piece-specific legal moves
   - Validates moves don't result in self-check
   - Detects check, checkmate, stalemate

3. **Board Evaluation**
   - Material counting (piece values)
   - Position bonuses (center control)
   - Mobility scoring

### Data Structures
- **Stack**: LIFO structure for undo/redo
- **Linked List**: Sequential move history storage
- **2D Array**: Board state representation

## 🎯 Future Enhancements

### Planned Features
- [ ] **Castling** - King and Rook special move
- [ ] **En Passant** - Special pawn capture
- [ ] **Pawn Promotion UI** - Choose promotion piece
- [ ] **Timer/Clock** - Timed games
- [ ] **Sound Effects** - Move and capture sounds
- [ ] **Themes** - Multiple board/piece themes
- [ ] **Save/Load Games** - LocalStorage persistence
- [ ] **Multiplayer** - Online play with WebSockets
- [ ] **Game Analysis** - Move suggestions and mistakes
- [ ] **Opening Book** - Common chess openings database
- [ ] **Puzzle Mode** - Chess puzzles for practice

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see below:

```
MIT License

Copyright (c) 2025 Muhammad Ahmed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👨‍💻 Author

**Muhammad Ahmed**
- GitHub: [@AHMADcanFLY](https://github.com/AHMADcanFLY)
- Email: glacierlevelmaterial1@gmail.com

## 🙏 Acknowledgments

- Chess piece Unicode symbols
- Minimax algorithm inspiration from chess programming community
- CSS Grid for responsive board layout

## 📊 Project Stats

- **Lines of Code**: ~2000+
- **Files**: 15
- **Classes**: 12
- **Data Structures**: 2 (Stack, Linked List)
- **Algorithms**: Minimax with Alpha-Beta Pruning

---

**Enjoy the game! ♟️**

If you like this project, please give it a ⭐ on GitHub!