"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

type SplitContainerProps = {
  A: React.ReactNode;
  B: React.ReactNode;
  type?: "horizontal" | "vertical";
};

const settings = {
  min: 20,
  max: 80,
};

export function SplitContainer({
  A,
  B,
  type = "horizontal",
}: SplitContainerProps) {
  const ref = useRef<any>(null);
  const [t, setT] = useState(50);
  const [dragging, setDragging] = useState(false);

  const [offsetWidth, setOffsetWidth] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  const setConsts = () => {
    if (!ref.current) return;

    if (type === "vertical") {
      setOffsetHeight(ref.current ? ref.current.offsetHeight : 0);
      setOffsetTop(ref.current ? ref.current.offsetTop : 0);
      return;
    }

    setOffsetWidth(ref.current ? ref.current.offsetWidth : 0);
    setOffsetLeft(ref.current ? ref.current.offsetLeft : 0);
  };

  useEffect(() => {
    setConsts();
    window.addEventListener("resize", setConsts);

    return () => {
      window.removeEventListener("resize", setConsts);
    };
  }, [ref.current]);

  useEffect(() => {
    const handleMouseMove = (event: { clientX: any; clientY: any }) => {
      if (!dragging) return;

      let mousePos = { x: event.clientX, y: event.clientY };

      let percent = 0;
      if (type === "vertical") {
        percent = ((mousePos.y - offsetTop) / offsetHeight) * 100;
      } else {
        percent = ((mousePos.x - offsetLeft) / offsetWidth) * 100;
      }

      if (percent < settings.min) {
        setT(settings.min);
        return;
      }

      if (percent > settings.max) {
        setT(settings.max);
        return;
      }

      setT(percent);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dragging]);

  useEffect(() => {
    if (dragging) {
      const handleMouseUp = () => {
        setDragging(false);
        console.log("mouseup");
      };

      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragging]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full",
        type === "vertical" ? "flex-col" : "flex-row"
      )}
    >
      <div
        style={
          type === "vertical"
            ? {
                height: `${t}%`,
              }
            : {
                width: `${t}%`,
              }
        }
      >
        {A}
      </div>
      <div
        onMouseDown={(e) => {
          console.log("mousedown");
          setDragging(true);
        }}
        className={
          type === "vertical"
            ? "h-1 w-full cursor-ns-resize"
            : "w-1 h-full cursor-ew-resize"
        }
      ></div>
      <div
        style={
          type === "vertical"
            ? {
                height: `${100 - t}%`,
              }
            : {
                width: `${100 - t}%`,
              }
        }
      >
        {B}
      </div>
    </div>
  );
}
