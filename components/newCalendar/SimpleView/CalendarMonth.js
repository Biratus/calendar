"use client";

import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { formatMonthYear } from "../../../lib/date";
import InfoTooltip from "../../calendar/InfoTooltip";
import { monthLabel } from "../../calendar/styles/styles";
import CalendarCell from "./CalendarCell";

export default function CalendarMonth({ days, context }) {

  const {event:{tooltipAdditionalInfo}} = useContext(context);
  
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
          Tooltip={
            d.event &&
            (({ children, event,...props }) => (
              <InfoTooltip
                tooltipProps={{ ...props }}
                titleProps={{
                  ...event,
                  additionalInfos: tooltipAdditionalInfo(event),
                }}
              >
                {children}
              </InfoTooltip>
            ))
          }
        />
      ))}
    </>
  );
}
