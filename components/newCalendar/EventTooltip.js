import { Tooltip, Typography } from "@mui/material";
import { formatFullDate } from "../../lib/date";

export default function EventTooltip({
  event,
  children,
  additionalInfos
}) {
  return (
    <Tooltip placement="bottom" title={<TooltipContent event={event} additionalInfos={additionalInfos}/>}>
      {children}
    </Tooltip>
  );
}

function TooltipContent({event:{name,start,end},additionalInfos}) {
  return (<>
    <Typography variant="h5" gutterBottom>
      {name}
    </Typography>
    <Typography variant="subtitle1">
      Début : <b>{formatFullDate(start)}</b>
    </Typography>
    <Typography variant="subtitle1">
      Fin : <b>{formatFullDate(end)}</b>
    </Typography>
    {additionalInfos && (
      <Typography variant="subtitle2">
        {additionalInfos.label}: <b>{additionalInfos.value}</b>
      </Typography>
    )}
  </>)
}