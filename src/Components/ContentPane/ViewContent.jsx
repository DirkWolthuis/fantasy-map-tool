import React from "react";
import * as Showdown from "showdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});
const ViewContent = ({
  selectedMarker,
  closeContentPane,
  editContent,
  deleteMarker,
}) => {
  return (
    <>
      <div className="p-4 border-b border-gray-300 flex justify-between items-center">
        <h1 className="font-head text-xl">{selectedMarker?.title}</h1>
        <FontAwesomeIcon
          onClick={closeContentPane}
          className="text-lg cursor-pointer"
          icon={faTimes}
        />
      </div>
      <div
        className="p-4 overflow-y-scroll flex-grow"
        dangerouslySetInnerHTML={{
          __html: converter.makeHtml(selectedMarker?.content),
        }}
      ></div>
      <div className="p-4 border-t border-gray-300">
        <button
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-blue-900 font-bold mr-3"
          onClick={editContent}
        >
          Edit
        </button>
        <button
          onClick={deleteMarker}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-red-900 font-bold mr-4"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ViewContent;
