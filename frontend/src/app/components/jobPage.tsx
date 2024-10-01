import React, { useEffect, useState } from "react";
import {
  Grid2,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  TextField,
  Chip,
  Tooltip,
  Box,
  IconButton
} from "@mui/material";
import ContactMail from "@mui/icons-material/ContactMail";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useParams } from "react-router-dom";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";
import { Job } from "../models/jobModel";
import BidModal from "./shared/bidModal";
import { useAlert } from "../contexts/alertContext";
import { useLoader } from "../contexts/loaderContext";
import JobService from "../services/jobService";

const JobCard: React.FC = () => {
  const { setOpen, setMessage, setSeverity } = useAlert();
  const { setLoading } = useLoader();
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [ job, setJob ] = useState<Job | null>(null);
  

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    if(id === undefined || isNaN(parseInt(id))) {
      return;
    } 

    const fetchJob = async () => {
      setLoading(true);

      const triggerFailedAlert = (message: string) => {
        setSeverity("error");
        setMessage(message);
        setOpen(true);
      };

      try {
        const jobData = await JobService.getJobDetails(id);
        if (jobData.status !== 200) {
          triggerFailedAlert("Failed to fetch job");
        } else {
          setJob(jobData.data);
        }
      } catch (error) {
        triggerFailedAlert("Failed to fetch job: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [setLoading, setSeverity, setMessage, setOpen, id, modalOpen]);

  const copyEmailToClipboard = (contact: string) => {
    navigator.clipboard.writeText(contact);
  };

  const utcToLocale = (date: string) => {
    const convertedDate = new Date(date).toLocaleString();
    return convertedDate !== "Invalid Date" ? convertedDate : "";
  };

  return (job && job.id) ? (
    <Grid2 size={4} paddingTop={"1rem"}>
      <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <CardContent>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
            paddingBottom={"1rem"}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ wordBreak: "break-word" }}
            >
              {job.title}
            </Typography>
            <Tooltip title={"Bid on this job!"}>
              <IconButton data-testid="bid" color="secondary" aria-label="bid" size="large" onClick={handleOpen}>
                <CatchingPokemonIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Divider />
          <Typography
            variant="caption"
            sx={{ mt: 1.5, wordBreak: "break-word" }}
          >
            Description:
          </Typography>
          <Typography sx={{ mb: 1.5, wordBreak: "break-word" }}>
            {job.description}
          </Typography>
          <Typography
            variant="caption"
            sx={{ mt: 1.5, wordBreak: "break-word" }}
          >
            Job Requirements:
          </Typography>
          <Typography sx={{ mb: 1.5, wordBreak: "break-word" }}>
            {job.requirements}
          </Typography>
          <Divider />
          <Grid2
            container
            spacing={2}
            paddingTop={"1rem"}
            paddingBottom={"1rem"}
          >
            <Grid2 size={6}>
              <TextField
                id={"bids-" + job.id}
                label="Number of Bids"
                type="number"
                variant="standard"
                disabled
                value={job.numberOfBids}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                id={"lowest-bid-" + job.id}
                label="Current Lowest Bid"
                variant="standard"
                disabled
                value={"$" + job.lowestBid}
              />
            </Grid2>
          </Grid2>
          <Typography
            variant="caption"
            sx={{ mt: 1.5, wordBreak: "break-word" }}
          >
            Job Expires At:
          </Typography>
          <Typography variant="body1">{utcToLocale(job.expiration)}</Typography>
          <Typography
            variant="caption"
            sx={{ mt: 1.5, wordBreak: "break-word" }}
          >
            Job Created At:
          </Typography>
          <Typography variant="body1">{job.createdAt ? utcToLocale(job.createdAt) : ""}</Typography>
          <Divider />
          <Box
            paddingTop={"1rem"}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Typography
              variant="body1"
              paddingRight={"1rem"}
            >{`Contact ${job.owner.name} at: `}</Typography>
            <Tooltip title={job.owner.contactInfo}>
              <Chip
                icon={<ContactMail />}
                color={"primary"}
                label={job.owner.contactInfo}
                variant="outlined"
                onClick={() => copyEmailToClipboard(job.owner.contactInfo)}
              />
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
      <BidModal id={id ?? ""} open={modalOpen} handleClose={handleClose} />
    </Grid2>
  ) : (
    <Box paddingTop={"1rem"} display="flex" justifyContent="center" alignItems="center">
  <Card>
    <CardContent>
      <Stack alignItems="center" justifyContent="center">
        <AlarmAddIcon color={"error"} fontSize="large" />
      </Stack>
      <Stack alignItems="center">
        <Typography variant="h4">
          No Job Found
        </Typography>
      </Stack>
    </CardContent>
  </Card>
</Box>
  );
};

export default JobCard;
