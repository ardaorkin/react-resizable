import { useCallback, useRef } from "react";
import "./App.css";
import { Table } from "./Table";
import { ResizableEventsParams } from "./Resizable";

function App() {
  const maxTableWidth = 600;
  const table = useRef<HTMLTableElement | null>(null);
  const handleResize = useCallback((params: ResizableEventsParams) => {
    const { element } = params;
    if (table.current) {
      const tableOffset = table.current.offsetWidth;
      if (tableOffset === maxTableWidth) {
        const tableHeaderCells = [...table.current?.querySelectorAll("th")];
        const elementsIndex = tableHeaderCells.indexOf(
          element as HTMLTableCellElement,
        );
        const nextElement = tableHeaderCells[elementsIndex + 1];
        nextElement.style.width = "unset";
        nextElement.style.minWidth = "2px";
      }
    }
  }, []);
  return <Table ref={table} />;
}

export default App;
