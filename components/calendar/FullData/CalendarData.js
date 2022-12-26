"use client";

import { Box, Skeleton, useTheme } from "@mui/material";
import {
  eachDayOfInterval,
  endOfMonth,
  isWeekend,
  startOfMonth,
} from "date-fns";
import { useContext, useMemo } from "react";
import { useLocalStorage } from "../../../hooks/localStorageHook";
import {
  formatDayDate,
  formatMonthYear,
  formatSimpleDayLabel,
} from "../../../lib/date";
import { CalendarContext } from "../CustomCalendar";
import { monthLabel, weekend } from "../styles/styles";
import ZoomUI from "../ZoomUI";
import CalendarRow from "./CalendarRow";

const zoomCoefKey = "zoom_calendar_full";
const minCellSize = 20;

export default function CalendarData() {
  const theme = useTheme();
  const { months, data, day:{highlighted,highlightedProp} } =
    useContext(CalendarContext);
  const [zoom, setZoom, loaded] = useLocalStorage(zoomCoefKey, 2);

  const dayLimit = endOfMonth(months[months.length - 1].day);
  const days = eachDayOfInterval({
    start: startOfMonth(months[0].day),
    end: dayLimit,
  });

  const daysRow = useMemo(() => {
    return days.map((day, i) => (
      <Day
        day={day}
        key={i}
        sx={{
          gridColumnStart: i == 0 ? 2 : "auto",
          ...(isWeekend(day) && weekend[theme.palette.mode]),
          ...(highlighted(day) && highlightedProp),
        }}
      />
    ));
  }, [days, highlighted,highlightedProp, theme.palette.mode]);

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
  },[days,zoom]);

  return (
    <>
      <ZoomUI range={5} onChange={setZoom} value={zoom} />
      <Box
        sx={{
          gridTemplateColumns: `${10 + zoom}% repeat(${days.length},${
            minCellSize + zoom * 5
          }px)`,
          gridTemplateRows: `1fr 1fr repeat(${data.length},${
            minCellSize + zoom * 5
          }px)`,
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
                days={days}
              />
            ))}
      </Box>
    </>
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

const Day = ({ day, sx = {} }) => (
  <Box
    sx={{
      textAlign: "center",
      ...sx,
    }}
  >
    <Box>{formatSimpleDayLabel(day)}</Box>
    <Box>{formatDayDate(day)}</Box>
  </Box>
);
