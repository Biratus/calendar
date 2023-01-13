"use client";
import { Box, Stack } from "@mui/material";
import { LoadingBar } from "../../../components/LoadingBar";
import { useZoom } from "../../../components/zoom/ZoomProvider";
import ZoomUI from "../../../components/zoom/ZoomUI";

export default function TestComponent() {
  const { zoom, loaded } = useZoom();

  console.log("TestComponent",{zoom,loaded});
  return (
    <Stack direction="column" gap={2}>
      <ZoomUI />
      {!loaded ? (
        <LoadingBar />
      ) : (
        <Box
          sx={{
            backgroundColor: "red",
            width: `${zoom * 50}px`,
          }}
        >
          ...
        </Box>
      )}
    </Stack>
  );
}
