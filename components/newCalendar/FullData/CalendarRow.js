"use client";

import { Box, Tooltip, useTheme } from "@mui/material";
import { eachDayOfInterval, isWeekend, isWithinInterval } from "date-fns";
import { useContext } from "react";
import { FormateurTooltip } from "../../../app/planning/(components)/CalendarViews";
import { day as dayStyle, weekend } from "../../calendar/styles/styles";
import EventTooltip from "../EventTooltip";
import CalendarEvent from "./CalendarEvent";

export default function CalendarRow({
  events,
  labelProps: { title: lableTitle, comp: labelComponent },
  context,
}) {
  const theme = useTheme();
  const {
    event: { EventTooltip },
    days,
  } = useContext(context);
  
  const daysAndEvents = mergeDaysAndEvent(days, events, days[days.length - 1]);
  return (
    <>
      <Tooltip title={lableTitle} arrow placement="right">
        {labelComponent}
      </Tooltip>
      {daysAndEvents.map((day, id) => {
        return day.event ? (
          EventTooltip ? (
            <EventTooltip key={id} event={day.event}>
              <CalendarEvent key={id} day={day} context={context} />
            </EventTooltip>
          ) : (
            <CalendarEvent key={id} day={day} context={context} />
          )
        ) : (
          <Cell
            key={id}
            sx={{
              ...(isWeekend(day.date) && weekend[theme.palette.mode]),
            }}
          />
        );
      })}
    </>
  );
}

function Cell({ sx }) {
  return (
    <Box
      sx={{
        ...dayStyle,
        textAlign: "center",
        borderLeft: "1px solid gray",
        ...sx,
      }}
    ></Box>
  );
}

function mergeDaysAndEvent(days, events, limit) {
  function eventOf(d) {
    for (let evt of events) {
      let { start, end } = evt;
      if (isWithinInterval(d, { start, end })) return evt;
    }
  }

  let newDays = [];
  let currSkip = 0;

  for (let d of days) {
    if (currSkip > 0) {
      currSkip--;
      continue;
    }

    let evt = eventOf(d);
    if (evt) {
      evt.duration = eachDayOfInterval({
        start: evt.start,
        end: evt.end.getTime() > limit ? limit : evt.end,
      }).length;
      currSkip = evt.duration - 1;
      newDays.push({ date: d, event: evt });
    } else newDays.push({ date: d });
  }
  return newDays;
}
