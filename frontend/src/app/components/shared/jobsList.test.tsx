import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobsList from './jobsList';
import { Job } from '../../models/jobModel';

describe('JobsList Component', () => {
    const mockJobs = [
        {
            id: "1",
            title: "Job 1",
            description: "Description 1",
            expiration: new Date().toISOString(),
            owner: { name: "test", contactInfo: "test@test.com" },
            lowestBid: 100,
            numberOfBids: 5,
            requirements: "Test requirements",
            createdAt: new Date().toISOString(),
        },
        {
            id: "2",
            title: "Job 2",
            description: "Description 2",
            expiration: new Date().toISOString(),
            owner: { name: "test", contactInfo: "test@test.com" },
            lowestBid: 100,
            numberOfBids: 5,
            requirements: "Test requirements",
            createdAt: new Date().toISOString(),
        }
    ];

    it('renders the title correctly', () => {
        render(<JobsList jobs={mockJobs} title="Test Title" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders the job items correctly', () => {
        render(<JobsList jobs={mockJobs} title="Test Title" />);
        mockJobs.forEach(job => {
            expect(screen.getByText(job.title)).toBeInTheDocument();
            expect(screen.getByText(job.description)).toBeInTheDocument();
        });
    });
    
    it('renders the HelpOutlineIcon for each job item', () => {
        render(<JobsList jobs={mockJobs} title="Test Title" />);
        const icons = screen.getAllByTestId('HelpOutlineIcon');
        expect(icons.length).toBe(mockJobs.length);
    });

    it('renders a divider between job items', () => {
        render(<JobsList jobs={mockJobs} title="Test Title" />);
        const dividers = screen.getAllByRole('separator');
        expect(dividers.length).toBe(mockJobs.length);
    });
});