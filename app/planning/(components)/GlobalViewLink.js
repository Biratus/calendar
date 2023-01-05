"use client";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function GlobalViewLink({ view }) {
  const router = useRouter();
  return (
    <Button
      startIcon={<ArrowCircleLeftOutlinedIcon />}
      variant="outlined"
      onClick={() => router.push(`/planning?view=${view}`)}
    >
      VUE GLOBALE
    </Button>
  );
}
