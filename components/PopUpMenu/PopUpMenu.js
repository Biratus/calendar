import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

export default function PopUpMenu({ anchorEl, onClose, header, items }) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {header && (
        <MenuItem disabled sx={{ fontWeight: "bold" }}>
          {header}
        </MenuItem>
      )}
      {items.map(({ icon, text, onClick }, i) => (
        <MenuItem onClick={onClick} key={i}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText>{text}</ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}
