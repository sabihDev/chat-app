import React from "react";
import { useSnackbar } from "notistack";
import { Button, Stack } from "@mui/material";

const CustomToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showToast = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 3000,
      anchorOrigin: { vertical: "top", horizontal: "right" },
      style: {
        backgroundColor:
          variant === "success"
            ? "#4caf50"
            : variant === "error"
            ? "#f44336"
            : variant === "warning"
            ? "#ff9800"
            : "#2196f3",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        padding: "10px 16px",
      },
    });
  };

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" color="success" onClick={() => showToast("Success! 🎉", "success")}>
        Success
      </Button>
      <Button variant="contained" color="error" onClick={() => showToast("Error! ❌", "error")}>
        Error
      </Button>
      <Button variant="contained" color="warning" onClick={() => showToast("Warning! ⚠️", "warning")}>
        Warning
      </Button>
      <Button variant="contained" color="info" onClick={() => showToast("Info! ℹ️", "info")}>
        Info
      </Button>
    </Stack>
  );
};

export default CustomToast;
