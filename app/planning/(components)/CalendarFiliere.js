import { useCallback, useRef, useState } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import FullCalendar from "../../../components/newCalendar/FullData/CalendarData";
import { mergeModule, moduleOverlap, toCalendarData } from "../../../lib/calendar";
import { useCalendar } from "./CalendarProvider";
import { FiliereView } from "./CalendarViews";
import { useZoom } from "../../../components/zoom/ZoomProvider";
import { addDays, isWithinInterval } from "date-fns";

export default function CalendarFiliere({ modules, day,...props }) {
    const calendarData=toCalendarData(modules, "filiere", FiliereView, true);
    const {draggedModule} = useCalendar();
    const dropTarget = useRef({evt:null,day:null});
    const {zoom} = useZoom();
  
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
  
    const isDragTarget = (mod) => {
       return false;
       // TODO HERE
       // Set border bottom on days row => Refacto day highlighted, highlight Info, etc..
    }

    return (
      <FullCalendar
      {...props}
        data={calendarData}
        EventTooltip={FiliereView.EventTooltip}
        LabelComponent={FiliereView.LabelComponent}
        // event={{
        //     ...event,
        //     highlighted:(mod) => event.highlighted(mod) || isDragTarget(mod),
        //     highlightedProp:(mod) => {
        //         let result = event.highlightedProp(mod);
        //         if(isDragTarget(mod)) result.borderTop = '1px solid red';
        //         return result;
        //     }
        // }}
        // day={{
        //     ...day,
        //     highlighted:(mod) => day.highlighted(mod) || isDragTarget(mod),
        //     highlightedProp:(mod) => {
        //         let result = day.highlightedProp(mod);
        //         if(isDragTarget(mod)) result.borderTop = '1px solid red';
        //         return result;
        //     }
        // }}
        drag={{
          enter: (day, row, evt) => {
            if (draggedModule().filiere !== row) return;
            if(dropTarget.current.evt && dropTarget.current.evt.currentTarget == evt.currentTarget) return;
            dropTarget.current.evt = {...evt};
            dropTarget.current.day = day;
          },
          leave: (day, row, evt) => {
            // if (draggedModule().filiere !== row) return;
            // if(dropTarget.current.evt && dropTarget.current.evt.currentTarget == evt.currentTarget) return;
            // console.log("leave" + row, day);
          },
          drop: (day, row, evt) => {
            if (draggedModule().filiere !== row) return;
            let targetDay;
            if(!day.event || day.event.duration == 1) {
                targetDay = day.date;
            }
            else {// Calculate on which day it was droped
                let targetDuration = dropTarget.current.day.event.duration;
                let {clientWidth} = evt.currentTarget;
                let {nativeEvent:{layerX:mouseOffsetX}} = evt;
                const dayOffset = Math.floor(mouseOffsetX/(clientWidth/targetDuration));
                targetDay = addDays(day.date,dayOffset);
            }
            console.log(targetDay,day);
            dropTarget.current.dropInterval = {start:targetDay,end:addDays(targetDay,draggedModule.duration)};
            console.log({targetDaysInterval:dropTarget.current.dropInterval});
          },
          move: (day, row, evt) => {
            evt.preventDefault();
            if (draggedModule().filiere !== row) return;
          },
        }}
      />
    );
  }