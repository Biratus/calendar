"use client";
import { Button, Stack } from "@mui/material";
import Dropdown from "../../components/Dropdown/Dropdown";
import FastSelectMonth from "./FastSelectMonth";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { FiliereView, FormateurView } from "./CalendarViews";
import {
  usePathname,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import { addMonths, startOfMonth, startOfToday, subMonths } from "date-fns";
import { formatMonthYear, parseMonthAndYear } from "../../lib/date";
import { searchParamsClone } from "../../lib/navigation";
import { getColorsForLabels } from "../../lib/colors";
import { modules, themes } from "../../lib/realData";
import { missingFormateurStyle } from "../../components/calendar/styles/styles";
import Legend from "./Legend";
const views = {
  filiere: FiliereView,
  formateur: FormateurView,
};

const monthStart = startOfMonth(startOfToday());

export default function Layout({ children }) {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const seg = useSelectedLayoutSegment();

  const disabledViewDropdown = Boolean(seg);
  const disabledMonthNavigation = Boolean(seg) && seg !== 'formateur'; 

  const focusedDay = params.get("date")
    ? parseMonthAndYear(params.get("date"))
    : monthStart;
  const viewParam = params.get("view");
  const view =
    viewParam && views.hasOwnProperty(viewParam)
      ? views[viewParam]
      : views.filiere;

  const viewActions = Object.keys(views).map((k) => {
    return {
      label: views[k].label,
      onClick: () => replaceRoute({ view: k }),
      selected: view == views[k],
    };
  });
  const monthNavigation = ({ type, value }) => {
    let newMonth;
    switch (type) {
      case "NEXT_MONTH":
        newMonth = addMonths(focusedDay, 1);
        break;
      case "PREV_MONTH":
        newMonth = subMonths(focusedDay, 1);
        break;
      case "SET_MONTH":
        newMonth = startOfMonth(value);
        break;
    }
    replaceRoute({ date: formatMonthYear(newMonth) });
  };
  const replaceRoute = (additionalParams) => {
    let newParams = searchParamsClone(params);

    for (let k in additionalParams) {
      newParams.set(k, additionalParams[k]);
    }
    router.replace(path + "?" + newParams.toString());
  };
  return (
    <>
      <Stack direction="row" spacing={2} m={1} justifyContent="center">
        <Dropdown
          label="Changer de vue"
          actions={viewActions}
          variant="outlined"
          color="ajcBlue"
          disabled={disabledViewDropdown}
        />
        <FastSelectMonth
          focusedMonth={focusedDay}
          onChange={(value) => monthNavigation({ type: "SET_MONTH", value })}
          color="ajcBlue"
          variant="outlined"
          disabled={disabledMonthNavigation}
        />
        <Button
          variant="contained"
          onClick={() => monthNavigation({ type: "PREV_MONTH" })}
          startIcon={<ArrowBackIosNewRoundedIcon />}
          color="ajcBlue"
          disabled={disabledMonthNavigation}
        >
          Mois précédent
        </Button>
        <Button
          variant="contained"
          onClick={() => monthNavigation({ type: "NEXT_MONTH" })}
          endIcon={<ArrowForwardIosRoundedIcon />}
          color="ajcBlue"
          disabled={disabledMonthNavigation}
        >
          Mois suivant
        </Button>
      </Stack>
      {children}
    </>
  );
}
