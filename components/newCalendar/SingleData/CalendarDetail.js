import { Box, Paper } from "@mui/material";
import { isSameMonth } from "date-fns";
import { useContext, useMemo } from "react";
import { formatMonthYear, nbOfDaysBetween } from "../../../lib/date";
import CalendarRow from "./CalendarRow";


export default function CalendarDetail({ sx, events,cellHeight,additionalLabel,AdditionalInfo,context }) {
  const dayNb = events.reduce(
    (acc, { start, end }) => acc + nbOfDaysBetween(start, end),
    0
  );

  const commonHeaderStyle = {
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey.300",
  };

  const eventsUI = useMemo(() => {
    let eventsComp = [];
    let currMonth = events[0].start;
    let currIndexToAdd = 0;
    let currDayCumul = 0;
    let monthAdded = 0;

    for (let i in events) {
      let event = events[i];
      if (!isSameMonth(currMonth, event.end)) {
        let span = currDayCumul;
        if (event == events[events.length - 1])
          span += nbOfDaysBetween(event.start, event.end);
        eventsComp.splice(
          currIndexToAdd,
          0,
          <Month
            name={formatMonthYear(currMonth)}
            span={currDayCumul}
            key={`month${i}`}
          />
        );
        monthAdded++;
        currIndexToAdd = parseInt(i) + monthAdded;
        currMonth = event.end;
        currDayCumul = 0;
      }

      currDayCumul += nbOfDaysBetween(event.start, event.end);
      eventsComp.push(<CalendarRow event={event} key={i} context={context} AdditionalInfo={AdditionalInfo} />);
    }

    let lastEvt = events[events.length - 1];
    if (isSameMonth(currMonth, lastEvt.end)) {
      // Le dernier mois n'est pas ajouté
      eventsComp.splice(
        currIndexToAdd,
        0,
        <Month
          name={formatMonthYear(currMonth)}
          span={currDayCumul}
          key={`lastMonth`}
        />
      );
    }

    return eventsComp;
  }, [events,AdditionalInfo,context]);

  return (
    <Box sx={{ ...sx }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "7% 1fr 3fr 2fr",
          gridTemplateRows: `2em repeat(${dayNb},${cellHeight})`,
          px: 5,
          py: 2,
        }}
        component={Paper}
        variant="outlined"
      >
        <Box sx={{ ...commonHeaderStyle, gridColumnStart: 3 }}>Évenement</Box>
        <Box sx={{ ...commonHeaderStyle }}>{additionalLabel}</Box>
        {eventsUI}
      </Box>
    </Box>
  );
}

function Month({ name, span }) {
  return (
    <Box
      sx={{
        gridRow: "span " + span,
        writingMode: "vertical-rl",
        pt: 4,
        px: 2,
        verticalAlign: "center",
        color: "ajcBlue.dark",
        fontWeight: "bold",
        background:
          "linear-gradient(-120deg, hsl(47, 49%, 61%) 0%, hsl(47, 49%, 61%) 19%, rgba(0,0,0,0) 50%)",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {name}
    </Box>
  );
}
