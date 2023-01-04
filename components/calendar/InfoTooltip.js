import { Tooltip, Typography } from "@mui/material";
import { formatFullDate } from "../../lib/date";

export default function InfoTooltip({ children, tooltipProps, titleProps }) {
  return (
    <Tooltip {...tooltipProps} title={<TooltipContent {...titleProps} />}>
      {children}
    </Tooltip>
  );
}

function TooltipContent({ label, start, end, additionalInfos }) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        {label}
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
    </>
  );
}
