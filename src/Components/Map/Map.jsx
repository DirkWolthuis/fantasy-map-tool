import React, { useEffect, useRef } from "react";
import { CRS } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map as LeafletMap, ImageOverlay } from "react-leaflet";
import CustomMarkers from "./CustomMarkers";
import { useMapMachine } from "../../Stores/useMapMachine";
const DEFAULT_VIEWPORT = {
  center: [1500, 2500],
  zoom: 0,
};

const Map = () => {
  const [state, send] = useMapMachine();
  const ref = useRef();

  useEffect(() => {
    ref.current.leafletElement.fitBounds([
      [0, 0],
      [3000, 5000],
    ]);
  }, [ref]);

  const clickMap = (event) => {
    if (state.matches("markers")) {
      send({
        type: "ADD_MARKER",
        payload: [event.latlng.lat, event.latlng.lng],
      });
    }
  };

  return (
    <LeafletMap
      ref={ref}
      minZoom={-2}
      maxZoom={0}
      className="z-0 h-screen"
      crs={CRS.Simple}
      viewport={DEFAULT_VIEWPORT}
      onclick={clickMap}
    >
      <ImageOverlay
        url="./map.png"
        bounds={[
          [0, 0],
          [3000, 5000],
        ]}
      />
      <CustomMarkers />
    </LeafletMap>
  );
};

export default Map;
