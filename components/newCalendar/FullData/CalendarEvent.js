"use client";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { forwardRef, useContext } from "react";
import { FullCalendarContext } from "./CalendarData";

const style = {
  display: "flex",
  alignItems: "center",
  px: 1,
  cursor: "pointer",
  "&:hover": {
    opacity: 0.6,
  },
};

const CalendarEvent = forwardRef(({ day: { date, event }, ...props }, ref) => {
  const {
    commonDayStyle,
    event: {
      highlighted: eventHighlighted,
      highlightedProps,
      onClick,
      color,
      label,
    },
  } = useContext(FullCalendarContext);

  const highlighted = event && eventHighlighted(event);
  return (
    <Box
      ref={ref}
      sx={(theme) => ({
        ...style,
        ...commonDayStyle(date, theme),
        gridColumnEnd: `span ${event.span}`,
        background: `radial-gradient(circle, ${color(
          event
        )} 30%, rgba(148,187,233,0) 100%)`,
        ...(highlighted && highlightedProps(event)),
      })}
      onClick={(evt) => onClick(event, evt.currentTarget)}
      {...props}
    >
      <Typography noWrap>{label(event)}</Typography>
    </Box>
  );
});
CalendarEvent.displayName = "CalendarEvent";
export default CalendarEvent;
