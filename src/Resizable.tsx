import type { ReactElement, ReactNode } from "react";
import {
  Children,
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";

const noop = () => {};

export type ResizableWrapperProps = {
  maxWidth?: number;
  minWidth?: number;
  onResize?: (width: number) => void;
  onResizeEnd?: (width: number) => void;
  onResizeStart?: () => void;
};

export const ResizableWrapper = forwardRef<
  HTMLElement,
  ResizableWrapperProps & { children: ReactElement }
>(
  (
    {
      children,
      maxWidth = Infinity,
      minWidth = 2,
      onResize = noop,
      onResizeEnd = noop,
      onResizeStart = noop,
    },
    ref,
  ): ReactNode => {
    const resizeHandlerRef = useRef<HTMLSpanElement | null>(null);

    const handleResize = useCallback(
      (event: MouseEvent) => {
        const { clientX } = event;

        if (resizeHandlerRef.current) {
          const parent = resizeHandlerRef.current.parentElement as HTMLElement;

          const { right: parentRight } = parent.getBoundingClientRect();

          const distance = clientX - parentRight;

          const newWidth = distance + parent.offsetWidth;
          if (maxWidth && newWidth > maxWidth) {
            onResizeEnd(maxWidth);
            return;
          }
          if (minWidth && newWidth < minWidth) {
            onResizeEnd(minWidth);
            return;
          }
          if (newWidth > 0) {
            onResize(newWidth);
            parent.style.width = `${newWidth}px`;
          }
        }
      },
      [maxWidth, minWidth, onResize, onResizeEnd],
    );

    const handleResizeEnd = useCallback(() => {
      const parentWidth =
        resizeHandlerRef.current?.parentElement?.offsetWidth || 0;
      onResizeEnd(parentWidth || 0);
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
    }, [handleResize, onResizeEnd]);

    const handleResizeStart = useCallback(
      (event: MouseEvent) => {
        event.preventDefault();
        onResizeStart();
        document.addEventListener("mousemove", handleResize);
        document.addEventListener("mouseup", handleResizeEnd);
      },
      [handleResize, handleResizeEnd, onResizeStart],
    );

    useEffect(() => {
      if (resizeHandlerRef.current) {
        const resizeHandlerElement = resizeHandlerRef.current;
        resizeHandlerElement.addEventListener("mousedown", handleResizeStart);
        return () => {
          resizeHandlerElement.removeEventListener(
            "mousedown",
            handleResizeStart,
          );
        };
      }
      return noop();
    }, [handleResizeStart]);

    const child = Children.only(children) as React.ReactElement;

    return cloneElement(child, {
      ...child.props,
      style: {
        position: "relative",
      },
      children: [
        child.props.children,
        <span
          key="resize-handler"
          ref={resizeHandlerRef}
          className="resizeHandler"
        />,
      ],
      ref,
    });
  },
);
