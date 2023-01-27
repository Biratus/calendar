import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  addDays,
  eachDayOfInterval,
  formatISO,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { useMemo, useState } from "react";
import FullCalendar from "../../../components/newCalendar/FullData/CalendarData";
import {
  mergeModule,
  moduleOverlap,
  toCalendarData,
} from "../../../lib/calendar";
import { useCalendar } from "./CalendarProvider";
import { FiliereView } from "./CalendarViews";

export default function CalendarFiliere({
  modules: originalModules,
  day,
  event,
  ...props
}) {
  const [modules, setModules] = useState(originalModules);
  const calendarData = useMemo(
    () => toCalendarData(modules, "filiere", FiliereView, true),
    [modules]
  );
  const { showOverlapModules, draggedModule, setDraggedModule } = useCalendar();
  // DropTarget: interval de drop
  const [dropTarget, setDropTarget] = useState(null);

  // check overlapping modules
  for (let filiere of calendarData) {
    let newEvents = [];
    for (let mod of filiere.events) {
      let overlap = null;
      for (let eventIndex in newEvents) {
        let event = newEvents[eventIndex];
        if (moduleOverlap(mod, event)) {
          if (overlap) {
            overlap = mergeModule(overlap, event);
          } else {
            overlap = mergeModule(event, mod);
          }
          newEvents.splice(eventIndex, 1);
        }
      }
      if (!overlap) newEvents.push(mod);
      else {
        overlap.duration = eachDayOfInterval(overlap).length;
        overlap.label = (
          <>
            <WarningAmberIcon color="error" /> Modules superposés
          </>
        );
        newEvents.push(overlap);
      }
    }
    filiere.events = newEvents;
  }

  const isDropTarget = (day) => {
    return dropTarget && isWithinInterval(day, dropTarget);
  };

  const cleanDropTarget = () => {
    setDropTarget(null);
  };

  const changeDropTarget = (dayAndEvent, evt) => {
    let targetDay;
    if (!dayAndEvent.event || dayAndEvent.event.duration == 1) {
      // Simple day or single day event
      targetDay = dayAndEvent.date;
    } else {
      // Day with event accross multiple days
      // Calculate on which day it was droped
      targetDay = getTargetDay(dayAndEvent.event, {
        targetWidth: evt.currentTarget.clientWidth,
        mouseOffsetX: evt.nativeEvent.layerX,
      });
    }
    if (!dropTarget || !isSameDay(targetDay, dropTarget.start)) {
      setDropTarget({
        start: targetDay,
        end: addDays(targetDay, draggedModule().duration - 1),
      });
    }
  };

  const dropModule = () => {
    const newModules = modules.filter((m) => m.id != draggedModule().id);
    let newModule = draggedModule();
    newModule.start = formatISO(dropTarget.start);
    newModule.end = formatISO(dropTarget.end);
    newModules.push(newModule);
    setModules(newModules);
    cleanDropTarget();
  };

  return (
    <FullCalendar
      {...props}
      data={calendarData}
      EventTooltip={FiliereView.EventTooltip}
      LabelComponent={FiliereView.LabelComponent}
      day={{
        ...day,
        styleProps: (date, theme) => {
          let style = { ...day.styleProps(date, theme) };
          if (isDropTarget(date)) style.backgroundColor = "#D6C588";
          return style;
        },
      }}
      event={{
        ...event,
        onClick: (mod, ref) => {
          if (mod.overlap) {
            showOverlapModules(mod, ref);
          } else event.onClick(mod, ref);
        },
      }}
      drag={{
        drag: (dayAndEvent, row, evt) => {
          if (!dayAndEvent.event.overlap) setDraggedModule(dayAndEvent.event);
          else evt.preventDefault();
        },
        enter: (dayAndEvent, row, evt) => {
          if (draggedModule().filiere !== row) {
            cleanDropTarget();
            return;
          }
          changeDropTarget(dayAndEvent, evt);
        },
        leave: (dayAndEvent, row, evt) => {
          if (draggedModule().filiere !== row) cleanDropTarget();
        },
        drop: (dayAndEvent, row, evt) => {
          if (draggedModule().filiere !== row) {
            cleanDropTarget();
            return;
          }
          dropModule();
        },
        move: (dayAndEvent, row, evt) => {
          evt.preventDefault();
          if (draggedModule().filiere !== row) {
            cleanDropTarget();
            return;
          }
          changeDropTarget(dayAndEvent, evt);
        },
      }}
    />
  );
}

function getTargetDay(targetModule, { targetWidth, mouseOffsetX }) {
  let targetDuration = targetModule.duration;
  const dayOffset = Math.floor(mouseOffsetX / (targetWidth / targetDuration));
  return addDays(targetModule.start, dayOffset);
}
