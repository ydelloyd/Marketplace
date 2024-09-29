import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Job } from "../models/jobModel";
import { OwnerModel } from "../models/ownerModel";
import JobCard from "./shared/jobCard";

const HomePage: React.FC = () => {

  const jobs: Job[] = [
    {
      id: "1",
      title: "First Job",
      description: "first job description",
      owner: { name: "TEST", contactInfo: "test@test.com"} as OwnerModel,
      expiration: new Date().toISOString(), // ISO 8601 date-time string
      lowestBid: 1,
      numberOfBids: 5,
      reqirements: "skills",
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Second ",
      description: "second job ",
      owner: { name: "TEST", contactInfo: "test@test.com"} as OwnerModel,
      expiration: new Date().toISOString(), // ISO 8601 date-time string
      lowestBid: 1,
      numberOfBids: 5,
      reqirements: "skills",
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h3">Jobs</Typography>
      </Grid>
      {jobs.map((job) => {
        return (
          <JobCard key={job.id} job={job} />
        );
      })}
    </Grid>
  );
};

export default HomePage;
