import { useState } from "react";



export default function Timer(props){
    const {mins, secs, time} = props.timer;
    const {active, sessionLength, type} = props.timerStatus;
    const resetTimer = props.resetTimer;
    const displayMins = mins < 10 ? `0${mins}` : mins;
    const displaySecs = secs < 10 ? `0${secs}` : secs;
    const displaySession = sessionLength < 10 ? `0${sessionLength}:00` :`${sessionLength}:00`;
    
    return(
        <section className="timer-section container justify-content-center d-flex align-items-center">
                <div className={type === "session" ? "timer": "timer break" }>
                    <span className="timer__label" id="timer-label">
                        {type === "session" ? "Session" : "Break"}
                    </span>
                    <span className="timer__clock" id="time-left">
                        {time < -2 ? displaySession : `${displayMins}:${displaySecs}`}
                    </span>
                </div>
                <div className="timer__controls d-flex gap-2">
                    <button className={active ?
                    "timer__init btn btn-danger" : "timer__init btn btn-success"} id="start_stop"
                    onClick={props.handleTimer}
                    >
                    {active ? "Stop" : "Start" }
                    </button>
                    <button className="timer__reset btn" id="reset"
                    onClick={resetTimer}
                    >
                        <i class="bi bi-arrow-clockwise"></i>
                    </button>
                </div>
        </section>
    )
}