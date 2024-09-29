import React from "react";
import {
  Grid2,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Divider,
  TextField,
  Chip,
  Tooltip,
  Box,
  IconButton
} from "@mui/material";
import ContactMail from "@mui/icons-material/ContactMail";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

import { Job } from "../../models/jobModel";

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
    
  const copyEmailToClipboard = (contact: string) => {
    navigator.clipboard.writeText(contact);
  };

  const utcToLocale = (date: string) => {
    const convertedDate = new Date(date).toLocaleString()
    return convertedDate ? convertedDate : "";
  };

  return (
    <Grid2 size={4}>
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
              <IconButton color="secondary" aria-label="bid" size="large">
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
            {job.reqirements}
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
                type="number"
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
          <Typography variant="body1">{utcToLocale(job.createdAt)}</Typography>
          <Divider />
          <Box paddingTop={"1rem"} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
          <Typography variant="body1" paddingRight={"1rem"}>{`Contact ${job.owner.name} at: `}</Typography>
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
    </Grid2>
  );
};

export default JobCard;
