import fCCLogo from "./fcc-logo.png"
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [padData, setPadData] = useState({
    padName : "Default",
    padData : "Pad: -",
    padVol: 1,
  })

  const PAD_LETTERS = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];

  

  useEffect(() => {
    document.addEventListener("keydown", e=>{
    const key = e.key
    if(PAD_LETTERS.indexOf(key) > -1){
      let padBtn = document.querySelectorAll(".drum-pad");
      let padEl= padBtn[PAD_LETTERS.indexOf(key)];
      let keyUpCase= key.toUpperCase()
      let audioEl = document.getElementById(keyUpCase);
      audioEl.currentTime = 0;
      audioEl.play()
      setPadData(prev=>({
        ...prev,
        padName : padEl.id,
        padData : `Pad: "${audioEl.id}"`
      }))
      padEl.classList.add("active")
      setTimeout(()=>{
        padEl.classList.remove("active")
      }, 150)
    }
  })
  }, []);

  function playSound(event){
    const TARGET_ID= event.target.id;
    let audioEl="";
      switch(TARGET_ID){
        case "heater-1":
          audioEl = document.getElementById("Q")
          break;
        case "heater-2":
          audioEl = document.getElementById("W")
          break;
        case "heater-3":
          audioEl = document.getElementById("E")
          break;
        case "heater-4":
          audioEl = document.getElementById("A")
          break;
        case "clap":
          audioEl = document.getElementById("S")
          break;
        case "open-hh":
          audioEl = document.getElementById("D")
          break;
        case "kick-n-hat":
          audioEl = document.getElementById("Z")
          break;
        case "kick":
          audioEl = document.getElementById("X")
          break;
        case "closed-hh":
          audioEl = document.getElementById("C")
          break;
        default:
          return TARGET_ID
      }
    audioEl.currentTime = 0;
    audioEl.play()
    setPadData(prev=>({
      ...prev,
      padName : TARGET_ID,
      padData : `Pad: "${audioEl.id}"`
    }))
  }
  function handleVolDec(number, id){
    let fixedNum = number * 10;
    switch(id){
      case "vol-up":
        fixedNum = (fixedNum + 1) / 10
        break;
      case "vol-down":
        fixedNum = (fixedNum - 1) / 10
        break;
      default:
        return console.log("This is a default message")
    }
    return fixedNum
  }

  let audioEl = document.getElementsByTagName("audio")
  function handleVolume(e){
    let volId= e.target.id
    switch(volId){
      case "vol-up":
        setPadData(prev=>({
          ...prev,
          padVol : prev.padVol < 1 ? handleVolDec(prev.padVol, volId) : prev.padVol
        }))
        audioEl.forEach((audio) => {
          audio.volume = padData.padVol
        });
        break;
      case "vol-down":
        setPadData(prev=>({
          ...prev,
          padVol : prev.padVol > 0 ? handleVolDec(prev.padVol, volId) : prev.padVol
        }))
        audioEl.forEach((audio) => {
          audio.volume = padData.padVol
        });
        break;
      default:
        return setPadData({
          ...padData,
          padVol : 0.5
        })
    }
  }

  return (
    <main className='main-content'>
      <div className='container'>
            <div className='drum-machine' id='drum-machine'>
              <div className='drum-body'>
                <button className="btn btn-secondary drum-pad" id='heater-1' onClick={playSound}>
                  <audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" className='clip' id='Q'></audio>
                  <span className="pad-inner-text">Q</span>
                </button>
                <button className="btn btn-secondary drum-pad" id='heater-2' onClick={playSound}>
                  <audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" className='clip' id='W'></audio>
                  <span className="pad-inner-text">W</span>
                </button>
                <button className="btn btn-secondary drum-pad" id='heater-3' onClick={playSound}>
                  <audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" className='clip' id='E'></audio>
                  <span className="pad-inner-text">E</span>
                </button>
                <button className="btn btn-secondary drum-pad" id='heater-4' onClick={playSound}>
                  <audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" className='clip' id='A'></audio>
                  <span className="pad-inner-text">A</span>
                </button>
                <button className="btn btn-secondary drum-pad" id='clap' onClick={playSound}>
                  <audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" className='clip' id='S'></audio>
                  <span className="pad-inner-text">S</span>
                </button>
                <button className="btn btn-secondary drum-pad" id='open-hh' onClick={playSound}>
                  <audio src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" className='clip' id='D'></audio>
                  <span className="pad-inner-text">D</span>
                </button>
                <button className="btn btn-secondary drum-pad" id='kick-n-hat' onClick={playSound}>
                  <audio src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" className='clip' id='Z'></audio>
                  <span className="pad-inner-text">Z</span>
                </button>
                <button className="btn btn-secondary drum-pad" id='kick' onClick={playSound}>
                  <audio src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" className='clip' id='X'></audio>
                  <span className="pad-inner-text">X</span>
                </button>
                <button className="btn btn-secondary drum-pad" id='closed-hh' onClick={playSound}>
                  <audio src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" className='clip' id='C'></audio>
                  <span className="pad-inner-text">C</span>
                </button>
              </div>
              <div className='pad-footer' >
                <div className='row footer-row'>
                  <div className='col-sm-3 display-col logo-col'>
                    <img src={fCCLogo} alt="FreeCodeCamp Logo" className="logo-fcc"/>
                  </div>
                  <div className='col-sm-6 display-col'>
                    <div className="display" id='display'>
                      <span className="pad-num">{padData.padData}</span>
                      <span className="pad-name">{padData.padName}</span>
                      <span className="volume">Vol: {padData.padVol}</span>
                    </div>
                  </div>
                  <div className='col-sm-3 display-col'>
                    <div className="vol-controls d-flex flex-column">
                      <span className="vol-title">Vol</span>
                        <button className="arrow-pad" onClick={handleVolume} id="vol-up">
                        <i class="bi bi-caret-up-square arrow-up arrow"></i>
                        </button>
                        <button className="arrow-pad" onClick={handleVolume} id="vol-down"> 
                          <i class="bi bi-caret-down-square arrow-down arrow"></i>
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </div>
      <span className="atribution">
        Coded by <a href="https://www.linkedin.com/in/joel-lopez-0595ba193/">Joel WebDev</a>
      </span>
    </main>
  );
}

export default App;
