import { Box, Paper, Stack, Typography } from "@mui/material";

export default function Legend({ legendList }) {
  return (
    <Box
      component={Paper}
      variant="outlined"
      sx={{
        p: 1,
        m: 5,
      }}
    >
      <Typography variant="h5" sx={{m:1}}>Légende des modules</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "1em",
        }}
      >
        {legendList.map(({ label, color }) => (
          <LegendItem key={label} backgroundColor={color} label={label} />
        ))}
      </Box>
    </Box>
  );
}

function LegendItem({ backgroundColor, label }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box
        sx={{
          width: "15px",
          height: "15px",
          backgroundColor,
          borderRadius: "20%",
        }}
      ></Box>
      <span>{label}</span>
    </Stack>
  );
}
