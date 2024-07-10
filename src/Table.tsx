import { ReactNode, forwardRef } from "react";
import { ResizableWrapper, ResizableWrapperProps } from "./Resizable";

type ResizableTableHeaderCellProps = ResizableWrapperProps & {
  children: ReactNode;
};
const ResizableTableHeaderCell = ({
  children,
  ...props
}: ResizableTableHeaderCellProps) => {
  return (
    <ResizableWrapper {...props}>
      <th>{children}</th>
    </ResizableWrapper>
  );
};

export const Table = forwardRef<HTMLTableElement, ResizableWrapperProps>(
  (props, ref) => {
    return (
      <table ref={ref}>
        <thead>
          <tr>
            <ResizableTableHeaderCell {...props}>Name</ResizableTableHeaderCell>
            <ResizableTableHeaderCell {...props}>Age</ResizableTableHeaderCell>
            <ResizableTableHeaderCell {...props}>City</ResizableTableHeaderCell>
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
  }
);
