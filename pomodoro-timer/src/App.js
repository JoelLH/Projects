
import './App.css';
import Controls from './Controls';
import Timer from './Timer';
import alarm from "./alarm.mp3"
import { useEffect, useState, Component } from 'react';



function App() {
  const [timer, setTimer] = useState({
        time:-3,
        mins:0,
        secs:0,
    })

  const [timerStatus, setTimerStatus] = useState({
    active: false,
    sessionLength: 25,
    breakLength: 5,
    isSession: true,
    type : 'session'
  })
    
  
  function updateTime(type){ 

    if(type === "break"){ 
      setTimer(prev=>({
        ...prev,
        time : (timerStatus.breakLength * 60) - 1,
        mins : timerStatus.breakLength,
        secs : 0
      }))
    }else{
      setTimer(prev=>({
        ...prev,
        time : (timerStatus.sessionLength * 60) - 1,
        mins : timerStatus.sessionLength,
        secs : 0 
      }))
    }
  }
  

  let timerInterval; 

  function handleTimer(isSession, phaseChange){ 
    console.log(isSession)

    if(isSession){
      timer.time < -1 ? updateTime() : console.log("session not updated");
    }else{
      timer.time < -1 ? updateTime('break') : console.log("break not updated");
    }
    
    if(!timerStatus.active || phaseChange === true){ 
      timerInterval = setInterval(()=>{ 
        setTimer(prev=>({
          ...prev,
          time: prev.time - 1,
          mins : Math.floor(prev.time / 60),
          secs: prev.time % 60
        }))
      },1000);

      setTimer(prev=>({
        ...prev,
        intervalID : timerInterval
      }));

      if(isSession === true){
        setTimerStatus(prev=>({
          ...prev,
          type : "session"
        }));
      }else if(isSession === false){
        setTimerStatus(prev=>({
          ...prev,
          type : 'break'
        }));
      }
      setTimerStatus(prev=>({
          ...prev,
          active: true,
        }));
      
    }else{ 
        clearInterval(timer.intervalID)
        timerInterval = null;
        setTimerStatus(prev=>({
        ...prev,
        active: false,
      }))
        console.log('timer stoped', timerStatus)
    }
  }

  function updateLength(event){
    const UP_LIMIT = 60;
    const LOW_LIMIT = 1;
    let eventId= event.target.id;
    switch(eventId){
      case "break-increment":
        setTimerStatus(prev=>({
          ...prev,
          breakLength: prev.breakLength >= UP_LIMIT ? prev.breakLength : prev.breakLength + 1,
        }))
        break;
      case "break-decrement":
        setTimerStatus(prev=>({
          ...prev,
          breakLength:  prev.breakLength <= LOW_LIMIT ? 
                        prev.breakLength : 
                        prev.breakLength - 1,
        }))
        break;
      case "session-increment":
        setTimerStatus(prev=>({
          ...prev,
          sessionLength : prev.sessionLength >= UP_LIMIT ? prev.sessionLength : prev.sessionLength + 1,
        }))
        break;
      case "session-decrement":
        setTimerStatus(prev=>({
          ...prev,
          sessionLength : prev.sessionLength <= LOW_LIMIT ?
                          prev.sessionLength :
                          prev.sessionLength - 1,
        }))
        break;
      default:
        return console.log(eventId)
    }
  }
  function stopAduio(){
    const audioEl = document.getElementById("beep")
    audioEl.pause()
    audioEl.currentTime = 0
  }
  function handleAudio(){
    const audioEl = document.getElementById("beep")
    audioEl.play()

    setTimeout(()=>{
      audioEl.pause()
      audioEl.currentTime = 0
    }, 9000)
  }

  useEffect(()=>{
    console.log(timer)
    if(timer.time === -2){
      handleAudio()
      clearInterval(timer.intervalID)
      timerInterval = null;
      if(timerStatus.isSession){
        setTimerStatus(prev=>({
          ...prev,
          type: "break",
          active: false,
          isSession : false
        }))
        handleTimer(false, true)
      }else{
        setTimerStatus(prev=>({
          ...prev,
          type: "session",
          active: false,
          isSession : true
        }))
        handleTimer(true, true)
      }
    }
  },[timer.time])
    
  function resetTimer(){
    setTimer({
      time:-3,
      mins:25,
      secs:0,
    })
    setTimerStatus({
      active: false,
      sessionLength: 25,
      breakLength: 5,
      type: "session",
      isSession: true
    })
    clearInterval(timer.intervalID)
    timerInterval = null;
    stopAduio()
  }

  return (
    <main className="App">
      <div className='atributtion'>
        <span>Coded by <a href="https://www.linkedin.com/in/joel-lopez-0595ba193/">Joel WebDev</a></span>
        <a href="https://orangefreesounds.com/cool-alarm-tone-notification-sound/" target="_blank">+ Sound atributtion</a>
      </div>
      
      <Controls
      timerStatus = {timerStatus}
      updateLength = {updateLength}
      />
      <Timer 
      timer = {timer}
      handleTimer = {handleTimer}
      timerStatus = {timerStatus}
      resetTimer = {resetTimer}
      />
      <audio src={alarm} type="audio/mp3" id='beep'></audio>
    </main>
  );
}

export default App;
