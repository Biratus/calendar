"use client";

import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { isSameDay } from "date-fns";
import { useContext } from "react";
import { formatDayDate } from "../../../lib/date";
import { backgroundFor } from "../styles";
import { SimpleCalendarContext } from "./CalendarSimple";
import { useHover } from "./HoverProvider";

const cellStyle = {
  pl: 2,
  flexGrow: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

export default function CalendarCell({ day: { date, event } }) {
  const {
    cellHeight: height,
    event: eventProps,
    day: {tooltip:dayTooltip,styleProps:dayStyleProps},
  } = useContext(SimpleCalendarContext);

  const EventTooltip = eventProps.EventTooltip;

  const [hover, setHover] = useHover();

  const gridColumnStart = () => {
    if (date.getDate() != 1) return "auto";
    return date.getDay() || 7;
  };

  const highlighted =
    event && eventProps.highlighted && eventProps.highlighted(event);

  const Day = <Box sx={{ p: "0.5em"}}>{formatDayDate(date)}</Box>;

  return (
    <Stack
      direction="column"
      sx={(theme) => ({
        gridColumnStart: gridColumnStart(),
        height,
        ...dayStyleProps(date,theme),
  })}
    >
      {dayTooltip.hasTooltip(date) ? (
        <Tooltip title={dayTooltip.tooltipInfo(date)} placement="top" arrow>
          {Day}
        </Tooltip>
      ) : (
        Day
      )}
      {event && (
        <EventTooltip event={event} placement="bottom">
          <Box
            sx={{
              ...cellStyle,
              background: `${backgroundFor(
                date,
                event,
                eventProps.color(event)
              )} !important`,
              opacity: hover == event ? 0.6 : 1,
              ...(highlighted &&
                eventProps.highlightedProps(eventProps.color(event))),
            }}
            onMouseEnter={() => setHover(event)}
            onMouseLeave={() => setHover(null)}
            onClick={(evt) => eventProps.onClick(event, evt.currentTarget)}
          >
            <Typography noWrap>
              {isSameDay(event.start, date) && event.label}
            </Typography>
          </Box>
        </EventTooltip>
      )}
    </Stack>
  );
}
