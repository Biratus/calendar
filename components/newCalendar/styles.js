import { isSameDay, isWeekend } from "date-fns";

export const monthLabel = {
  color: "ajcBlue.dark",
  fontWeight: "bold",
  background:
    "linear-gradient(170deg, hsl(47, 49%, 61%) 0%, hsl(47, 49%, 61%) 9%, rgba(0,0,0,0) 50%)",
};

export const day = {
  borderLeft: "1px solid gray",
};

export const weekend = {
  light: {
    background:
      "linear-gradient(170deg, #bdbdbd 0%, #bdbdbd 10%, #ffffff00 100%)",
  },
  dark: {
    background:
      "linear-gradient(170deg, #424242 0%, #424242 10%, #ffffff00 100%)",
  },
};

export const backgroundFor = (date, event, color) => {
  let isStart = isSameDay(date, event.start);
  let isEnd = isSameDay(date, event.end);

  if (isStart && isEnd) {
    return `radial-gradient(circle, ${color} 30%, rgba(148,187,233,0) 100%)`;
  } else if (isStart) {
    return `radial-gradient(circle at 100%, ${color} 50%, rgba(148,187,233,0) 100%)`;
  } else if (isEnd) {
    return `radial-gradient(circle at 0%, ${color} 50%, rgba(0,0,0,0) 100%)`;
  } else {
    return color;
  }
};

export const missingFormateurStyle = (eventColor) => ({
  background: `repeating-linear-gradient(30deg,
    transparent,
    ${eventColor} 20%,
    transparent 40%)`,
});

export const calendarDayStyle = (date, theme) => {
  let style = { ...day };

  if (isWeekend(date)) style = { ...style, ...weekend[theme.palette.mode] };

  return style;
};

export const overlapModuleStyle = {
  boxShadow: `0px 0px 0.7em 0.1em #D6C588 inset`,
  background: "black",
  color: "white",
};
