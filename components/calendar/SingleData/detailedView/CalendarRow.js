import { Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { eachDayOfInterval, isSameDay } from "date-fns";
import { useContext } from "react";
import { formatDayDate } from "../../../../lib/date";
import { CalendarContext } from "../../CustomCalendar";

export default function CalendarRow({ event }) {
  const { start, end, name } = event;

  const {
    detailed,
    event: {
      color,
      tooltip,
      onClick,
      highlighted: eventHighlighted,
      highlightedProp,
    },
  } = useContext(CalendarContext);
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
      <Tooltip title={tooltip(event)} placement="bottom">
        <Box
          sx={{ ...eventStyle }}
          onClick={(evt) => onClick(event, evt.currentTarget)}
        >
          {name}
        </Box>
      </Tooltip>
      <Box sx={{ ...commonStyle }}>{detailed.additionalInfo(event)}</Box>
    </>
  );
}
