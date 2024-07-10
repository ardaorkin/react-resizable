import { useState, useRef } from "react";
import "./App.css";
import { Table } from "./Table";

function App() {
  const [gripSizeRem, setGripSizeRem] = useState("0.4");
  const [rightEdgeRem, setRightEdgeRem] = useState("0");
  const [showGrip, setShowGrip] = useState(false);
  return (
    <>
      <div className="options">
        <div className="option">
          <label htmlFor="gripSizeRem">Grip size</label>
          <input
            id="gripSizeRem"
            type="range"
            onChange={(event) => setGripSizeRem(event.target.value)}
            value={gripSizeRem}
            min={0}
            step={0.1}
            max={10}
          />
        </div>
        <div className="option">
          <label htmlFor="rightEdgeRem">Right edge distance</label>
          <input
            id="rightEdgeRem"
            type="range"
            onChange={(event) => setRightEdgeRem(event.target.value)}
            value={rightEdgeRem}
            min={0}
            step={0.001}
            max={10}
          />
        </div>
        <div className="option">
          <label htmlFor="showGrip">Show grip</label>
          <input
            type="checkbox"
            onChange={(event) => setShowGrip(event.target.checked)}
            value={showGrip ? "checked" : ""}
          />
        </div>
      </div>
      <Table
        gripSizeRem={gripSizeRem}
        rightEdgeRem={rightEdgeRem}
        showGrip={showGrip}
      />
      <p>Grip size is {gripSizeRem}rem</p>
      <p>Right edge is {rightEdgeRem}rem</p>
    </>
  );
}

export default App;
