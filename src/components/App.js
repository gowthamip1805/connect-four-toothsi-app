import React from "react";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import ScreenOne from "./one/ScreenOne";
import ScreenTwo from "./two/ScreenTwo";
import ScreenThree from "./three/ScreenThree";
import App1 from "../App";

function App() {
  return (
    <div className="container-fluid" style={{ padding: "5%" }}>
      <Switch>
        <Route path="/" exact component={ScreenOne} />
        <Route path="/2" component={ScreenTwo} />
        <Route path="/3" component={ScreenThree} />
        <Route path="/game" component={App1} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
