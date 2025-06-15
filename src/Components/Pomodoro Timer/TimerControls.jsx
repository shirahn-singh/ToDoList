import React from 'react';
import { Button, Stack } from '@mui/material';

function TimerControls({ isRunning, onStartPause, onReset }) {
    return (
        <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" onClick={onStartPause}>
                {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button variant="outlined" onClick={onReset}>
                Reset
            </Button>
        </Stack>
    );
}

export default TimerControls;
