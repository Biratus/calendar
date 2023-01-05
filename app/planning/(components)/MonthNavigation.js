"use client";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Button, Stack } from "@mui/material";
import FastSelectMonth from "./FastSelectMonth";
import { useMonthNavigation } from "./MonthNavigationProvider";

export default function MonthNavigation({
  disabled: { set, prev, next } = { set: false, prev: false, next: false },
}) {
  const [month, prevMonth, nextMonth, setMonth] = useMonthNavigation();
  return (
    <Stack direction="row" spacing={2} m={1} justifyContent="center">
      <FastSelectMonth
        focusedMonth={month}
        onChange={setMonth}
        color="ajcBlue"
        variant="outlined"
        disabled={set}
      />
      <Button
        variant="contained"
        onClick={prevMonth}
        startIcon={<ArrowBackIosNewRoundedIcon />}
        color="ajcBlue"
        disabled={prev}
      >
        Mois précédent
      </Button>
      <Button
        variant="contained"
        onClick={nextMonth}
        endIcon={<ArrowForwardIosRoundedIcon />}
        color="ajcBlue"
        disabled={next}
      >
        Mois suivant
      </Button>
    </Stack>
  );
}
