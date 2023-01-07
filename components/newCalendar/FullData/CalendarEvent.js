"use client";

import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { isWeekend } from "date-fns";
import { forwardRef, useContext } from "react";
import { day, weekend } from "../styles";
import { FullCalendarContext } from "./CalendarData";

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

const CalendarEvent = forwardRef(({ day: { date, event },...props },ref) => {
  const theme = useTheme();
  const {
    event: { highlighted: eventHighlighted, highlightedProp, onClick, color },
  } = useContext(FullCalendarContext);

  const commonClasses = {
    ...day,
    ...(isWeekend(date) && weekend[theme.palette.mode]),
  };

  const highlighted = event && eventHighlighted(event);

  return (
    <Box
    ref={ref}
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
      {...props}
    >
      {event.duration > 1 && <Typography noWrap>{event.label}</Typography>}
    </Box>
  );
}
);

export default CalendarEvent;