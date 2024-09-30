import React from 'react';
import { List, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Job } from '../../models/jobModel';

const JobsList: React.FC<{ jobs: Job[], title: string }> = ({ jobs, title }) => {
    return (
        <List>
            {jobs.map((job, index) => (
                <>
                    <ListItemButton onClick={() => window.location.href = `/job/${job.id}`}>
                        <ListItemText primary={job.title} secondary={job.description} />
                        <ListItemIcon>
                            <HelpOutlineIcon color="primary" />
                        </ListItemIcon>
                    </ListItemButton>
                    {index !== jobs.length - 1 && <Divider />}
                </>
            ))}
        </List>
    );
};

export default JobsList;