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
      <Typography variant="h5" sx={{ m: 1 }}>
        Légende des modules
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridGap: "1em",
        }}
      >
        {legendList.map(({ label, color }) => (
          <LegendItem
            key={label}
            styleProps={
              typeof color === "string"
                ? { backgroundColor: color }
                : { ...color }
            }
            label={label}
          />
        ))}
      </Box>
    </Box>
  );
}

function LegendItem({ styleProps, label }) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box
        sx={{
          width: "15px",
          height: "15px",
          borderRadius: "20%",
          ...styleProps,
        }}
      ></Box>
      <span>{label}</span>
    </Stack>
  );
}
