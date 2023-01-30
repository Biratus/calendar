import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  addDays, formatISO,
  isSameDay,
  isWithinInterval
} from "date-fns";
import { useCallback, useMemo, useState } from "react";
import FullCalendar from "../../../components/newCalendar/FullData/CalendarData";
import {
  checkOverlapModules, toCalendarData
} from "../../../lib/calendar";
import { getTargetDay } from "../../../lib/mouseEvent";
import { useCalendar } from "./CalendarProvider";
import { FiliereView } from "./CalendarViews";

export default function CalendarFiliere({
  modules: originalModules,
  day,
  event,
  ...props
}) {
  const [modules, setModules] = useState(originalModules);
  const calendarData = useMemo(() => {
    const data = toCalendarData(modules, "filiere", FiliereView, true);
    checkOverlapModules(data);
    // data.forEach((row) =>
    //   row.events
    //     .filter((event) => event.overlap)
    //     .forEach(
    //       (event) =>
    //         (event.label = (
    //           <WarningAmberIcon
    //             color="error"
    //             sx={{ verticalAlign: "middle" }}
    //           />
    //         ))
    //     )
    // );
    return data;
  }, [modules]);
  const { showOverlapModules, draggedModule, setDraggedModule } = useCalendar();
  // DropTarget: interval de drop
  const [dropTarget, setDropTarget] = useState(null);

  const isDropTarget = useCallback(
    (day) => {
      return dropTarget && isWithinInterval(day, dropTarget);
    },
    [dropTarget]
  );

  const cleanDropTarget = () => {
    setDropTarget(null);
  };

  const changeDropTarget = useCallback(
    (dayAndEvent, evt) => {
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
          mouseOffsetX: evt.clientX - rect.x,
        });
      }
      if (!dropTarget || !isSameDay(targetDay, dropTarget.start)) {
        setDropTarget({
          start: targetDay,
          end: addDays(targetDay, draggedModule().duration - 1),
        });
      }
    },
    [dropTarget]
  );

  const dropModule = useCallback(() => {
    const newModules = modules.filter((m) => m.id != draggedModule().id);
    let newModule = draggedModule();
    newModule.start = formatISO(dropTarget.start);
    newModule.end = formatISO(dropTarget.end);
    newModules.push(newModule);
    setModules(newModules);
    cleanDropTarget();
  }, [modules, dropTarget]);

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