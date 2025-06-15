import React from 'react';

function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
}

function TimerDisplay({ secondsLeft }) {
    return (
        <h1>{formatTime(secondsLeft)}</h1>
    );
}

export default TimerDisplay;
