"use client";
import { Backdrop, Box, Stack, Typography } from "@mui/material";
import { eachDayOfInterval } from "date-fns";

export default function OverlapModuleOverlay({
  anchorEl,
  onClose,
  selectModule,
  data
}) {
    console.log({data});
  const cellWidth = anchorEl.clientWidth / data.duration;
  console.log('cellWidth',cellWidth);

  const dayOffset = (mod) => {
    return eachDayOfInterval({
        start:data.start,end:mod.start
    }).length-1;
  }
  return (
    <Backdrop
      sx={{
        color: "#fff",
        opacity: 0.5,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={Boolean(anchorEl)}
      onClick={onClose}
    >
      <Stack
        direction="column"
        gap={2}
        sx={{
          position: "absolute",
          top: `${anchorEl.offsetTop}px`,
          left: `${anchorEl.offsetLeft}px`,
          transform: `translateY(${anchorEl.clientHeight}px)`,
        }}
      >
        {data.overlappedModules.map((mod, i) => (
          <Box
            key={i}
            onClick={(evt) => selectModule(mod,evt.currentTarget)}
            sx={{
                alignItems:'center',
              height:`${anchorEl.clientHeight}`,
              width:`${mod.duration*cellWidth}px`,
              backgroundColor:'lightblue',
              color:'black',
              marginLeft:`${dayOffset(mod)*cellWidth}px`,
              cursor:'grab',
              '&:hover':{
                backgroundColor:"blue"
              }
            }}
          >
            <Typography sx={{display:'flex'}} noWrap>{mod.name}</Typography>
          </Box>
        ))}
      </Stack>
    </Backdrop>
  );
}
