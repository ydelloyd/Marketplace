import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AlertProvider, useAlert } from './alertContext';

// A helper component to test the context
const TestComponent = () => {
    const { severity, message, open, setSeverity, setMessage, setOpen } = useAlert();

    return (
        <div>
            <div data-testid="severity">{severity}</div>
            <div data-testid="message">{message}</div>
            <div data-testid="open">{open ? 'true' : 'false'}</div>
            <button onClick={() => setSeverity('error')}>Set Severity</button>
            <button onClick={() => setMessage('Test Message')}>Set Message</button>
            <button onClick={() => setOpen(true)}>Set Open</button>
        </div>
    );
};

describe('AlertContext', () => {
    it('provides default values', () => {
        render(
            <AlertProvider>
                <TestComponent />
            </AlertProvider>
        );

        expect(screen.getByTestId('severity').textContent).toBe('success');
        expect(screen.getByTestId('message').textContent).toBe('');
        expect(screen.getByTestId('open').textContent).toBe('false');
    });

    it('updates severity', () => {
        render(
            <AlertProvider>
                <TestComponent />
            </AlertProvider>
        );

        act(() => {
            screen.getByText('Set Severity').click();
        });

        expect(screen.getByTestId('severity').textContent).toBe('error');
    });

    it('updates message', () => {
        render(
            <AlertProvider>
                <TestComponent />
            </AlertProvider>
        );

        act(() => {
            screen.getByText('Set Message').click();
        });

        expect(screen.getByTestId('message').textContent).toBe('Test Message');
    });

    it('updates open', () => {
        render(
            <AlertProvider>
                <TestComponent />
            </AlertProvider>
        );

        act(() => {
            screen.getByText('Set Open').click();
        });

        expect(screen.getByTestId('open').textContent).toBe('true');
    });

    it('throws error when useAlert is used outside of AlertProvider', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => render(<TestComponent />)).toThrow('useAlert must be used within an AlertProvider');

        consoleError.mockRestore();
    });
});