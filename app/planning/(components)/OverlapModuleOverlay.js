"use client";
import { Backdrop, Box, Stack, Typography } from "@mui/material";
import { eachDayOfInterval } from "date-fns";
import { useMemo, useState } from "react";
import { FormateurTooltip } from "./CalendarViews";
import { useLegend } from "./LegendProvider";

export default function OverlapModuleOverlay({
  anchorEl,
  onClose,
  selectModule,
  data,
}) {
  const [backdropOpen, setBackDropOpen] = useState(Boolean(anchorEl));
  const cellWidth = anchorEl.clientWidth / data.duration;
  const { colorOf } = useLegend();
  const dayOffset = (mod) => {
    return (
      eachDayOfInterval({
        start: data.start,
        end: mod.start,
      }).length - 1
    );
  };

  const position = useMemo(() => anchorEl.getBoundingClientRect(), [anchorEl]);

  const dragStart = (mod, evt) => {
    selectModule(mod, evt.currentTarget);
    setBackDropOpen(false);
  };
  return (
    <Backdrop
      sx={{
        display: "flex",
        alignItems: "flex-start",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={backdropOpen}
      onClick={onClose}
    >
      <Typography variant="h2" sx={{ mt: 2 }}>
        Déplacer le module souhaité
      </Typography>
      <Stack
        direction="column"
        gap={2}
        sx={{
          position: "absolute",
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: `translateY(${anchorEl.clientHeight}px)`,
        }}
      >
        {data.overlappedModules.map((mod, i) => (
          <FormateurTooltip event={mod} key={i}>
            <Box
              draggable
              onDragStart={(evt) => dragStart(mod, evt)}
              onDragEnd={onClose}
              sx={{
                height: `${anchorEl.clientHeight}px`,
                width: `${(mod.duration * cellWidth).toFixed(2)}px`,
                backgroundColor: colorOf(mod.theme),
                marginLeft: `${dayOffset(mod) * cellWidth}px`,
                cursor: "grab",
                display: "flex",
                alignItems: "center",
                px: 1,
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              <Typography noWrap fontWeight="bold">
                {mod.name}
              </Typography>
            </Box>
          </FormateurTooltip>
        ))}
      </Stack>
    </Backdrop>
  );
}
