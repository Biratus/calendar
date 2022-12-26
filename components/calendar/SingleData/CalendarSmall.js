"use client";

import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext } from "react";
import { useLocalStorage } from "../../../hooks/localStorageHook";
import { changeURLParam } from "../../../lib/navigation";
import { CalendarContext } from "../CustomCalendar";
import ZoomUI from "../ZoomUI";
import CalendarDetail from "./detailedView/CalendarDetail";
import CalendarSimple from "./simpleView/CalendarSimple";

const viewWidth = 0.5;

const zoomCoefKey = "zoom_calendar_small";

const defaultCoef = 5;

const DETAILED = "detailed";
const SIMPLE = "simple";

export const SingleDataContext = createContext();

export default function CalendarSmall({ data: dataLabel }) {
  const { months, mainView, data } = useContext(CalendarContext);
  const [zoom, setZoom, loaded] = useLocalStorage(zoomCoefKey, defaultCoef);
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const viewType = params.get("viewType") || DETAILED;

  var focusedData = data.filter((d) => d.label == dataLabel)[0];

  if (!focusedData) return <>Aucune donnée pour [{dataLabel}]</>;

  var { label, events } = focusedData;

  const changeViewType = (evt) => {
    let newViewType = evt.target.checked ? DETAILED : SIMPLE;

    let url = changeURLParam({
      params,
      path,
      newParams: { viewType: newViewType },
    });
    router.push(url);
  };
  const loadingUI = (
    <Box sx={{ width: "100%" }}>
      <LinearProgress color="ajcBlue" />
    </Box>
  );
  return (
    <Stack spacing={1} justifyContent="center" alignItems="center">
      <Typography variant="h2">{label}</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: viewWidth + zoom * 0.1 }}
      >
        <Button
          onClick={mainView}
          startIcon={<ArrowCircleLeftOutlinedIcon />}
          variant="outlined"
        >
          Vue gobale
        </Button>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={viewType == DETAILED}
                onChange={changeViewType}
              />
            }
            label="Vue détaillé"
          />
        </FormGroup>
        <ZoomUI range={5} onChange={setZoom} value={zoom} />
      </Stack>
      {!loaded ? (
        loadingUI
      ) : (
        <SingleDataContext.Provider
          value={{
            months,
            events,
            view: { zoom, width: viewWidth + zoom * 0.1 },
          }}
        >
          {viewType === SIMPLE && <CalendarSimple />}
          {viewType === DETAILED && <CalendarDetail />}
        </SingleDataContext.Provider>
      )}
    </Stack>
  );
}
