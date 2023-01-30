"use client";

import { Box, Tooltip } from "@mui/material";
import {
  areIntervalsOverlapping,
  eachDayOfInterval,
  endOfMonth,
  startOfMonth,
} from "date-fns";
import React, { createContext, useMemo } from "react";
import { makeMonths } from "../../../lib/calendar";
import {
  formatDayDate,
  formatMonthYear,
  formatSimpleDayLabel,
} from "../../../lib/date";
import { monthLabel } from "../styles";
import CalendarRow from "./CalendarRow";

const minCellSize = 20;

export const FullCalendarContext = createContext();

export default function FullCalendar({
  data: originalData,
  LabelComponent,
  EventTooltip,
  time: { start, monthLength },
  event,
  day,
  commonDayStyle,
  zoom,
  drag,
}) {
  const {
    tooltip: { hasTooltip, tooltipInfo },
    styleProps,
  } = day;

  const month = start;
  const months = useMemo(
    () => makeMonths(month, monthLength),
    [month, monthLength]
  );

  // Only display data that is within the month interval
  const data = originalData.filter((d) =>
    dataOverlapInterval(d.events, {
      start: startOfMonth(months[0].day),
      end: endOfMonth(months[months.length - 1].day),
    })
  );

  const dayLimit = endOfMonth(months[months.length - 1].day);
  const days = eachDayOfInterval({
    start: startOfMonth(months[0].day),
    end: dayLimit,
  });

  const daysRow = useMemo(() => {
    return days.map((day, i) =>
      hasTooltip(day) ? (
        <SpecialDay
          key={i}
          day={day}
          specialLabel={tooltipInfo(day)}
          specialStyle={(theme) => styleProps(day, theme)}
          first={i == 0}
        />
      ) : (
        <Day
          key={i}
          first={i == 0}
          day={day}
          sx={(theme) => styleProps(day, theme)}
        />
      )
    );
  }, [days, hasTooltip, tooltipInfo, styleProps]);

  const monthRow = useMemo(() => {
    return months.map((m, i) => <Month month={m} key={i} first={i == 0} />);
  }, [months]);

  return (
    <FullCalendarContext.Provider
      value={{
        days,
        event,
        commonDayStyle,
        drag,
      }}
    >
      <Box
        sx={{
          gridTemplateColumns: `${10 + zoom}% repeat(${days.length},${
            minCellSize + zoom * 5
          }px)`,
          gridTemplateRows: `1fr 1fr ${
            data.length ? `repeat(${data.length},${cellHeight(zoom)}px)` : ""
          }`,
          display: "grid",
          pb: "1em",
          overflowX: "auto",
          rowGap: "2px",
        }}
      >
        {monthRow}
        {daysRow}
        {/* Data */}
        {data.map((d, i) => (
          <CalendarRow
            key={i}
            events={d.events}
            EventTooltip={EventTooltip}
            labelProps={{
              key: d.key,
              title: d.labelTitle,
              LabelComponent: LabelComponent,
            }}
          />
        ))}
      </Box>
    </FullCalendarContext.Provider>
  );
}

function Month({ month: { nbOfDays, day }, first }) {
  return (
    <Box
      component="div"
      sx={{
        ...monthLabel,
        gridColumnEnd: `span ${nbOfDays}`,
        gridColumnStart: first ? 2 : "auto",
        pl: "1em",
        display: "flex",
        alignItems: "center",
      }}
    >
      {formatMonthYear(day)}
    </Box>
  );
}

const Day = React.forwardRef(({ day, first, sx = {}, ...props }, ref) => (
  <Box
    sx={(theme) => ({
      textAlign: "center",
      gridColumnStart: first ? 2 : "auto",
      ...sx(theme),
    })}
    ref={ref}
    {...props}
  >
    <Box>{formatSimpleDayLabel(day)}</Box>
    <Box>{formatDayDate(day)}</Box>
  </Box>
));
Day.displayName = "Day";

function SpecialDay({ day, specialLabel, specialStyle, first }) {
  return (
    <Tooltip title={specialLabel} placement="top" arrow>
      <Day first={first} day={day} sx={specialStyle} />
    </Tooltip>
  );
}

const dataOverlapInterval = (data, interval) => {
  return data.some(({ start, end }) =>
    areIntervalsOverlapping({ start, end }, interval, { inclusive: true })
  );
};

export function cellHeight(coef) {
  return minCellSize + coef * 5;
}
