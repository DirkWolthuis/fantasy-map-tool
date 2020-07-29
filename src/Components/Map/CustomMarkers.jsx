import React, { useState } from "react";
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

  const moveMarker = (event) => {
    send({
      type: "MOVE_MARKER",
      payload: {
        id: event.target.options.markerId,
        lat: event.target.getLatLng().lat, 
        lng: event.target.getLatLng().lng,
      },
    });
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
          markerId={marker.id}
          onDragend={moveMarker}
          key={marker.id}
          draggable={state.matches("map.markers")}
          icon={markerFactory(marker.title)}
          position={[marker.lat, marker.lng]}
        >
          {state.matches("map.navigation") && (
            <Popup>
              {zoom}
              A pretty CSS3 popup.
              <br />
              Easily customizable.
            </Popup>
          )}
        </Marker>
      ))}
    </>
  );
};

export default CustomMarkers;
