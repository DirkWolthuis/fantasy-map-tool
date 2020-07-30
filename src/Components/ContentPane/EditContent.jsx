import React, { useState, useRef, useEffect } from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "react-mde/lib/styles/css/react-mde-all.css";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const EditContent = ({ selectedMarker, closeContentPane, saveContent, deleteMarker }) => {
  const [title, setTitle] = useState(selectedMarker.title);
  const [content, setContent] = useState(selectedMarker.content);
  const [selectedTab, setSelectedTab] = useState("write");
  //   const [heightEditor, setHeightEditor] = useState();
  //   const ref = useRef();

  //   useEffect(() => {
  //     setHeightEditor(ref.current.clientHeight);
  //   }, [ref]);

  return (
    <>
      <div className="p-4 border-b border-gray-300 flex justify-between items-center">
        <input
          className="rounded border-gray-300 border px-4 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <FontAwesomeIcon
          onClick={closeContentPane}
          className="text-lg cursor-pointer"
          icon={faTimes}
        />
      </div>
      <div
        //   ref={ref}
        className="p-4 overflow-y-scroll flex-grow"
      >
        <ReactMde
          value={content}
          onChange={setContent}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          // maxEditorHeight={heightEditor}
          // minEditorHeight={heightEditor}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
      </div>
      <div className="p-4 border-t border-gray-300">
        <button
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 text-blue-900 font-bold mr-3"
          onClick={() => saveContent(title, content)}
        >
          Save
        </button>
        <button onClick={deleteMarker} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-red-900 font-bold mr-4">
          Delete
        </button>
      </div>
    </>
  );
};

export default EditContent;
