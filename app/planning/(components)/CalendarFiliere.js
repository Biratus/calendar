import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { addDays, isSameDay, isWithinInterval } from "date-fns";
import { useState } from "react";
import FullCalendar from "../../../components/newCalendar/FullData/CalendarData";
import {
  mergeModule,
  moduleOverlap,
  toCalendarData,
} from "../../../lib/calendar";
import { formatFullDate } from "../../../lib/date";
import { useCalendar } from "./CalendarProvider";
import { FiliereView } from "./CalendarViews";

export default function CalendarFiliere({ modules, day, ...props }) {
  const calendarData = toCalendarData(modules, "filiere", FiliereView, true);
  const { draggedModule } = useCalendar();
  // DropTarget: interval de drop
  const [dropTarget, setDropTarget] = useState(null);

  // check overlapping modules
  for (let filiere of calendarData) {
    let newEvents = [];
    for (let mod of filiere.events) {
      let overlap = false;
      for (let eventIndex in newEvents) {
        let event = newEvents[eventIndex];
        if (moduleOverlap(mod, event)) {
          overlap = true;
          event.label = (
            <>
              <WarningAmberIcon color="error" /> Modules superposés
            </>
          );
          newEvents[eventIndex] = mergeModule(event, mod);
        }
      }
      if (!overlap) newEvents.push(mod);
    }
    filiere.events = newEvents;
  }

  const isDropTarget = (day) => {
    return (
      dropTarget && isWithinInterval(day, dropTarget)
    );
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
    if (
      !dropTarget ||
      !isSameDay(targetDay, dropTarget.start)
    ) {
      setDropTarget({
          start: targetDay,
          end: addDays(targetDay, draggedModule().duration - 1),
      });
    }
  };

  const dropModule = () => {
    console.log(dropTarget);
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
      drag={{
        enter: (dayAndEvent, row, evt) => {
          if (draggedModule().filiere !== row) {
            cleanDropTarget();
            return;
          }
          // console.log("enter", evt);
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
