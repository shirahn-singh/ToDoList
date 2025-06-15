import React from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import ModeIndicator from "./ModeIndicator";
import { useState, useRef, useEffect } from "react";

const WORK_DURATION = 1 * 60;
const BREAK_DURATION = 5 * 60;

function PomodoroTimer() {
    const [secondsLeft, setSecondsLeft] = useState(WORK_DURATION);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work');
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!isRunning) return;
        
        const switchMode = () => {
            const nextMode = mode === 'work' ? 'break' : 'work';
            setMode(nextMode);
            setSecondsLeft(nextMode === 'work' ? WORK_DURATION : BREAK_DURATION);
        };

        intervalRef.current = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    switchMode();
                    return prev;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, [isRunning, mode]);

    const handleStartPause = () => {
        setIsRunning(prev => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        setSecondsLeft(mode === 'work' ? WORK_DURATION : BREAK_DURATION);
    };

    return (
        <div>
            <ModeIndicator mode={mode} />
            <TimerDisplay secondsLeft={secondsLeft} />
            <TimerControls
                isRunning={isRunning}
                onStartPause={handleStartPause}
                onReset={handleReset}
            />
        </div>
    );
}

export default PomodoroTimer;