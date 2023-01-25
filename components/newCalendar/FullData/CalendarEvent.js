"use client";

import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { forwardRef, useContext } from "react";
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
  const {commonDayStyle,
    event: { highlighted: eventHighlighted, highlightedProp, onClick, color },
  } = useContext(FullCalendarContext);

  const highlighted = event && eventHighlighted(event);
  return (
    <Box
    ref={ref}
      sx={{
        ...style,
        ...commonDayStyle(date,false,theme),
        gridColumnEnd: `span ${event.span}`,
        background: `radial-gradient(circle, ${color(
          event
        )} 30%, rgba(148,187,233,0) 100%)`,
        ...(highlighted && highlightedProp(event)),
      }}
      onClick={(evt) => onClick(event, evt.currentTarget)}
      {...props}
    >
      {event.duration > 1 && <Typography sx={{display:'flex'}} noWrap>{event.label}</Typography>}
    </Box>
  );
}
);
CalendarEvent.displayName="CalendarEvent";
export default CalendarEvent;