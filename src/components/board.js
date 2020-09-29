import React, { Component, useState } from "react";
import Row from "./row.js";

import player1 from "../images/avatar01.png";
import player2 from "../images/avatar02.png";

import {
  BOX_DESIGN,
  BUTTON_DESIGN,
  INPUT_TEXT,
  LABEL_TEXT,
  INPUT_SELECTOR,
  OPTION_INPUT_STYLE,
  OPTION_NAME_STYLE
} from "./screenDesign";
import {
  gameNumberOfGamesOptions,
  gameTurnsOptions,
  NUMBER_OF_GAMES,
  GAME_TURNS
} from "./two/ScreenTwoData";

const c4rows = 8;
const c4columns = 8;

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: null,
      board: [],
      gamep1: 1,
      gamep2: 1,
      count: 1,
      gameOver: false,
      content: null,
      congrats: null,
      player1Name: localStorage.getItem("player1"),
      player2Name: localStorage.getItem("player2"),
      numberOfGames: localStorage.getItem("numberOfGames"),
      turns: localStorage.getItem("turns")
    };

    this.play = this.play.bind(this);
  }

  initBoard() {
    let board = [];
    this.setState({ content: null });
    this.setState({ congrats: null });
    for (let r = 0; r < c4rows; r++) {
      let row = [];
      for (let c = 0; c < c4columns; c++) {
        row.push(null);
      }
      board.push(row);
    }
    console.log(this.state.player1Name);
    console.log(localStorage.getItem("player2"));
    console.log(localStorage.getItem("numberOfGames"));
    console.log(localStorage.getItem("turns"));

    this.setState({
      board,
      currentPlayer: this.state.player1,
      gameOver: false
    });
  }

  goToNextPage() {
    //TODO- need to send data to next page
    // alert("Takes time!!!");
    window.location.replace("/");
  }
  togglePlayer() {
    return this.state.currentPlayer === this.state.player1
      ? this.state.player2
      : this.state.player1;
  }

  play(c, rowIndex) {
    if (!this.state.gameOver) {
      let board = this.state.board;

      board[rowIndex][c] = this.state.currentPlayer;

      let result = this.checkAll(board);
      let nextPlayer = null;

      if (result === 1) {
        if (this.state.turns == "Always player 01") {
          this.setState({ player1: 1, player2: 2 });
          nextPlayer = this.state.player1Name;
          this.setState({ currentPlayer: nextPlayer });
        } else if (this.state.turns == "Always player 02") {
          this.setState({ player1: 2, player2: 1 });
          nextPlayer = this.state.player2Name;
          this.setState({ currentPlayer: nextPlayer });
        } else if (this.state.turns == "Alternate Turn") {
          if (this.state.player1 === 1) {
            this.setState({ player1: 2, player2: 1 });
            nextPlayer = this.state.player2Name;
          } else {
            this.setState({ player1: 1, player2: 2 });
            nextPlayer = this.state.player1Name;
          }
        }

        this.setState({ board, gameOver: true });
        this.setState({ board, gamep1: this.state.gamep1 + 1 });
        this.setState({ board, count: this.state.count + 1 });
        //this.setState({ board, content: 'Player 1 wins the match '+ this.state.count+1 });
        this.setState({ board, congrats: "Congratulation!" });
        //alert(this.state.count + nextPlayer);
        if (this.state.turns == "Loser first") {
          this.setState({ player1: 2, player2: 1 });
          nextPlayer = this.state.player2Name;
        } else if (this.state.turns == "winner first") {
          this.setState({ player1: 1, player2: 2 });
          nextPlayer = this.state.player1Name;
        }
        if (this.state.count === this.state.numberOfGames) {
          if (this.state.gamep1 > this.state.gamep2) {
            //alert('Player 1 wins the tournament!')
            this.setState({
              board,
              content: this.state.player1Name + "wins the tournament!"
            });
            alert(this.state.player1Name + "wins the tournament!");
            this.goToNextPage();
          } else if (this.state.gamep1 < this.state.gamep2) {
            this.setState({
              board,
              content: this.state.player2Name + "wins the tournament!"
            });
            alert(this.state.player2Name + "wins the tournament!");
            this.goToNextPage();
          }
        }
        //alert('Player 1 wins the match!' + this.state.count + this.state.gamep1)
        this.setState({
          board,
          content:
            this.state.player1Name +
            " wins the match " +
            this.state.count +
            ". " +
            nextPlayer +
            " will start the next game."
        });
      } else if (result === 2) {
        if (this.state.turns == "Always player 01") {
          this.setState({ player1: 1, player2: 2 });
          nextPlayer = this.state.player1Name;
          this.setState({ currentPlayer: nextPlayer });
        } else if (this.state.turns == "Always player 02") {
          this.setState({ player1: 2, player2: 1 });
          nextPlayer = this.state.player2Name;
          this.setState({ currentPlayer: nextPlayer });
        } else if (this.state.turns == "Alternate Turn") {
          if (this.state.player1 === 1) {
            this.setState({ player1: 2, player2: 1 });
            nextPlayer = this.state.player2Name;
          } else {
            this.setState({ player1: 1, player2: 2 });
            nextPlayer = this.state.player1Name;
          }
        }
        this.setState({ board, gameOver: true });
        this.setState({ board, gamep2: this.state.gamep2 + 1 });
        this.setState({ board, count: this.state.count + 1 });
        this.setState({ board, congrats: "Congratulation!" });
        if (this.state.turns == "Loser first") {
          this.setState({ player1: 1, player2: 2 });
          nextPlayer = this.state.player1Name;
        } else if (this.state.turns == "winner first") {
          this.setState({ player1: 2, player2: 1 });
          nextPlayer = this.state.player2Name;
        }
        if (
          (this.state.gamep1 < this.state.gamep2) &
          (this.state.count == this.state.numberOfGames)
        ) {
          //alert('Player 2 wins the tournament!')
          this.setState({
            board,
            content: this.state.player2Name + " wins the tournament!"
          });
          alert(this.state.player2Name + "wins the tournament!");
          this.goToNextPage();
        } else if (
          (this.state.gamep1 > this.state.gamep2) &
          (this.state.count == this.state.numberOfGames)
        ) {
          //alert('Player 1 wins the tournament!')
          this.setState({
            board,
            content: this.state.player1Name + " wins the tournament!"
          });
          alert(this.state.player1Name + "wins the tournament!");
          this.goToNextPage();
        }

        this.setState({
          board,
          content:
            this.state.player2Name +
            " wins the match " +
            this.state.count +
            ". " +
            nextPlayer +
            " will start the next game."
        });
      } else if (result === "draw") {
        this.setState({ board, count: this.state.count + 1 });
        this.setState({ board, gameOver: true });
        this.setState({
          board,
          content:
            " It is a draw! No one wins the match " +
            this.state.count +
            "! " +
            nextPlayer +
            " will start the next game."
        });
        if (
          (this.state.gamep1 == this.state.gamep2) &
          (this.state.count == this.state.numberOfGames)
        ) {
          //alert('No one wins the tournament! Both players won equal number of matches')
          this.setState({
            board,
            content:
              "No one wins the tournament! Both players won equal number of matches"
          });
        }
        alert("It's a draw!" + this.state.count);
      } else {
        this.setState({ board, currentPlayer: this.togglePlayer() });
      }
    } else {
      alert("Game over. Please start a new game.");
    }
  }

  checkVertical(board) {
    for (let r = 3; r < c4rows; r++) {
      for (let c = 0; c < c4columns; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c] &&
            board[r][c] === board[r - 2][c] &&
            board[r][c] === board[r - 3][c]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkHorizontal(board) {
    for (let r = 0; r < c4rows; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r][c + 1] &&
            board[r][c] === board[r][c + 2] &&
            board[r][c] === board[r][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalRight(board) {
    for (let r = 3; r < c4rows; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c + 1] &&
            board[r][c] === board[r - 2][c + 2] &&
            board[r][c] === board[r - 3][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDiagonalLeft(board) {
    for (let r = 3; r < c4rows; r++) {
      for (let c = 3; c < c4columns; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c - 1] &&
            board[r][c] === board[r - 2][c - 2] &&
            board[r][c] === board[r - 3][c - 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }

  checkDraw(board) {
    for (let r = 0; r < c4rows; r++) {
      for (let c = 0; c < c4columns; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return "draw";
  }

  checkAll(board) {
    return (
      this.checkVertical(board) ||
      this.checkDiagonalRight(board) ||
      this.checkDiagonalLeft(board) ||
      this.checkHorizontal(board) ||
      this.checkDraw(board)
    );
  }

  componentWillMount() {
    this.initBoard();
  }

  render() {
    return (
      <div className="game-play">
        <table className="board ">
          <thead></thead>
          <tbody>
            {this.state.board.map((row, i) => (
              <Row key={i} rowIndex={i} row={row} play={this.play} />
            ))}
          </tbody>
        </table>
        <div className="con ">
          <h2>{this.state.numberOfGames} Games Tournament </h2>
          <div className="congrats">{this.state.congrats}</div>
          <div className="content">{this.state.content}</div>
          <Block
            labelName=""
            boxColor="#DCF6E4"
            icon={player1}
            name={this.state.player1Name}
            value={this.state.player1Name}
            imageColor="#37AC5D"
            needPopUp="0"
          />

          <Block
            labelName=""
            boxColor="#F6EFD5"
            icon={player2}
            name={this.state.player2Name}
            value={this.state.player2Name}
            imageColor="#F8D146"
            needPopUp="0"
          />
          <button
            className="button"
            onClick={() => {
              this.initBoard();
            }}
          >
            Next Game
          </button>
          <button
            className="button2"
            onClick={() => {
              this.goToNextPage();
            }}
          >
            End Tournament
          </button>
        </div>
      </div>
    );
  }
}
function Block({
  icon,
  labelName,
  value,
  boxColor,
  imageColor,
  needPopUp,
  name
}) {
  return (
    <div
      className="input-group"
      style={{
        border: "1px solid #70707026",
        borderRadius: "15px",
        height: "110px",
        background: `${boxColor} 0% 0% no-repeat padding-box`,
        opacity: "1",
        margin: "20px 10px"
      }}
    >
      <div
        style={{
          backgroundColor: imageColor,
          borderRadius: "50%",
          height: "100px",
          width: "100px",
          margin: "5px 10px",
          padding: "20px"
        }}
      >
        <img src={icon} alt="small icon" style={{ align: "center" }} />
      </div>

      <div className="input-control">
        <label htmlFor={labelName} style={LABEL_TEXT}>
          {labelName}
        </label>
        {needPopUp === "0" && <PlayerNamesField name={name} value={value} />}
      </div>
    </div>
  );
}

function PlayerNamesField({ name, value }) {
  return (
    <p
      className="form-control"
      value={value}
      autoComplete="off"
      name={name}
      type="text"
      style={INPUT_TEXT}
    >
      {name}
    </p>
  );
}

export default Board;
