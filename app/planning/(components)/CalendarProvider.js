"use client";

import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import SplitModuleModal from "../../../components/modals/SplitModuleModal";
import SwitchFormateurModal from "../../../components/modals/SwitchFormateurModal";
import PopUpMenu from "../../../components/PopUpMenu/PopUpMenu";
import { splitModule, switchFormateur } from "../../../lib/dataAccess";
import { format } from "../../../lib/date";

const CalendarContext = createContext();
const hoverElementsInit = {
  menuAnchor: null,
  switchModal: false,
  splitModal: false,
  module: null,
};

// Stuff to handle pop over components (menu, modals)
export default function CalendarProvider({ joursFeries, children }) {
  // Menu State
  const [hoverProps, hoverDispatch] = useReducer(
    hoverReducer,
    hoverElementsInit
  );

  // Menu Stuffs
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

  const openMenu = (event, ref) =>
    hoverDispatch({
      type: "OPEN",
      value: { anchor: ref, module: event },
    });

  const closeModals = () => {
    hoverDispatch({ type: "CLOSE_MODAL" });
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

  const isJoursFeries = useCallback(
    (day) => joursFeries.hasOwnProperty(format(day, "yyyy-MM-dd")),
    [joursFeries]
  );

  const getJourFeries = useCallback(
    (day) => joursFeries[format(day, "yyyy-MM-dd")],
    [joursFeries]
  );

  return (
    <CalendarContext.Provider
      value={{ openMenu, isJoursFeries, getJourFeries }}
    >
      {children}
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
    </CalendarContext.Provider>
  );
}
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

export function useCalendar() {
  const ctx = useContext(CalendarContext);
  if (ctx === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return ctx;
}
