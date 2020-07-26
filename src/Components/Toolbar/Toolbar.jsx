import React from "react";

const Toolbar = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 flex flex-col items-center">
      <div className="bg-white p-4">
        <button>view</button>
        <button>markers</button>
      </div>
    </div>
  );
};

export default Toolbar;
