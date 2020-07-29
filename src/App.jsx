import React from "react";
import Map from "./Components/Map/Map";
import Toolbar from "./Components/Toolbar/Toolbar";
import ContentPane from "./Components/ContentPane/ContentPane";
function App() {
  return (
    <div className="w-screen h-screen">
      <Map />
      <Toolbar />
      <ContentPane />
    </div>
  );
}

export default App;
