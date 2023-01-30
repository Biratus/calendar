"use client";

import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from "react";
import SplitModuleModal from "../../../components/modals/SplitModuleModal";
import SwitchFormateurModal from "../../../components/modals/SwitchFormateurModal";
import PopUpMenu from "../../../components/PopUpMenu/PopUpMenu";
import { splitModule, switchFormateur } from "../../../lib/dataAccess";
import { format } from "../../../lib/date";
import OverlapModuleOverlay from "./OverlapModuleOverlay";

const CalendarContext = createContext();
const hoverElementsInit = {
  anchorEl: null,
  switchModal: false,
  splitModal: false,
  module: null,
  overlapDisplay: false,
  menuOpen: false,
};

// Stuff to handle pop over components (menu, modals)
export default function CalendarProvider({ joursFeries, children }) {
  // Menu State
  const [hoverProps, hoverDispatch] = useReducer(
    hoverReducer,
    hoverElementsInit
  );

  // Drag
  const draggedModule = useRef(null);

  // Menu Stuffs
  const menuItems = useMemo(() => [
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
  ]);

  /* 
  --------------------------
   HOVER DISPATCH 
  -------------------------- */
  const openMenu = useCallback(
    (event, ref) =>
      hoverDispatch({
        type: "OPEN_MENU",
        value: { anchor: ref, module: event },
      }),
    []
  );

  const closeModals = useCallback(() => {
    hoverDispatch({ type: "CLOSE_MODAL" });
  }, []);

  const showOverlapModules = useCallback((event, ref) => {
    hoverDispatch({
      type: "OVERLAP_DISPLAY",
      value: { module: event, anchor: ref },
    });
  }, []);

  const closeOverlapModuleOverlay = useCallback(() => {
    hoverDispatch({ type: "CLOSE_OVERLAP_DISPLAY" });
  }, []);

  /* 
  --------------------------
    OTHERS
  -------------------------- */

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

  const draggedModuleGetter = useCallback(() => draggedModule.current,[]);
  const draggedModuleSetter = useCallback((newValue) => draggedModule.current = newValue,[]);

  return (
    <CalendarContext.Provider
      value={{
        openMenu,
        showOverlapModules,
        isJoursFeries,
        getJourFeries,
        draggedModule: draggedModuleGetter,
        setDraggedModule: draggedModuleSetter,
      }}
    >
      {children}
      {hoverProps.menuOpen && (
        <PopUpMenu
          anchorEl={hoverProps.anchorEl}
          onClose={() => hoverDispatch({ type: "CLOSE_MENU" })}
          header={hoverProps.module?.label}
          items={menuItems}
        />
      )}
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
      {hoverProps.overlapDisplay && (
        <OverlapModuleOverlay
          anchorEl={hoverProps.anchorEl}
          onClose={closeOverlapModuleOverlay}
          data={hoverProps.module}
          selectModule={(mod) => {
            draggedModule.current = mod;
          }}
        />
      )}
    </CalendarContext.Provider>
  );
}
const hoverReducer = (state, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      state.menuOpen = true;
      state.anchorEl = action.value.anchor;
      state.module = action.value.module;
      break;
    case "SPLIT_MODULE":
      state.anchorEl = null;
      state.splitModal = true;
      break;
    case "SWITCH_FORM":
      state.anchorEl = false;
      state.switchModal = true;
      break;
    case "CLOSE_MENU":
      state.menuOpen = false;
      state.anchorEl = null;
      break;
    case "CLOSE_MODAL":
      state.anchorEl = null;
      state.switchModal = false;
      state.splitModal = false;
      break;
    case "OVERLAP_DISPLAY":
      state.overlapDisplay = true;
      state.module = action.value.module;
      state.anchorEl = action.value.anchor;
      break;
    case "CLOSE_OVERLAP_DISPLAY":
      state.overlapDisplay = false;
      state.module = null;
      state.anchorEl = null;
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
