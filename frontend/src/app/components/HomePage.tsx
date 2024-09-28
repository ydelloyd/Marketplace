import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      <Typography variant="h3">Jobs</Typography>

      <Button
        component={Link}
        to="/post-job"
        variant="contained"
        color="primary"
        sx={{ marginTop: 4 }}
      >
        Job Button
      </Button>
    </div>
  );
};

export default HomePage;
