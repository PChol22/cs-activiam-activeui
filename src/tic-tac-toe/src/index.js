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
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
require("./index.css");
function Square(props) {
    return (React.createElement("button", { className: "square", onClick: props.onClick }, props.value));
}
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Board.prototype.renderSquare = function (i) {
        var _this = this;
        return React.createElement(Square, { value: this.props.squares[i], onClick: function () { return _this.props.onClick(i); } });
    };
    Board.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "board-row" },
                this.renderSquare(0),
                this.renderSquare(1),
                this.renderSquare(2)),
            React.createElement("div", { className: "board-row" },
                this.renderSquare(3),
                this.renderSquare(4),
                this.renderSquare(5)),
            React.createElement("div", { className: "board-row" },
                this.renderSquare(6),
                this.renderSquare(7),
                this.renderSquare(8))));
    };
    return Board;
}(React.Component));
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            history: [{
                    squares: Array(9).fill(null)
                }],
            xIsNext: true,
            stepNumber: 0
        };
        return _this;
    }
    Game.prototype.jumpTo = function (step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    };
    Game.prototype.handleClick = function (i) {
        var history = this.state.history.slice(0, this.state.stepNumber + 1);
        var current = history[history.length - 1];
        var squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                    squares: squares
                }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    };
    Game.prototype.render = function () {
        var _this = this;
        var history = this.state.history;
        var current = history[this.state.stepNumber];
        var winner = calculateWinner(current.squares);
        var moves = history.map(function (step, move) {
            var desc = move ?
                'Revenir au tour n°' + move :
                'Revenir au début de la partie';
            return (React.createElement("li", { key: move },
                React.createElement("button", { onClick: function () { return _this.jumpTo(move); } }, desc)));
        });
        var status;
        if (winner) {
            status = winner + ' a gagné';
        }
        else {
            status = 'Prochain joueur : ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (React.createElement("div", { className: "game" },
            React.createElement("div", { className: "game-board" },
                React.createElement(Board, { squares: current.squares, onClick: function (i) { return _this.handleClick(i); } })),
            React.createElement("div", { className: "game-info" },
                React.createElement("div", null, status),
                React.createElement("ol", null, moves))));
    };
    return Game;
}(React.Component));
function calculateWinner(squares) {
    var lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (var i = 0; i < lines.length; i++) {
        var _a = lines[i], a = _a[0], b = _a[1], c = _a[2];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
exports["default"] = Game;
// ========================================
ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));
