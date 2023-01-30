"use client";

import { useState } from "react";

export default function Test() {
  const [bgColor, setBgColor] = useState("blue");

  const dragStart = (evt) => {
    setBgColor("red");
    console.log("start", evt);
  };

  const dragEnd = (evt) => {
    setBgColor("blue");
  };

  const drag = (evt) => {
    // console.log(evt)
    let { screenX, screenY } = evt;
    console.log("drag", { screenX, screenY });
  };
  return (
    <div
      draggable
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDrag={drag}
      style={{ padding: "2em", backgroundColor: bgColor }}
    >
      DRAG ME
    </div>
  );
}
