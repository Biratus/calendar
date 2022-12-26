import { Backdrop, Fade, Modal as MUIModal, Box } from "@mui/material";

const style = {
    outline: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    width: .8,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "1em",
    color: "black",
  };

export default function Modal({ open, close, children,...props }) {
  return (
    <MUIModal
      open={open}
      onClose={close}
      closeAfterTransition
      slots={{backdrop:Backdrop}}
      slotProps={{backdrop:{
        timeout: 300,
      }}}
    >
      <Fade in={open}>
        <Box sx={style} {...props}>{children}</Box>
      </Fade>
    </MUIModal>
  );
}
