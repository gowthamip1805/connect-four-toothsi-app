import React, { useState } from "react";

function ScreenThree(props) {
  const [displayOptions, setdisplayOptions] = useState(true);

  function toggleOptionsDisplay() {
    setdisplayOptions(!displayOptions);
  }

  const INPUT_SELECTOR = {
    background: " #EFF3FF 0% 0% no-repeat padding-box",
    border: "1px solid #70707026",
    borderRadius: "15px",
    opacity: "1",
    margin: "10px",
    padding: "10px",
  };

  const SelectField = ({ name, value }) => {
    return (
      <div style={INPUT_SELECTOR}>
        <input
          type="radio"
          name="noOfGames"
          value={value}
          style={{
            background: "#4B7BFF 0% 0% no-repeat padding-box",
            opacity: "1",
            width: "20px",
            height: "20px",
          }}
        />
        <span
          style={{
            font: "normal normal normal 28px/42px Poppins",
            letterSpacing: "0px",
            color: "#424242",
            opacity: "1",
            marginLeft: "20px",
          }}
        >
          {name}
        </span>
      </div>
    );
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={toggleOptionsDisplay}
      >
        Launch demo modal
      </button>

      <div
        style={{
          display: displayOptions ? "block" : "none",
        }}
        className="modal"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h4>
                {" "}
                <center>Number of game </center>
              </h4>
              <SelectField name="2 Games" value="2" />
              <SelectField name="3 Games" value="3" />
              <SelectField name="5 Games" value="5" />
              <SelectField name="10 Games" value="10" />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleOptionsDisplay}
              >
                CANCEL
              </button>
              <button type="button" className="btn btn-primary">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScreenThree;
