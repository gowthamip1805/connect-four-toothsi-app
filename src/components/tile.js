import React, { Component } from "react";
import player1 from "../images/avatar01.png";
import player2 from "../images/avatar02.png";

class Tile extends Component {
  render() {
    const { play, columnIndex, rowIndex, value } = this.props;
    let space = "open";
    let icon = null;
    let alt = null;
    if (value === 1) {
      space = "player1";
      icon = player1;
      alt = "player1";
    } else if (value === 2) {
      space = "player2";
      icon = player2;
      alt = "player2";
    }

    return (
      <td>
        <div className="tile" onClick={() => play(columnIndex, rowIndex)}>
          <div className={[space, "circle"].join(" ")}>
            <img
              src={icon}
              alt={alt}
              style={{
                align: "center",
                verticalAlign: "center",
                width: "70%",
                marginLeft: "15%",
                marginTop: "5%"
              }}
            />
          </div>
        </div>
      </td>
    );
  }
}

export default Tile;
