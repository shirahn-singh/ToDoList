import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Stack } from "@mui/material";

function PomodoroSettings({ workDuration, breakDuration, onSave }) {
    const [newWork, setNewWork] = useState(workDuration / 60);
    const [newBreak, setNewBreak] = useState(breakDuration / 60);
    const [error, setError] = useState("");

    const handleSave = () => {
        const work = parseInt(newWork);
        const rest = parseInt(newBreak);

        if (isNaN(work) || work <= 0 || isNaN(rest) || rest <= 0) {
            setError("Both durations must be greater than 0.");
            return;
        }
        setError("");
        onSave(newWork * 60, newBreak * 60);
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>
                Settings
            </Typography>

            <Stack spacing={2}>
                <TextField
                    label="Work Duration (min)"
                    type="number"
                    value={newWork}
                    onChange={e => setNewWork(e.target.value)}
                    error={!!error && (newWork <= 0 || isNaN(parseInt(newWork)))}
                    helperText={!!error && (newWork <= 0 || isNaN(parseInt(newWork))) ? error : ""}
                    fullWidth
                />
                <TextField
                    label="Break Duration (min)"
                    type="number"
                    value={newBreak}
                    onChange={e => setNewBreak(e.target.value)}
                    error={!!error && (newBreak <= 0 || isNaN(parseInt(newBreak)))}
                    helperText={!!error && (newBreak <= 0 || isNaN(parseInt(newBreak))) ? error : ""}
                    fullWidth
                />
                <Button variant="contained" onClick={handleSave}>
                    Save
                </Button>
            </Stack>
        </Paper>
    );
}

export default PomodoroSettings;
