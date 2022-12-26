import { Box, Skeleton } from "@mui/material";
import {
  eachDayOfInterval,
  endOfMonth,
  isWithinInterval,
  startOfMonth,
} from "date-fns";
import { useContext } from "react";
import { SingleDataContext } from "../CalendarSmall";
import CalendarMonth from "./CalendarMonth";

const week = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const minCellHeight = 5;
export default function CalendarSimple({}) {
  const { months, view, events } = useContext(SingleDataContext);

  const daysAndEventsOf = ({ day }) =>
    mergeDaysAndEvent(
      eachDayOfInterval({
        start: startOfMonth(day),
        end: endOfMonth(day),
      }),
      events
    );

  return (
    <Box
      sx={{
        width: view.width,
        display: "grid",
        gridTemplateColumns: "repeat(7,calc(100%/7))",
      }}
    >
      {week.map((d, id) => (
        <Day day={d} key={id} />
      ))}
      {months.map((m, id) => (
            <CalendarMonth
              key={id}
              monthDay={m.day}
              events={events}
              days={daysAndEventsOf(m)}
              cellHeight={`${minCellHeight + view.zoom * 0.5}em`}
            />
          ))}
    </Box>
  );
}

const Day = ({ day }) => (
  <Box
    sx={{
      backgroundColor: "#fff",
      color: "ajcBlue.main",
      borderLeft: "3px solid",
      borderColor: "ajcBlue.main",
      position: "sticky",
      top: 0,
      p: "1em",
    }}
  >
    {day}.
  </Box>
);

function mergeDaysAndEvent(days, events) {
  function eventOf(d) {
    for (let evt of events) {
      let { start, end } = evt;
      if (isWithinInterval(d, { start, end })) return evt;
    }
  }

  return days.map((d) => {
    return { date: d, event: eventOf(d) };
  });
}
