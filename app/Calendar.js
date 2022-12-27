"use client";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";
import { addMonths, startOfMonth, startOfToday, subMonths } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useReducer, useState } from "react";
import CustomCalendar from "../components/calendar/CustomCalendar";
import InfoTooltip from "../components/calendar/InfoTooltip";
import Dropdown from "../components/Dropdown/Dropdown";
import SplitModuleModal from "../components/modals/SplitModuleModal";
import SwitchFormateurModal from "../components/modals/SwitchFormateurModal";
import { mapISO, toCalendarData } from "../lib/calendar";
import { getColorsForLabels } from "../lib/colors";
import { fetchMods, splitModule, switchFormateur } from "../lib/dataAccess";
import { format, formatMonthYear, parseMonthAndYear } from "../lib/date";
import { searchParamsClone } from "../lib/navigation";
import { isFormateurMissing } from "../lib/realData";
import { FiliereView, FormateurView } from "./CalendarViews";
import FastSelectMonth from "./FastSelectMonth";
import Legend from "./Legend";

const hoverElementsInit = {
  menuAnchor: null,
  switchModal: false,
  splitModal: false,
  module: null,
};

const missingFormateurStyle = (eventColor) => ({
  background: `repeating-linear-gradient(30deg,
    transparent,
    ${eventColor} 20%,
    transparent 40%)`,
});

const monthStart = startOfMonth(startOfToday());

export default function Calendar({ modules: originalModules, joursFeries }) {
  const theme = useTheme();
  const router = useRouter();
  const params = useSearchParams();

  const focusedDay = params.get("date")
    ? parseMonthAndYear(params.get("date"))
    : monthStart;

  const [modules, setModules] = useState(parseDates(originalModules));

  const viewParam = params.get("view");
  const view =
    viewParam && views.hasOwnProperty(viewParam)
      ? views[viewParam]
      : views.filiere;

  const [hoverProps, hoverDispatch] = useReducer(
    hoverReducer,
    hoverElementsInit
  );

  const viewActions = Object.keys(views).map((k) => {
    return {
      label: views[k].label,
      onClick: () => replaceRoute({ view: k }),
      selected: view == views[k],
    };
  });

  // Transform module to filiere map
  const calendarData = toCalendarData(modules, view.calendarRowLabel);

  const themeList = calendarData.flatMap((d) => d.events).map((e) => e.theme);

  const colors = getColorsForLabels(themeList, theme.palette.mode);

  const eventClick = (event, ref) => {
    hoverDispatch({ type: "OPEN", value: { anchor: ref, module: event } });
  };

  const closeModals = () => {
    hoverDispatch({ type: "CLOSE_MODAL" });
  };

  const reloadModules = async () => {
    setModules(parseDates(await fetchMods()));
  };

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

  const submitSwitchForm = async (newModule) => {
    const success = await switchFormateur(newModule);
    if (!success) return false;

    reloadModules();
    return true;
  };

  const submitSplitModule = async ({ split, formateurs }) => {
    const success = await splitModule({ split, formateurs });
    if (!success) return false;

    reloadModules();
    return true;
  };

  const replaceRoute = (additionalParams) => {
    let newParams = searchParamsClone(params);

    for (let k in additionalParams) {
      newParams.set(k, additionalParams[k]);
    }
    router.replace("?" + newParams.toString());
  };

  const eventMenu = (
    <Menu
      anchorEl={hoverProps.menuAnchor}
      open={Boolean(hoverProps.menuAnchor)}
      onClose={() => hoverDispatch({ type: "CLOSE_MENU" })}
    >
      <MenuItem disabled sx={{ fontWeight: "bold" }}>
        {hoverProps.module && hoverProps.module.label}
      </MenuItem>
      <MenuItem onClick={() => hoverDispatch({ type: "SWITCH_FORM" })}>
        <ListItemIcon>
          <SwapHorizIcon />
        </ListItemIcon>
        <ListItemText>Modifier le formateur</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => hoverDispatch({ type: "SPLIT_MODULE" })}>
        <ListItemIcon>
          <SafetyDividerIcon />
        </ListItemIcon>
        <ListItemText>Scinder le module</ListItemText>
      </MenuItem>
    </Menu>
  );

  const isJoursFeries = (day) => {
    return joursFeries.hasOwnProperty(format(day, "yyyy-MM-dd"));
  };

  const getJourFeries = (day) => {
    return joursFeries[format(day, "yyyy-MM-dd")];
  }

  const calendarUI = useMemo(
    () => (
      <CustomCalendar
        data={calendarData}
        event={{
          tooltip: (event) => (
            <InfoTooltip
              additionalInfos={view.tooltipAdditionalInfo(event)}
              {...event}
            />
          ),
          color: (evt) => colors[evt.theme],
          onClick: eventClick,
          highlighted: isFormateurMissing,
          highlightedProp: missingFormateurStyle,
        }}
        day={{
          focus: focusedDay,
          highlighted: isJoursFeries,
          highlightedProp: { color: "red" },
          highlightInfo:getJourFeries
        }}
        detailed={{ ...view.detailed }}
      />
    ),
    [calendarData, view, colors]
  );

  const legendList = [
    ...[...new Set(themeList)].map((label) => ({
      label,
      color: colors[label],
    })),
    { label: "Formateur non défini", color: missingFormateurStyle("grey") },
  ];

  return (
    <>
      <Stack direction="row" spacing={2} m={1} justifyContent="center">
        <Dropdown
          label="Changer de vue"
          actions={viewActions}
          variant="outlined"
          color="ajcBlue"
          disabled={Boolean(params.get("focus"))}
        />
        <FastSelectMonth
          focusedMonth={focusedDay}
          onChange={(value) => monthNavigation({ type: "SET_MONTH", value })}
          color="ajcBlue"
          variant="outlined"
        />
        <Button
          variant="contained"
          onClick={() => monthNavigation({ type: "PREV_MONTH" })}
          startIcon={<ArrowBackIosNewRoundedIcon />}
          color="ajcBlue"
        >
          Mois précédent
        </Button>
        <Button
          variant="contained"
          onClick={() => monthNavigation({ type: "NEXT_MONTH" })}
          endIcon={<ArrowForwardIosRoundedIcon />}
          color="ajcBlue"
        >
          Mois suivant
        </Button>
      </Stack>
      {calendarUI}
      <Legend legendList={legendList} />
      {hoverProps.module && hoverProps.switchModal && (
        <SwitchFormateurModal
          module={hoverProps.module}
          open={hoverProps.switchModal}
          close={closeModals}
          submit={submitSwitchForm}
        />
      )}
      {hoverProps.module && hoverProps.splitModal && (
        <SplitModuleModal
          module={hoverProps.module}
          open={hoverProps.splitModal}
          close={closeModals}
          submit={submitSplitModule}
        />
      )}
      {eventMenu}
    </>
  );
}

function parseDates(list) {
  return mapISO(list, ["start", "end"]);
}

const views = {
  filiere: FiliereView,
  formateur: FormateurView,
};

// Reducers

const hoverReducer = (state, action) => {
  switch (action.type) {
    case "OPEN":
      state.menuAnchor = action.value.anchor;
      state.module = action.value.module;
      break;
    case "SPLIT_MODULE":
      state.menuAnchor = null;
      state.splitModal = true;
      break;
    case "SWITCH_FORM":
      state.menuAnchor = false;
      state.switchModal = true;
      break;
    case "CLOSE_MENU":
      state.menuAnchor = null;
      break;
    case "CLOSE_MODAL":
      state.menuAnchor = null; // On sait jamais
      state.switchModal = false;
      state.splitModal = false;
      break;
  }
  return { ...state };
};
