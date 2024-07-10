import type { ReactElement, ReactNode } from "react";
import {
  Children,
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";

export type ResizableEventsParams = {
  event: MouseEvent;
  element: HTMLElement | null;
  width: number;
};

const noop = () => {};

export type ResizableWrapperProps = {
  maxWidth?: number;
  minWidth?: number;
  onResize?: ({ event, element, width }: ResizableEventsParams) => void;
  onResizeEnd?: ({ event, element, width }: ResizableEventsParams) => void;
  onResizeStart?: () => void;
  gripSizeRem: string;
  rightEdgeRem: string;
  showGrip: boolean;
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
      gripSizeRem = 0.4,
      rightEdgeRem = 0,
      showGrip = false,
    },
    ref
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
            onResizeEnd({ event, element: parent, width: maxWidth });
            return;
          }
          if (minWidth && newWidth < minWidth) {
            onResizeEnd({ event, element: parent, width: minWidth });
            return;
          }
          if (newWidth > 0) {
            onResize({ event, element: parent, width: newWidth });
            parent.style.width = `${newWidth}px`;
          }
        }
      },
      [maxWidth, minWidth, onResize, onResizeEnd]
    );

    const handleResizeEnd = useCallback(
      (event: MouseEvent) => {
        const parentWidth =
          resizeHandlerRef.current?.parentElement?.offsetWidth || 0;
        onResizeEnd({
          event,
          element: resizeHandlerRef.current
            ? resizeHandlerRef.current.parentElement
            : null,
          width: parentWidth || 0,
        });
        document.removeEventListener("mousemove", handleResize);
        document.removeEventListener("mouseup", handleResizeEnd);
      },
      [handleResize, onResizeEnd]
    );

    const handleResizeStart = useCallback(
      (event: MouseEvent) => {
        event.preventDefault();
        onResizeStart();
        document.addEventListener("mousemove", handleResize);
        document.addEventListener("mouseup", handleResizeEnd);
      },
      [handleResize, handleResizeEnd, onResizeStart]
    );

    useEffect(() => {
      if (resizeHandlerRef.current) {
        const resizeHandlerElement = resizeHandlerRef.current;
        resizeHandlerElement.addEventListener("mousedown", handleResizeStart);
        return () => {
          resizeHandlerElement.removeEventListener(
            "mousedown",
            handleResizeStart
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
          style={{
            insetInlineEnd: `-${rightEdgeRem}rem`,
            width: `${gripSizeRem}rem`,
            backgroundColor: showGrip ? "rgb(0, 0, 255)" : "transparent",
          }}
        />,
      ],
      ref,
    });
  }
);
