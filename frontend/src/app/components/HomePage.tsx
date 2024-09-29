import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid2';
import { Job } from "../models/jobModel";
import { OwnerModel } from "../models/ownerModel";

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
      title: "Second Job",
      description: "second job description",
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
          <Grid size={4}>
            <Typography variant="h5">{job.title}</Typography>
            <Typography variant="body1">{job.description}</Typography>
            <Typography variant="body1">{job.owner.name}</Typography>
            <Typography variant="body1">{job.owner.contactInfo}</Typography>
            <Typography variant="body1">{job.expiration}</Typography>
            <Typography variant="body1">{job.lowestBid}</Typography>
            <Typography variant="body1">{job.numberOfBids}</Typography>
            <Typography variant="body1">{job.reqirements}</Typography>
            <Typography variant="body1">{job.createdAt}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default HomePage;
