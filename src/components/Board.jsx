import React, { Component } from "react";
import "./Board.css";
class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardData: [
        {
          name: "Winnie",
          toDoList: ["abcd", "abda"]
        },
        {
          name: "Bob",
          toDoList: ["abcd", "abda"]
        },
        {
          name: "Thomas",
          toDoList: ["abcd", "abda"]
        },
        {
          name: "George",
          toDoList: ["abcd", "abda"]
        }
      ]
    };
  }

  handleClickOnShuffle = (index, stringIndex, direction) => {
    const copiedBoardData = [...this.state.boardData];
    for (let i = 0; i < copiedBoardData.length; i++) {
      if (index == i) {
        const shuffleString = copiedBoardData[i].toDoList[stringIndex];
        copiedBoardData[i].toDoList.splice(stringIndex, 1);
        if (direction == "left") {
          copiedBoardData[i - 1].toDoList.push(shuffleString);
        } else {
          copiedBoardData[i + 1].toDoList.push(shuffleString);
        }
      }
    }
    this.setState({
      boardData: copiedBoardData
    });
  };

  handleNewCardClick = index => {
    const cardDetail = prompt("Please enter the card details");
    const copiedBoardData = [...this.state.boardData];
    for (let i = 0; i < copiedBoardData.length; i++) {
      if (index == i) {
        copiedBoardData[i].toDoList.push(cardDetail);
        break;
      }
    }
    this.setState({
      boardData: copiedBoardData
    });
    localStorage.setItem("boardData", JSON.stringify(copiedBoardData));
  };

  render() {
    return (
      <div className="board-container">
        {this.state.boardData.map((card, index) => {
          return (
            <div className="column">
              <div className={"name" + (index + 1)}>{card.name}</div>
              {card.toDoList.map((toDo, stringIndex) => {
                return (
                  <div>
                    {index != 0 && (
                      <span
                        onClick={() =>
                          this.handleClickOnShuffle(index, stringIndex, "left")
                        }
                      >
                        -
                      </span>
                    )}
                    {toDo}
                    {index != this.state.boardData.length - 1 && (
                      <span
                        onClick={() =>
                          this.handleClickOnShuffle(index, stringIndex, "right")
                        }
                      >
                        +
                      </span>
                    )}
                  </div>
                );
              })}
              <div
                onClick={() => this.handleNewCardClick(index)}
                className="new-card-header"
              >
                +add a new card
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Board;
