import React, { Component } from "react";
import Tile from "./tile.js";

class Row extends Component {
  render() {
    const { play, row, rowIndex } = this.props;
    let rowOutput = Object.keys(row).map(function (i) {
      return (
        <Tile
          key={i}
          value={row[i]}
          rowIndex={rowIndex}
          columnIndex={i}
          play={play}
        />
      );
    });
    return <tr>{rowOutput}</tr>;
  }
}
export default Row;
