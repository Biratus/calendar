"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import { formatMonthYear } from "../../../lib/date";
import { monthLabel } from "../../calendar/styles/styles";
import CalendarCell from "./CalendarCell";

export default function CalendarMonth({ days,context }) {

  return (
    <>
      <Box
        sx={{
          gridColumnEnd: `span 7`,
          p: "1em",
          top: "3.15em",
          ...monthLabel,
        }}
      >
        {formatMonthYear(days[0].date)}
      </Box>
      {days.map((d, id) => (
        <CalendarCell
          key={id}
          day={d}
          context={context}
        />
      ))}
    </>
  );
}
