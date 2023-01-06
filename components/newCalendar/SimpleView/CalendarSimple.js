"use client";
import { Box } from "@mui/material";
import {
  eachDayOfInterval,
  endOfMonth,
  isWithinInterval,
  parseISO,
  startOfMonth,
} from "date-fns";
import { createContext, useMemo, useState } from "react";
import { makeMonths } from "../../../lib/calendar";
import CalendarMonth from "./CalendarMonth";
import HoverProvider from "./HoverProvider";

const week = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const minCellHeight = 5;

export const SimpleCalendarContext = createContext();

export default function CalendarSimple({
  time: { start, monthLength },
  events,
  zoom,
  eventProps,
  dayProps,
  sx,
}) {
  const months = useMemo(
    () => makeMonths(start, monthLength),
    [start, monthLength]
  );

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
        ...sx,
        display: "grid",
        gridTemplateColumns: "repeat(7,calc(100%/7))",
      }}
    >
      {week.map((d, id) => (
        <Day day={d} key={id} />
      ))}
      <SimpleCalendarContext.Provider
        value={{
          cellHeight: `${minCellHeight + zoom * 0.5}em`,
          event: eventProps,
          day: dayProps,
        }}
      >
        <HoverProvider>
          {months.map((m, id) => (
            <CalendarMonth
              key={id}
              days={daysAndEventsOf(m)}
              context={SimpleCalendarContext}
            />
          ))}
        </HoverProvider>
      </SimpleCalendarContext.Provider>
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
