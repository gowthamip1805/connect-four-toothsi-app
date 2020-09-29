import React from "react";
import cg from "../../images/one.png";
import tp from "../../images/two.png";
import go from "../../images/online.png";
import tg from "../../images/training.png";
import cf from "../../images/4inarow.png";
const BOX_DESIGN = {
  position: "absolute",
  top: "70%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxSizing: "border-box",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  boxShadow: "0px 3px 10px #00000029",
  border: "1px solid #F7F7F7",
  borderRadius: "30px",
  opacity: "1",
  //Just for my understanding - remove it later
  padding: "200px 40px 20px 40px",
  marginTop: "20px"
};
const CONNECT_DESIGN = {
  position: "absolute",
  top: "30%",
  left: "30%",
  transform: "translate(-50%, -50%)",
  //Just for my understanding - remove it later
  padding: "20px 10px",
  color: "#3D4276"
};

const PLAY_DESIGN = {
  position: "absolute",
  top: "35%",
  left: "30%",
  transform: "translate(-50%, -50%)",
  //Just for my understanding - remove it later
  padding: "20px 10px",
  color: "#949494"
};

const img_DESIGN = {
  left: "60%",
  top: "5%",
  height: "350px",
  width: "350px"
};

const BUTTON_DESIGN = {
  background: "0% 0% no-repeat padding-box",
  borderRadius: "20px",
  opacity: "1",
  width: "340px",
  height: "90px",
  color: "#ffffff",
  font: "normal normal medium 24px/35px Poppins",
  letterSpacing: "0px"
};

function ScreenOne(props) {
  function goToNextPage(event) {
    if (event.target.id === "2") {
      props.history.push("/2");
    } else {
      alert("Coming soon");
    }
  }
  function AuthButton({ id, icon, name, color }) {
    return (
      <div className="form-group col-md-6" style={BUTTON_DESIGN}>
        <button
          id={id}
          className="btn col-lg-12"
          style={{
            backgroundColor: color,
            color: "#ffffff"
          }}
          onClick={goToNextPage}
        >
          <img src={icon} id={id} alt="small icon" />
          {name}
        </button>
      </div>
    );
  }
  return (
    <div
      style={{ backgroundColor: "#CED2DC", height: "1000px", margin: "-100px" }}
    >
      <div className="col-sm-12 col-md-9 col-lg-8" style={BOX_DESIGN}>
        {/* 1. border box center - DONE
    2. design button - each button need to occupy half of area
    3. use button for all four buttons on Screen - DONE
    4. Add colors to the Screen - DONE
    5. go to next page when two players is selected
     */}
        <div className="form-row">
          <AuthButton name="Custom Game" color="#4BABFF" id="1" icon={cg} />
          <AuthButton name="Two Players" color="#4B7BFF" id="2" icon={tp} />
          <AuthButton name="Game Online" color="#4B4BFF" id="3" icon={go} />
          <AuthButton name="Training Game" color="#6E4BFF" id="4" icon={tg} />
        </div>
      </div>
      <div className="col-lg-4 col-md-4 col-sm-4" style={img_DESIGN}>
        <img src={cf} style={img_DESIGN} alt="connect four icon" />
      </div>
      <div className="connect-des">Connect Four!</div>
      <div className="play-des">Play with other players around the world.</div>
    </div>
  );
}

export default ScreenOne;
