import React, { useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { CRS } from "leaflet";
import { Map, ImageOverlay } from "react-leaflet";
import CustomMarker from "./Components/CustomMarker";

const DEFAULT_VIEWPORT = {
  center: [1500, 2500],
  zoom: 0,
};

function App() {
  const ref = useRef();
  useEffect(() => {
    ref.current.leafletElement.fitBounds([
      [0, 0],
      [3000, 5000],
    ]);
  }, [ref]);
  return (
    <div className="w-screen h-screen">
      <Map
        ref={ref}
        minZoom={-2}
        maxZoom={0}
        onclick={(e) => console.log(e)}
        className="h-screen"
        crs={CRS.Simple}
        viewport={DEFAULT_VIEWPORT}
      >
        <ImageOverlay
          url="./map.png"
          bounds={[
            [0, 0],
            [3000, 5000],
          ]}
        />
        <CustomMarker />
      </Map>
    </div>
  );
}

export default App;
