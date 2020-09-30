import React, { useState } from "react";
import player1 from "../../images/avatar01.png";
import player2 from "../../images/avatar02.png";
import run from "../../images/run.png";
import winner from "../../images/winner.png";
import {
  BOX_DESIGN,
  BUTTON_DESIGN,
  INPUT_TEXT,
  LABEL_TEXT,
  INPUT_SELECTOR,
  OPTION_INPUT_STYLE,
  OPTION_NAME_STYLE
} from "../screenDesign";
import {
  gameNumberOfGamesOptions,
  gameTurnsOptions,
  NUMBER_OF_GAMES,
  GAME_TURNS
} from "./ScreenTwoData";

function ScreenTwo(props) {
  const [gameSettings, setGameSettings] = useState({
    player1: "David",
    player2: "Maria",
    numberOfGames: "5",
    whoStarts: "Alternate Turn"
  });

  const [popUpStates, setPopUpStates] = useState({
    numberOfGames: false,
    turns: false
  });

  const [gameOptions, setGameOptions] = useState({
    numberOfGames: gameSettings.numberOfGames,
    turns: gameSettings.whoStarts
  });

  function toggleGameOptionsPopUp(event) {
    if (event.target.name === NUMBER_OF_GAMES)
      setPopUpStates({
        ...popUpStates,
        numberOfGames: !popUpStates.numberOfGames
      });
    else if (event.target.name === GAME_TURNS)
      setPopUpStates({ ...popUpStates, turns: !popUpStates.turns });
  }

  function updateGameOptions(event) {
    if (event.target.name === NUMBER_OF_GAMES) {
      setGameSettings({
        ...gameSettings,
        numberOfGames: gameOptions.numberOfGames
      });
      toggleGameOptionsPopUp(event);
    } else if (event.target.name === GAME_TURNS) {
      setGameSettings({
        ...gameSettings,
        whoStarts: gameOptions.turns
      });
      toggleGameOptionsPopUp(event);
    }
  }

  function handleChange({ target }) {
    setGameSettings({ ...gameSettings, [target.name]: target.value });
  }

  function handleNumberOfPlayersChangeOption(val) {
    setGameOptions({ ...gameOptions, numberOfGames: val.value });
  }
  function handleGameTurnsOption(val) {
    setGameOptions({ ...gameOptions, turns: val.value });
  }

  function GameOptionField({ label, name, value }) {
    return (
      <div style={INPUT_SELECTOR}>
        {name === NUMBER_OF_GAMES && (
          <input
            onChange={() => handleNumberOfPlayersChangeOption({ value })}
            type="radio"
            name={name}
            checked={gameOptions.numberOfGames === value}
            value={gameOptions.numberOfGames}
            style={OPTION_INPUT_STYLE}
          />
        )}
        {name === GAME_TURNS && (
          <input
            onChange={() => handleGameTurnsOption({ value })}
            type="radio"
            name={name}
            checked={gameOptions.turns === value}
            value={gameOptions.turns}
            style={OPTION_INPUT_STYLE}
          />
        )}
        <span style={OPTION_NAME_STYLE}>{label}</span>
      </div>
    );
  }

  function goToNextPage() {
    //TODO- need to send data to next page
    // alert("Takes time!!!");
    props.history.push("/game");
    localStorage.setItem("player1", gameSettings.player1);
    localStorage.setItem("player2", gameSettings.player2);
    localStorage.setItem("numberOfGames", gameSettings.numberOfGames);
    localStorage.setItem("turns", gameSettings.whoStarts);
  }

  return (
    <div style={{ height: "1000px", marginTop: "100px" }}>
      <div className="game-play">
        <div className=" col-sm-12 col-md-12 col-lg-8" style={BOX_DESIGN}>
          <div className="col-lg-12 col-sm-12 col-md-12">
            <Block
              labelName="Player 01"
              boxColor="#DCF6E4"
              icon={player1}
              value={gameSettings.player1}
              imageColor="#37AC5D"
              needPopUp="0"
              name="player1"
            />

            <Block
              labelName="Player 02"
              boxColor="#F6EFD5"
              icon={player2}
              name="player2"
              value={gameSettings.player2}
              imageColor="#F8D146"
              needPopUp="0"
            />

            <Block
              labelName="Number of game"
              boxColor="#EFF3FF"
              icon={winner}
              imageColor="#B1C4F9"
              value={gameSettings.numberOfGames + " games"}
              needPopUp="1"
              name={NUMBER_OF_GAMES}
            />
            <Block
              labelName="Who starts"
              boxColor="#EFF3FF"
              icon={run}
              imageColor="#B1C4F9"
              value={gameSettings.whoStarts}
              needPopUp="2"
              name={GAME_TURNS}
            />
          </div>

          <hr />

          <div className="form-group col-md-12">
            <button
              className="btn col-lg-12"
              style={BUTTON_DESIGN}
              onClick={goToNextPage}
            >
              Start Game
            </button>
          </div>

          <DisplayGameOptionsPopUp
            isDisplay={popUpStates.numberOfGames}
            header="Number of game"
            optionsData={gameNumberOfGamesOptions}
            name={NUMBER_OF_GAMES}
          />
          <DisplayGameOptionsPopUp
            isDisplay={popUpStates.turns}
            header="Who Starts"
            optionsData={gameTurnsOptions}
            name={GAME_TURNS}
          />
        </div>
      </div>
    </div>
  );

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
        className="input-group block"
        style={{
          background: `${boxColor} 0% 0% no-repeat padding-box`
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

          {needPopUp !== "0" && (
            <GameOptionsField name={name} value={value} needPopUp={needPopUp} />
          )}
        </div>
      </div>
    );
  }

  function GameOptionsField({ name, value }) {
    return (
      <input
        type="textbox"
        style={INPUT_TEXT}
        name={name}
        className="form-control"
        value={value}
        readOnly={true}
        onClick={toggleGameOptionsPopUp}
      />
    );
  }

  function PlayerNamesField({ name, value }) {
    return (
      <input
        className="form-control"
        value={value}
        autoComplete="off"
        name={name}
        type="text"
        onChange={handleChange}
        style={INPUT_TEXT}
        maxLength="40"
      />
    );
  }

  function DisplayGameOptionsPopUp({ isDisplay, header, optionsData, name }) {
    return (
      <div
        style={{
          display: isDisplay ? "block" : "none"
        }}
        className="modal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h4>
                <center>{header}</center>
              </h4>

              {optionsData.map((data) => {
                return (
                  <GameOptionField
                    name={name}
                    label={data.name}
                    value={data.value}
                  />
                );
              })}
            </div>
            <div className="modal-footer">
              <button
                name={name}
                type="button"
                className="btn btn-secondary"
                onClick={toggleGameOptionsPopUp}
              >
                CANCEL
              </button>
              <button
                name={name}
                type="button"
                className="btn btn-primary"
                onClick={updateGameOptions}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScreenTwo;
