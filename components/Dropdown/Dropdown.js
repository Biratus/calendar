"use client";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, MenuItem } from "@mui/material";
import { useState } from "react";
import { DropdownMenu } from "./DropdownMenu";

export default function Dropdown({ label, selected, actions, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action) => {
    if (action.selected) return;

    handleClose();
    if (!action.onClick || typeof action.onClick !== "function")
      throw new Error('action must define a "onClick" attribute.', action);

    action.onClick();
  };
  return (
    <Box>
      <Button
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        {...props}
      >
        {label}
      </Button>
      <DropdownMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: "40%",
          },
        }}
      >
        {actions.map((act) => (
          <MenuItem
            key={act.label}
            onClick={() => handleActionClick(act)}
            selected={act.selected}
            disableRipple
          >
            {act.label}
          </MenuItem>
        ))}
      </DropdownMenu>
    </Box>
  );
}
