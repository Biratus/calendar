"use client";

import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { isWeekend } from "date-fns";
import { useContext } from "react";
import { day, weekend } from "../../calendar/styles/styles";

const style = {
  display: "flex",
  alignItems: "center",
  px: 1,
  cursor: "pointer",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  "&:hover": {
    opacity: 0.6,
  },
};

export default function CalendarEvent({
  day: { date, event },
  Tooltip,
  context,
}) {
  const theme = useTheme();
  const {
    event: { highlighted: eventHighlighted, highlightedProp, onClick, color },
  } = useContext(context);

  const commonClasses = {
    ...day,
    ...(isWeekend(date) && weekend[theme.palette.mode]),
  };

  const highlighted = event && eventHighlighted(event);

  return (
    <Tooltip placement="bottom">
      <Box
        sx={{
          ...style,
          ...commonClasses,
          background: `radial-gradient(circle, ${color(
            event
          )} 30%, rgba(148,187,233,0) 100%)`,
          ...(highlighted && highlightedProp(color(event))),
          gridColumnEnd: `span ${event.duration}`,
        }}
        onClick={(evt) => onClick(event, evt.currentTarget)}
      >
        {event.duration > 1 && <Typography noWrap>{event.label}</Typography>}
      </Box>
    </Tooltip>
  );
}
