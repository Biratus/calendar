"use client";

import { Box, Tooltip } from "@mui/material";
import { eachDayOfInterval, isWithinInterval } from "date-fns";
import { useContext } from "react";
import { FullCalendarContext } from "./CalendarData";
import CalendarEvent from "./CalendarEvent";

export default function CalendarRow({
  events,
  labelProps: { key: labelKey, title: labelTitle, LabelComponent },
  EventTooltip,
}) {
  const {
    days,
    commonDayStyle,
    drag: { enter, leave, move, drop, drag },
  } = useContext(FullCalendarContext);
  const daysAndEvents = mergeDaysAndEvent(days, events, days[days.length - 1]);

  return (
    <>
      <Tooltip title={labelTitle} arrow placement="right">
        <LabelComponent labelKey={labelKey} />
      </Tooltip>
      {daysAndEvents.map((day, id) => {
        const dragEvents = {
          onDrag: (evt) => drag(day, labelKey, evt),
          onDragOver: (evt) => move(day, labelKey, evt),
          onDragEnter: (evt) => enter(day, labelKey, evt),
          onDragLeave: (evt) => leave(day, labelKey, evt),
          onDrop: (evt) => drop(day, labelKey, evt),
        };
        return day.event ? (
          EventTooltip ? (
            <EventTooltip key={id} event={day.event}>
              <CalendarEvent key={id} day={day} {...dragEvents} draggable />
            </EventTooltip>
          ) : (
            <CalendarEvent key={id} day={day} {...dragEvents} draggable />
          )
        ) : (
          <Box
            key={id}
            sx={(theme) => ({
              textAlign: "center",
              borderLeft: "1px solid gray",
              ...commonDayStyle(day.date, theme),
            })}
            {...dragEvents}
          ></Box>
        );
      })}
    </>
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
      // Make cell span for duration of event if within time interval
      evt.span =
        evt.end.getTime() > limit
          ? eachDayOfInterval({
              start: evt.start,
              end: limit,
            }).length
          : evt.duration;
      currSkip = evt.span - 1;
      newDays.push({ date: d, event: evt });
    } else newDays.push({ date: d });
  }
  return newDays;
}
