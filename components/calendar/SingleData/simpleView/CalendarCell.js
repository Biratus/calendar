"use client";

import { Box, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { isSameDay, isWeekend } from "date-fns";
import { useContext } from "react";
import { formatDayDate } from "../../../../lib/date";
import { CalendarContext } from "../../CustomCalendar";
import { backgroundFor, day, weekend } from "../../styles/styles";

const cellStyle = {
  pl: 2,
  flexGrow: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
};

export default function CalendarCell({
  day: { date, event },
  hover,
  setHover,
  height,
}) {
  const theme = useTheme();
  const { event: eventProps, day: dayProps } = useContext(CalendarContext);

  const gridColumnStart = () => {
    if (date.getDate() != 1) return "auto";
    return date.getDay() || 7;
  };

  const highlighted = event && eventProps.highlighted(event);

  return (
    <Stack
      direction="column"
      sx={{
        gridColumnStart: gridColumnStart(),
        height,
        ...day,
        ...(isWeekend(date) && weekend[theme.palette.mode]),
        ...(dayProps.highlighted(date) && dayProps.highlightedProp),
      }}
    >
      <Box sx={{ p: "0.5em" }}>{formatDayDate(date)}</Box>
      {event && (
        <Tooltip title={eventProps.tooltip(event)} placement="bottom">
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
                eventProps.highlightedProp(eventProps.color(event))),
            }}
            onMouseEnter={() => setHover(event)}
            onMouseLeave={() => setHover(null)}
            onClick={(evt) => eventProps.onClick(event, evt.currentTarget)}
          >
            <Typography noWrap>
              {isSameDay(event.start, date) && event.label}
            </Typography>
          </Box>
        </Tooltip>
      )}
    </Stack>
  );
}
