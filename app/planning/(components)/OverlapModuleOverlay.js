"use client";
import { Backdrop, Box, Stack, Typography } from "@mui/material";
import { eachDayOfInterval } from "date-fns";
import { useState } from "react";

export default function OverlapModuleOverlay({
  anchorEl,
  onClose,
  selectModule,
  data,
}) {
  const [backdropOpen, setBackDropOpen] = useState(Boolean(anchorEl));
  const cellWidth = anchorEl.clientWidth / data.duration;

  const dayOffset = (mod) => {
    return (
      eachDayOfInterval({
        start: data.start,
        end: mod.start,
      }).length - 1
    );
  };

  const dragStart = (mod, evt) => {
    selectModule(mod, evt.currentTarget);
    setBackDropOpen(false);
  };
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={backdropOpen}
      onClick={onClose}
    >
      <Stack
        direction="column"
        gap={2}
        sx={{
          position: "absolute",
          top: `${anchorEl.offsetTop}px`,
          left: `${anchorEl.offsetLeft}px`,
          transform: `translateY(${anchorEl.clientHeight}px)`,
        }}
      >
        {data.overlappedModules.map((mod, i) => (
          <Box
            key={i}
            draggable
            onDragStart={(evt) => dragStart(mod, evt)}
            onDragEnd={onClose}
            sx={{
              alignItems: "center",
              height: `${anchorEl.clientHeight}`,
              width: `${mod.duration * cellWidth}px`,
              backgroundColor: "lightblue",
              color: "black",
              marginLeft: `${dayOffset(mod) * cellWidth}px`,
              cursor: "grab",
              "&:hover": {
                backgroundColor: "blue",
              },
            }}
          >
            <Typography sx={{ display: "flex" }} noWrap>
              {mod.name}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Backdrop>
  );
}
