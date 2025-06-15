import React from 'react';

function ModeIndicator({ mode }) {
    return (
        <h2>{mode === 'work' ? 'Work Time' : 'Break Time'}</h2>
    );
}

export default ModeIndicator;
