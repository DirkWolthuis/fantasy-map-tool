import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMousePointer,
  faMapMarker,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useMapMachine } from "../../Stores/useMapMachine";
import classNames from "classnames";

const Toolbar = () => {
  const [state, send] = useMapMachine();
  return (
    <div
      style={{ left: "10px" }}
      className="fixed  top-0 bottom-0 flex items-center z-1"
    >
      <div className="flex flex-col">
        <button
          onClick={() => send("TO_NAVIGATION")}
          className={classNames({
            "h-12": true,
            "w-12": true,
            "rounded-full": true,
            "mb-3": true,
            "bg-white": !state.matches("navigation"),
            "bg-black text-white": state.matches("navigation"),
            shadow: true,
          })}
        >
          <FontAwesomeIcon className="text-lg" icon={faMousePointer} />
        </button>
        <button
          onClick={() => send("TO_MARKERS")}
          className={classNames({
            "h-12": true,
            "w-12": true,
            "rounded-full": true,
            "mb-3": true,
            "bg-white": !state.matches("markers"),
            "bg-black text-white": state.matches("markers"),
            shadow: true,
          })}
        >
          <FontAwesomeIcon className="text-lg" icon={faMapMarker} />
        </button>
        <button
          onClick={() => send("TO_LAYERS")}
          className={classNames({
            "h-12": true,
            "w-12": true,
            "rounded-full": true,
            "mb-3": true,
            "bg-white": !state.matches("layers"),
            "bg-black text-white": state.matches("layers"),
            shadow: true,
          })}
        >
          <FontAwesomeIcon className="text-lg" icon={faLayerGroup} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
