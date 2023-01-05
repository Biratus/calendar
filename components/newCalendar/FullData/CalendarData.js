"use client";

import { Box, Skeleton, Tooltip, useTheme } from "@mui/material";
import {
  addMonths,
  areIntervalsOverlapping,
  eachDayOfInterval,
  endOfMonth,
  isWeekend,
  parseISO,
  startOfMonth,
} from "date-fns";
import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../../../hooks/localStorageHook";
import { makeMonths } from "../../../lib/calendar";
import {
  formatDayDate,
  formatMonthYear,
  formatSimpleDayLabel,
} from "../../../lib/date";
import { monthLabel, weekend } from "../../calendar/styles/styles";
import ZoomUI from "../../calendar/ZoomUI";
import CalendarRow from "./CalendarRow";

const zoomCoefKey = "zoom_calendar_full";
const minCellSize = 20;

export default function FullCalendar({
  data: originalData,
  time: { start, monthLength },
  event,
  day,
}) {
  const theme = useTheme();
  const [zoom, setZoom, loaded] = useLocalStorage(zoomCoefKey, 2);
  const { highlighted, highlightedProp, highlightInfo } = day;

  const month = start;
  const months = useMemo(() => makeMonths(month, monthLength), [month]);

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
      highlighted(day) ? (
        <SpecialDay key={i} day={day} specialLabel={highlightInfo(day)} specialStyle={{
          ...(isWeekend(day) && weekend[theme.palette.mode]),
          ...highlightedProp,}} first={i == 0}/>
      ) : (
        <Day
          key={i}
          first={i == 0}
          day={day}
          sx={{ ...(isWeekend(day) && weekend[theme.palette.mode]) }}
        />
      )
    );
  }, [days, highlighted, highlightedProp, theme.palette.mode]);

  const monthRow = useMemo(() => {
    return months.map((m, i) => <Month month={m} key={i} first={i == 0} />);
  }, [months]);

  const loadingUI = useMemo(() => {
    let height = minCellSize + zoom * 5;
    return [
      <Skeleton
        key={0}
        sx={{ bgcolor: "grey.900" }}
        variant="rounded"
        height={height}
        width="100%"
      />,
      days.map((d, i) => (
        <Skeleton
          key={i + 1}
          sx={{ bgcolor: "grey.900" }}
          variant="rectangle"
          height={height}
          width="100%"
        />
      )),
    ];
  }, [days, zoom]);

  const FullCalendarContext = createContext();
  return (
    <FullCalendarContext.Provider
      value={{
        zoom,
        event,
        day,
        days,
      }}
    >
      <ZoomUI range={5} onChange={setZoom} value={zoom} />
      <Box
        sx={{
          gridTemplateColumns: `${10 + zoom}% repeat(${days.length},${
            minCellSize + zoom * 5
          }px)`,
          gridTemplateRows: `1fr 1fr ${
            data.length
              ? `repeat(${data.length},${minCellSize + zoom * 5}px)`
              : ""
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
        {!loaded
          ? loadingUI
          : data.map((d, i) => (
              <CalendarRow
                key={i}
                events={d.events}
                labelProps={{ title: d.labelTitle, comp: d.labelComponent }}
                context={FullCalendarContext}
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
    sx={{
      textAlign: "center",
      gridColumnStart: first ? 2 : "auto",
      ...sx,
    }}
    ref={ref}
    {...props}
  >
    <Box>{formatSimpleDayLabel(day)}</Box>
    <Box>{formatDayDate(day)}</Box>
  </Box>
));

function SpecialDay({day,specialLabel,specialStyle,first}) {
  return (
    <Tooltip title={specialLabel} placement="top" arrow>
      <Day
        first={first}
        day={day}
        sx={{...specialStyle}}
      />
    </Tooltip>
  );
}

const dataOverlapInterval = (data, interval) => {
  return data.some(({ start, end }) =>
    areIntervalsOverlapping({ start, end }, interval, { inclusive: true })
  );
};
