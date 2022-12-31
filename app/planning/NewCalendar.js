"use client";
import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useTheme } from "@mui/material";
import { vi } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useMemo, useReducer } from "react";
import { missingFormateurStyle } from "../../components/calendar/styles/styles";
import SplitModuleModal from "../../components/modals/SplitModuleModal";
import SwitchFormateurModal from "../../components/modals/SwitchFormateurModal";
import FullCalendar from "../../components/newCalendar/FullData/CalendarData";
import PopUpMenu from "../../components/PopUpMenu/PopUpMenu";
import { toCalendarData } from "../../lib/calendar";
import {
  colorListFromModules,
  getColorsForLabels,
  missingFormateurLegend,
} from "../../lib/colors";
import { splitModule, switchFormateur } from "../../lib/dataAccess";
import { format } from "../../lib/date";
import { isFormateurMissing } from "../../lib/realData";
import Calendar from "./Calendar";
import { FiliereView, FormateurView } from "./CalendarViews";
import Legend from "./Legend";

const hoverElementsInit = {
  menuAnchor: null,
  switchModal: false,
  splitModal: false,
  module: null,
};

export default function CommonCalendar({
  modules,
  month,
  joursFeries,
  view,
  monthLength = 3,
}) {
  const router = useRouter();
  const [hoverProps, hoverDispatch] = useReducer(
    hoverReducer,
    hoverElementsInit
  );
  const menuItems = [
    {
      icon: <SwapHorizIcon />,
      text: "Modifier le formateur",
      onClick: () => hoverDispatch({ type: "SWITCH_FORM" }),
    },
    {
      icon: <SafetyDividerIcon />,
      text: "Scinder le module",
      onClick: () => hoverDispatch({ type: "SPLIT_MODULE" }),
    },
  ];
  const [legendList, colors] = colorListFromModules(modules, [
    missingFormateurLegend,
  ]);

  const closeModals = () => {
    hoverDispatch({ type: "CLOSE_MODAL" });
  };

  const reloadModules = async () => {
    router.refresh();
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

  const calendarFiliere = useMemo(
    () => (
      <CalendarFiliere
        legend={colors}
        modules={modules}
        month={month}
        joursFeries={joursFeries}
        eventClick={(event, ref) =>
          hoverDispatch({
            type: "OPEN",
            value: { anchor: ref, module: event },
          })
        }
      />
    ),
    [modules, month]
  );

  const calendarFormateur = useMemo(
    () => (
      <CalendarFormateur
        legend={colors}
        modules={modules}
        month={month}
        joursFeries={joursFeries}
        eventClick={(event, ref) =>
          hoverDispatch({
            type: "OPEN",
            value: { anchor: ref, module: event },
          })
        }
      />
    ),
    [modules, month]
  );

  return (
    <>
      {(!view || view === "filiere") && calendarFiliere}
      {view && view === "formateur" && calendarFormateur}
      <Legend legendList={legendList} />
      <PopUpMenu
        anchorEl={hoverProps.menuAnchor}
        onClose={() => hoverDispatch({ type: "CLOSE_MENU" })}
        header={hoverProps.module?.label}
        items={menuItems}
      />
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
    </>
  );
}

function CalendarFiliere({
  modules,
  month,
  joursFeries,
  monthLength = 3,
  eventClick,
  legend,
}) {
  const calendarData = toCalendarData(
    modules,
    "filiere",
    FiliereView,
    true
  );

  return (
    <FullCalendar
      data={calendarData}
      time={{ start: month, monthLength }}
      event={{
        color: (evt) => legend[evt.theme],
        onClick: eventClick,
        highlighted: isFormateurMissing,
        highlightedProp: missingFormateurStyle,
      }}
      day={{
        highlighted: (day) => isJoursFeries(joursFeries, day),
        highlightedProp: { color: "red" },
        highlightInfo: (day) => getJourFeries(joursFeries, day),
      }}
      view={FiliereView}
    />
  );
}

function CalendarFormateur({
  modules,
  month,
  joursFeries,
  monthLength = 3,
  eventClick,
  legend,
}) {
  const calendarData = toCalendarData(
    modules.filter((m) => !isFormateurMissing(m)),
    'formateur.mail',
    FormateurView,
    true,
  );
  console.log({calendarData})
  return (
    <>
      <FullCalendar
        data={calendarData}
        time={{ start: month, monthLength }}
        event={{
          color: (evt) => legend[evt.theme],
          onClick: eventClick,
          highlighted: isFormateurMissing,
          highlightedProp: missingFormateurStyle,
        }}
        day={{
          highlighted: (day) => isJoursFeries(joursFeries, day),
          highlightedProp: { color: "red" },
          highlightInfo: (day) => getJourFeries(joursFeries, day),
        }}
        view={FormateurView}
      />
    </>
  );
}

const isJoursFeries = (joursFeries, day) => {
  return joursFeries.hasOwnProperty(format(day, "yyyy-MM-dd"));
};

const getJourFeries = (joursFeries, day) => {
  return joursFeries[format(day, "yyyy-MM-dd")];
};

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
      state.menuAnchor = null;
      state.switchModal = false;
      state.splitModal = false;
      break;
  }
  return { ...state };
};

const legendListFromTheme = (themeList, colors) =>
  [...new Set(themeList)].map((label) => ({
    label,
    color: colors[label],
  }));
