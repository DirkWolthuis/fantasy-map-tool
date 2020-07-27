import React, { useEffect, useState } from "react";
import { useLeaflet, Popup, Marker } from "react-leaflet";
import { DivIcon } from "leaflet";
import { useMapMachine } from "../../Stores/useMapMachine";

const CustomMarkers = () => {
  const [state, send] = useMapMachine();
  const { markers } = state.context;

  const [zoom, setZoom] = useState(0 - 1);

  const { map } = useLeaflet();
  // useEffect(() => {
  //   map.on("zoom", updateZoom);

  //   return () => map.off("zoom", updateZoom);
  // }, [map]);

  // const updateZoom = (map) => setZoom(map.target.getZoom() - 1);

  useEffect(() => {
    if (state.matches("markers")) {
      map.on("click", clickMap);
      // map.on("move", moveMarker);
    } else {
      map.off("click", clickMap);
      // map.on("move", moveMarker);
    }

    return () => {
      map.off("click", clickMap);
      // map.off("move", moveMarker);
    };
  }, [map, state]);

  const clickMap = (event) => {
    send({ type: "ADD_MARKER", payload: [event.latlng.lat, event.latlng.lng] });
  };

  const moveMarker = (event) => {
   console.log(event)
  };

  const markerFactory = (text) =>
    new DivIcon({
      className: "",
      html: `<div class="text-center">
        <p class="text-white text-xl">${text}</p>
        <div class="mx-auto bg-red-500 w-2 h-2"></div>
      </div>`,
      iconSize: [500, 100],
    });

  return (
    <>
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          icon={markerFactory(marker.text)}
          position={marker.position}
        >
          {/* <Popup>
            {zoom}
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup> */}
        </Marker>
      ))}
    </>
  );
};

export default CustomMarkers;
