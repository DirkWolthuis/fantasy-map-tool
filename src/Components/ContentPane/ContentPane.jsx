import React, { useRef, useState, useEffect } from "react";
import { useMapMachine } from "../../Stores/useMapMachine";
import ViewContent from "./ViewContent";
import EditContent from "./EditContent";
//import { useOutsideElementListner } from "../../Hooks/useOutsideElementListner";

const ContentPane = () => {
  const [selectedMarker, setSelectedMarker] = useState();
  const [state, send] = useMapMachine();
  const ref = useRef();

  const closeContentPane = () => {
    send({ type: "CLOSE_CONTENT_PANE" });
  };

  const saveContent = (title, content) => {
    send({
      type: "SAVE_CONTENT",
      payload: { id: selectedMarker.id, title: title, content, content },
    });
  };

  const deleteMarker = () => {
    console.log(selectedMarker.id)
    send({
      type: "DELETE_MARKER",
      payload: { id: selectedMarker.id },
    });
  };

  //useOutsideElementListner(closeContentPane, ref);

  useEffect(() => {
    if (state.context.selectedMarkerId) {
      setSelectedMarker(
        state.context.markers.find(
          (marker) => marker.id === state.context.selectedMarkerId
        )
      );
    }
  }, [state]);

  return (
    <div
      ref={ref}
      style={{
        width: state.matches("contentPane.opened") ? "60vw" : "0px",
        maxWidth: "700px",
      }}
      className="fixed right-0 top-0 bottom-0 z-1 bg-white shadow transition-all duration-500 ease-in-out flex flex-col"
    >
      {state.matches("contentPane.opened.view") && (
        <ViewContent
          closeContentPane={closeContentPane}
          selectedMarker={selectedMarker}
          editContent={() => send({ type: "EDIT_CONTENT" })}
          deleteMarker={deleteMarker}
        />
      )}
      {state.matches("contentPane.opened.edit") && (
        <EditContent
          closeContentPane={closeContentPane}
          selectedMarker={selectedMarker}
          saveContent={saveContent}
          deleteMarker={deleteMarker}
        />
      )}
    </div>
  );
};

export default ContentPane;
