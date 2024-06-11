import { PropsWithChildren } from "react";
import { ResizableWrapper } from "./Resizable";

const ResizableTableHeaderCell = ({
  children,
}: PropsWithChildren<HTMLTableCellElement>) => {
  return (
    <ResizableWrapper>
      <th>{children}</th>
    </ResizableWrapper>
  );
};

export const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <ResizableTableHeaderCell>Name</ResizableTableHeaderCell>
          <ResizableTableHeaderCell>Age</ResizableTableHeaderCell>
          <ResizableTableHeaderCell>City</ResizableTableHeaderCell>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Arda</td>
          <td>32</td>
          <td>Ankara</td>
        </tr>
        <tr>
          <td>Joe</td>
          <td>28</td>
          <td>Colorado</td>
        </tr>
        <tr>
          <td>Jane</td>
          <td>45</td>
          <td>Texas</td>
        </tr>
      </tbody>
    </table>
  );
};
