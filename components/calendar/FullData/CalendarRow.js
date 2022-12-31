"use client";

import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { eachDayOfInterval, isWeekend, isWithinInterval } from "date-fns";
import { useContext } from "react";
import { CalendarContext } from "../CustomCalendar";
import { day as dayStyle, weekend } from "../styles/styles";
import CalendarEvent from "./CalendarEvent";

const labelStyle = {
  display: "flex",
  alignItems: "center",
  position: "sticky",
  left: "0",
  alignSelf: "auto",
  color: "ajcBlue.contrastText",
  backgroundColor: "ajcBlue.main",
  cursor: "pointer",
  paddingLeft: "0.5em",
  zIndex: 1,
  "&:hover": {
    backgroundColor: "ajcBlue.dark",
  },
};
export default function CalendarRow({ label = "###", days, events,context,labelProps:{title:labelTitle,comp:labelComp} }) {
  const theme = useTheme();
  const { focusData,view } = useContext(context);
  const daysAndEvents = mergeDaysAndEvent(days, events, days[days.length - 1]);
  return (
    <>
      <Tooltip title={labelTitle} arrow placement="right">
      {labelComp}
        {/* <Box sx={labelStyle} onClick={() => focusData(label)}>
          <Typography noWrap>{label}</Typography>
        </Box> */}
      </Tooltip>
      {daysAndEvents.map((day, id) => {
        return day.event ? (
          <CalendarEvent day={day} key={id} context={context}/>
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
