import { addDays } from "date-fns";

export function getTargetDay(targetModule, { targetWidth, mouseOffsetX }) {
  let targetDuration = targetModule.duration;
  const dayOffset = Math.floor(mouseOffsetX / (targetWidth / targetDuration));
  return addDays(targetModule.start, dayOffset);
}
