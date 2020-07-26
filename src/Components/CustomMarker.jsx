import React, { useEffect, useState } from "react";
import { useLeaflet, Popup, Marker } from "react-leaflet";
import { DivIcon } from "leaflet";

const CustomMarker = () => {
  const [zoom, setZoom] = useState();

  const { map } = useLeaflet();
  useEffect(() => {
    map.on("zoom", updateZoom);

    return () => map.off("zoom", updateZoom);
  }, [map]);

  const updateZoom = (map) => setZoom(map.target.getZoom() - 1);

  const marker = new DivIcon({
    html: "<p>test</p>",
    iconSize: [60 / (zoom * -1), 60 / (zoom * -1)],
  });

  return (
    <Marker draggable={true} icon={marker} position={[1500, 2500]}>
      <Popup>
        {zoom}
        A pretty CSS3 popup.
        <br />
        Easily customizable.
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
