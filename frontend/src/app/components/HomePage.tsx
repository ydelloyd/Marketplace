import React, { useEffect, useState } from "react";
import { Grid2, Typography, Card } from "@mui/material";
import { Job } from "../models/jobModel";
import { OwnerModel } from "../models/ownerModel";
import JobsList from "./shared/jobsList";

const HomePage: React.FC = () => {
  const jobs: Job[] = [
    {
      id: "1",
      title: "First Job",
      description: "first job description",
      owner: { name: "TEST", contactInfo: "test@test.com" } as OwnerModel,
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
      owner: { name: "TEST", contactInfo: "test@test.com" } as OwnerModel,
      expiration: new Date().toISOString(), // ISO 8601 date-time string
      lowestBid: 1,
      numberOfBids: 5,
      reqirements: "skills",
      createdAt: new Date().toISOString()
    },
    {
      id: "3",
      title: "third no description",
      description: "third job description",
      owner: { name: "TEST", contactInfo: "test@test.com" } as OwnerModel,
      expiration: new Date().toISOString(), // ISO 8601 date-time string
      lowestBid: 1,
      numberOfBids: 5,
      createdAt: new Date().toISOString()
    }
  ];

  const mostActive: Job[] = [
    {
      id: "1",
      title: "First Job",
      description: "first job description",
      owner: { name: "TEST", contactInfo: "test@test.com" } as OwnerModel,
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
      owner: { name: "TEST", contactInfo: "test@test.com" } as OwnerModel,
      expiration: new Date().toISOString(), // ISO 8601 date-time string
      lowestBid: 1,
      numberOfBids: 5,
      reqirements: "skills",
      createdAt: new Date().toISOString()
    },
    {
      id: "3",
      title: "third no description",
      description: "third job description",
      owner: { name: "TEST", contactInfo: "test@test.com" } as OwnerModel,
      expiration: new Date().toISOString(), // ISO 8601 date-time string
      lowestBid: 1,
      numberOfBids: 5,
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Typography paddingTop={"1rem"} variant="h3">Welcome to the Best Marketplace</Typography>
      </Grid2>
      <Grid2 size={6}>
        <Card>
        <JobsList jobs={jobs} title="Recently Added Jobs" />
        </Card>
      </Grid2>
      <Grid2 size={6}>
        <Card>
        <JobsList jobs={mostActive} title="Most Active Jobs" />
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default HomePage;
