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
  view,
}) {
  const theme = useTheme();
  const [zoom, setZoom, loaded] = useLocalStorage(zoomCoefKey, 2);
  const { highlighted, highlightedProp, highlightInfo } = day;

  const month = parseISO(start);
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
        <Tooltip key={i} title={highlightInfo(day)} placement="top" arrow>
          <Day
            day={day}
            sx={{
              gridColumnStart: i == 0 ? 2 : "auto",
              ...(isWeekend(day) && weekend[theme.palette.mode]),
              ...highlightedProp,
            }}
          />
        </Tooltip>
      ) : (
        <Day
          day={day}
          key={i}
          sx={{
            gridColumnStart: i == 0 ? 2 : "auto",
            ...(isWeekend(day) && weekend[theme.palette.mode]),
          }}
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
        tooltipAdditionalInfo: (event) => view.tooltipAdditionalInfo(event),
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
                label={d.label}
                events={d.events}
                labelComponent={view.labelComponent(d.label)}
                context={FullCalendarContext}
              />
            ))}
      </Box>
    </FullCalendarContext.Provider>
  );
}

const Month = ({ month: { nbOfDays, day }, first }) => (
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

const Day = React.forwardRef(({ day, sx = {}, ...props }, ref) => (
  <Box
    sx={{
      textAlign: "center",
      ...sx,
    }}
    ref={ref}
    {...props}
  >
    <Box>{formatSimpleDayLabel(day)}</Box>
    <Box>{formatDayDate(day)}</Box>
  </Box>
));

const makeMonths = (month, length) => {
  let months = [];
  for (let i = 0; i <= length; i++) {
    let m = addMonths(month, i);
    months.push({ day: startOfMonth(m), nbOfDays: endOfMonth(m).getDate() });
  }
  return months;
};

const dataOverlapInterval = (data, interval) => {
  return data.some(({ start, end }) =>
    areIntervalsOverlapping({ start, end }, interval, { inclusive: true })
  );
};
