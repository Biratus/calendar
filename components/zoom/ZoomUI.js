"use client";
import { Button, ButtonGroup } from "@mui/material";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import ZoomOutOutlinedIcon from "@mui/icons-material/ZoomOutOutlined";
import { useZoom } from "./ZoomProvider";

export default function ZoomUI({ range }) {
  const { zoom, setZoom } = useZoom();

  const onZoomChange = (coef) => {
    setZoom(zoom + coef);
  };

  return (
    <ButtonGroup variant="outlined" color="ajcBlue">
      <Button onClick={() => onZoomChange(1)} disabled={zoom >= range}>
        <ZoomInOutlinedIcon fontSize="large" />
      </Button>
      <Button onClick={() => onZoomChange(-1)} disabled={zoom <= 0}>
        <ZoomOutOutlinedIcon fontSize="large" />
      </Button>
    </ButtonGroup>
  );
}
