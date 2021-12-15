"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./index.css");
function Square(props) {
    return (react_1.default.createElement("button", { className: "square", onClick: props.onClick }, props.value));
}
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Board.prototype.renderSquare = function (i) {
        var _this = this;
        return (react_1.default.createElement(Square, { value: this.props.squares[i], onClick: function () { return _this.props.onClick(i); } }));
    };
    Board.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "board-row" },
                this.renderSquare(0),
                this.renderSquare(1),
                this.renderSquare(2)),
            react_1.default.createElement("div", { className: "board-row" },
                this.renderSquare(3),
                this.renderSquare(4),
                this.renderSquare(5)),
            react_1.default.createElement("div", { className: "board-row" },
                this.renderSquare(6),
                this.renderSquare(7),
                this.renderSquare(8))));
    };
    return Board;
}(react_1.default.Component));
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
        return _this;
    }
    Game.prototype.handleClick = function (i) {
        var history = this.state.history.slice(0, this.state.stepNumber + 1);
        var current = history[history.length - 1];
        var squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    };
    Game.prototype.jumpTo = function (step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    };
    Game.prototype.render = function () {
        var _this = this;
        var history = this.state.history;
        var current = history[this.state.stepNumber];
        var winner = calculateWinner(current.squares);
        var moves = history.map(function (_, move) {
            var desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (react_1.default.createElement("li", { key: move },
                react_1.default.createElement("button", { onClick: function () { return _this.jumpTo(move); } }, desc)));
        });
        var status;
        if (winner) {
            status = "Winner: " + winner;
        }
        else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        return (react_1.default.createElement("div", { className: "game" },
            react_1.default.createElement("div", { className: "game-board" },
                react_1.default.createElement(Board, { squares: current.squares, onClick: function (i) { return _this.handleClick(i); } })),
            react_1.default.createElement("div", { className: "game-info" },
                react_1.default.createElement("div", null, status),
                react_1.default.createElement("ol", null, moves))));
    };
    return Game;
}(react_1.default.Component));
var pluginTicTacToe = function () { return ((react_1.default.createElement(Game, null))); };
// ========================================
function calculateWinner(squares) {
    var lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var i = 0; i < lines.length; i++) {
        var _a = lines[i], a = _a[0], b = _a[1], c = _a[2];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
exports.default = pluginTicTacToe;
