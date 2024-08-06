import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        pt: 5,
        padding: "20px 0",
        backgroundColor: "#3f51b5",
        color: "white",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
      }}
    >
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} Religious Institutions Management. All
        rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
