import React, { useEffect, useState } from "react";
import { Grid2, Typography, Card, Button } from "@mui/material";
import { Job } from "../models/jobModel";
import JobsList from "./shared/jobsList";
import JobModal from "./shared/jobModal";
import PostAddIcon from "@mui/icons-material/PostAdd";
import JobService from "../services/jobService";
import { useAlert } from "../contexts/alertContext";
import { useLoader } from "../contexts/loaderContext";

const HomePage: React.FC = () => {
  const { setOpen, setMessage, setSeverity } = useAlert();
  const { setLoading } = useLoader();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [mostActive, setMostActive] = useState<Job[]>([]);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      const triggerFailedAlert = (message: string) => {
        setSeverity("error");
        setMessage(message);
        setOpen(true);
      };

      try {
        const recentJobsData = await JobService.getAllJobs(
          true,
          false,
          true,
          5
        );
        if (recentJobsData.status !== 200) {
          triggerFailedAlert("Failed to fetch recent jobs");
        } else {
          setRecentJobs(recentJobsData.data);
        }

        const mostActiveJobsData = await JobService.getAllJobs(
          false,
          true,
          true,
          5
        );
        if (mostActiveJobsData.status !== 200) {
          triggerFailedAlert("Failed to fetch active jobs");
        } else {
          setMostActive(mostActiveJobsData.data);
        }
      } catch (error) {
        triggerFailedAlert("Failed to fetch jobs: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [setLoading, setSeverity, setMessage, setOpen, modalOpen]);

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 size={10}>
          <Typography paddingTop={"1rem"} variant="h3">
            Welcome to the Best Marketplace
          </Typography>
        </Grid2>
        <Grid2 size={2} justifyContent="flex-end" alignItems="center" container>
          <Button
            variant="contained"
            endIcon={<PostAddIcon />}
            onClick={handleOpen}
          >
            Post a Job
          </Button>
        </Grid2>
        <Grid2 size={6}>
          <Card>
            <JobsList jobs={recentJobs} title="Recently Added Jobs" />
          </Card>
        </Grid2>
        <Grid2 size={6}>
          <Card>
            <JobsList jobs={mostActive} title="Most Active Jobs" />
          </Card>
        </Grid2>
      </Grid2>
      <JobModal open={modalOpen} onClose={handleClose} />
    </>
  );
};

export default HomePage;
