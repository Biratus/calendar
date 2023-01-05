import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { eachDayOfInterval, isSameDay } from "date-fns";
import { useContext } from "react";
import { formatDayDate } from "../../../lib/date";

export default function CalendarRow({ event,AdditionalInfo, context }) {
  const { start, end, name } = event;

  const { color, eventHighlighted, highlightedProp,onClick } = useContext(context);

  const highlighted = event && eventHighlighted(event);

  let dayNb = eachDayOfInterval({ start, end }).length;
  let dayLabel = isSameDay(start, end)
    ? formatDayDate(start)
    : formatDayDate(start) + " - " + formatDayDate(end);

  let commonStyle = {
    gridRow: "span " + dayNb,
    borderBottom: "1px solid",
    borderColor: "text.secondary",
    pl: 3,
  };

  let eventStyle = {
    ...commonStyle,
    pl: 3,
    cursor: "pointer",
    backgroundColor: color(event),
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    ...(highlighted && highlightedProp(color(event))),
    "&:hover": {
      opacity: 0.6,
    },
  };
  return (
    <>
      <Box sx={{ ...commonStyle }}>{dayLabel}</Box>
      <Box
        sx={{ ...eventStyle }}
        onClick={(evt) => onClick(event, evt.currentTarget)}
      >
        {name}
      </Box>
      <Box sx={{ ...commonStyle }}>
        <AdditionalInfo event={event}/>
      </Box>
    </>
  );
}
