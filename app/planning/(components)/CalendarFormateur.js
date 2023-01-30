import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { addDays, formatISO, isSameDay, isWithinInterval } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import FullCalendar from "../../../components/newCalendar/FullData/CalendarData";
import {
  checkOverlapModules, toCalendarData
} from "../../../lib/calendar";
import { getTargetDay } from "../../../lib/mouseEvent";
import { isFormateurMissing } from "../../../lib/realData";
import { useCalendar } from "./CalendarProvider";
import { FormateurView } from "./CalendarViews";

export default function CalendarFormateur({
  modules: originalModules,
  day,
  event,
  ...props
}) {
  const [modules, setModules] = useState(originalModules);

  const calendarData = useMemo(() => {
    let data = toCalendarData(
      modules.filter((m) => !isFormateurMissing(m)),
      "formateur.mail",
      FormateurView,
      true
    );
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
  const [dropTarget, setDropTarget] = useState({
    formateur: null,
    interval: null,
  });

  const isDropTarget = useCallback(
    (day) => {
      return dropTarget.interval && isWithinInterval(day, dropTarget.interval);
    },
    [dropTarget]
  );

  const cleanDropTarget = () => {
    setDropTarget({
      formateur: null,
      interval: null,
    });
  };

  const changeDropTarget = useCallback(
    (dayAndEvent,formateur, evt) => {
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
      if (
        !dropTarget.start ||
        !isSameDay(targetDay, dropTarget.interval.start)
      ) {
        setDropTarget({
          formateur,
          interval: {
            start: targetDay,
            end: addDays(targetDay, draggedModule().duration - 1),
          },
        });
      }
    },
    [dropTarget]
  );

  const dropModule = useCallback(() => {
    const newModules = modules.filter((m) => m.id != draggedModule().id);
    let newModule = draggedModule();
    newModule.start = formatISO(dropTarget.interval.start);
    newModule.end = formatISO(dropTarget.interval.end);
    newModule.formateur = dropTarget.formateur;
    newModules.push(newModule);
    setModules(newModules);
    cleanDropTarget();
  }, [modules, dropTarget]);

  return (
    <FullCalendar
      {...props}
      data={calendarData}
      EventTooltip={FormateurView.EventTooltip}
      LabelComponent={FormateurView.LabelComponent}
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
        drag: (dayAndEvent, formateur, evt) => {
          if (!dayAndEvent.event.overlap) setDraggedModule(dayAndEvent.event);
          else evt.preventDefault();
        },
        enter: (dayAndEvent, formateur, evt) => {
          changeDropTarget(dayAndEvent,formateur, evt);
        },
        leave: (dayAndEvent, formateur, evt) => {
        },
        drop: (dayAndEvent, formateur, evt) => {
          dropModule();
        },
        move: (dayAndEvent, formateur, evt) => {
          evt.preventDefault();
          changeDropTarget(dayAndEvent,formateur, evt);
        },
      }}
    />
  );
}
