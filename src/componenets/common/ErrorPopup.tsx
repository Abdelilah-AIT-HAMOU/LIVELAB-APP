import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

export default function ErrorPopup({ error, onClose }) {
  return (
    <Modal open={!!error} onClose={onClose} sx={{ backdropFilter: "blur(10px)" }}>
      <Box sx={modalStyle}>
        <Typography variant="h5" color="error">
          Something went wrong!
        </Typography>
        <Typography>{error?.message}</Typography>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: "center",
  width: "40%",
};