import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  addDays,
  eachDayOfInterval,
  formatISO,
  isSameDay,
  isWithinInterval
} from "date-fns";
import { useMemo, useState } from "react";
import FullCalendar from "../../../components/newCalendar/FullData/CalendarData";
import {
  mergeModule,
  moduleOverlap,
  toCalendarData
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
    () => {
      const data =  toCalendarData(modules, "filiere", FiliereView, true);
      checkOverlapModules(data);
      return data;},
    [modules]
  );
  const { showOverlapModules, draggedModule, setDraggedModule } = useCalendar();
  // DropTarget: interval de drop
  const [dropTarget, setDropTarget] = useState(null);

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
      let rect = evt.currentTarget.getBoundingClientRect();
      targetDay = getTargetDay(dayAndEvent.event, {
        targetWidth: evt.currentTarget.clientWidth,
        mouseOffsetX: evt.clientX-rect.x,
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

function checkOverlapModules(data) {
  for (let filiere of data) {
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
        overlap.label =
          overlap.duration > 1 ? (
            <>
              <WarningAmberIcon color="error" sx={{verticalAlign:'middle'}} /> Modules superposés
            </>
          ) : (
            <WarningAmberIcon color="error" sx={{verticalAlign:'middle'}} />
          );
        newEvents.push(overlap);
      }
    }
    filiere.events = newEvents;
  }
}