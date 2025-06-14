import React from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import ModeIndicator from "./ModeIndicator";


function PomodoroTimer() {
    return (
    <>
    <TimerDisplay/>
    <TimerControls/>
    <ModeIndicator/>
    </> 
    );
}

export default PomodoroTimer;