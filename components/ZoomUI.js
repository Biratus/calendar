import { Button, ButtonGroup } from "@mui/material";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import ZoomOutOutlinedIcon from "@mui/icons-material/ZoomOutOutlined";

export default function ZoomUI({ value,range,onChange }) {

    const zoom = (coef) => {
        onChange(value+coef);
    }

  return (
    <ButtonGroup variant="outlined" color="ajcBlue">
      <Button onClick={() => zoom(1)} disabled={value >= range}>
        <ZoomInOutlinedIcon fontSize="large" />
      </Button>
      <Button onClick={() => zoom(-1)} disabled={value <= 0}>
        <ZoomOutOutlinedIcon fontSize="large" />
      </Button>
    </ButtonGroup>
  );
}
