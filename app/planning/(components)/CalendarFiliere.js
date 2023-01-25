import { useRef } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FullCalendar from "../../../components/newCalendar/FullData/CalendarData";
import { mergeModule, moduleOverlap, toCalendarData } from "../../../lib/calendar";
import { useCalendar } from "./CalendarProvider";
import { FiliereView } from "./CalendarViews";

export default function CalendarFiliere({ modules, ...props }) {
    const calendarData = toCalendarData(modules, "filiere", FiliereView, true);
    const {draggedModule} = useCalendar();
    const dropTarget = useRef({ref:null,day:null});
  
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
  
    return (
      <FullCalendar
        data={calendarData}
        EventTooltip={FiliereView.EventTooltip}
        LabelComponent={FiliereView.LabelComponent}
        {...props}
        drag={{
          enter: (day, row, evt) => {
            if (draggedModule().filiere !== row) return;
            if(dropTarget.current.ref == evt.currentTarget) return;
            dropTarget.current.ref = evt.currentTarget;
            dropTarget.current.day = day;
          },
          leave: (day, row, evt) => {
            if (draggedModule().filiere !== row) return;
            if(dropTarget.current.ref == evt.currentTarget) return;
            console.log("leave" + row, day);
          },
          drop: (day, row, evt) => {
            if (draggedModule().filiere !== row) return;
            console.log("drop" + row, day);
          },
          move: (day, row, evt) => {
            evt.preventDefault();
            if (draggedModule().filiere !== row) return;
          },
        }}
      />
    );
  }