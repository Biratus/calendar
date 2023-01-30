import { Box } from "@mui/system";
import { eachDayOfInterval } from "date-fns";
import { useContext } from "react";
import { moduleDayLabel } from "../../../lib/calendar";

export default function CalendarRow({ event,AdditionalInfo, context }) {
  const { start, end, name } = event;

  const { color, eventHighlighted, highlightedProps,onClick } = useContext(context);

  const highlighted = event && eventHighlighted(event);

  let dayNb = eachDayOfInterval({ start, end }).length;

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
    ...(highlighted && highlightedProps(color(event))),
    "&:hover": {
      opacity: 0.6,
    },
  };
  return (
    <>
      <Box sx={{ ...commonStyle }}>{moduleDayLabel(event)}</Box>
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
