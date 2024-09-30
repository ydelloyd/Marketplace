import React from 'react';
import { List, ListItemButton, ListItemText, ListItemIcon, Divider, ListItem } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Job } from '../../models/jobModel';

const JobsList: React.FC<{ jobs: Job[], title: string }> = ({ jobs, title }) => {
    return (
        <List>
            <ListItem>
                <ListItemText primary={<span style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{title}</span>} />
            </ListItem>
            <Divider />
            {jobs.length > 0 && jobs.map((job, index) => (
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