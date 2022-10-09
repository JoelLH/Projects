

export default function Controls(props){
        const {sessionLength , breakLength} = props.timerStatus;
        const updateLength = props.updateLength
        
        
    return(
        <section className="controls-section container">
            <div className="row justify-content-center">
                <div className="controls__wrapper d-flex justify-content-center align-items-center gap-5">
                    <div className="controls break">
                        <span className="control-label" id="break-label">
                            Break Length
                        </span>
                        <span className="control__length"
                        id="break-length"
                        >
                            {breakLength}
                        </span>
                        <div className="control_btns">
                            <button className="control-plus btn control-btn"
                            id="break-increment"
                            onClick={updateLength}
                            >
                                <i class="bi bi-caret-up"></i>
                            </button>
                            <button className="control-minus btn control-btn"
                            id="break-decrement"
                            onClick={updateLength}
                            >
                                <i class="bi bi-caret-down"></i>
                            </button>
                        </div>
                    </div>
                    <div className="controls session">
                        <span className="control-label" id="session-label">
                            Session Length
                        </span>
                        <span className="control__length"
                        id="session-length"
                        >
                            {sessionLength}
                        </span>
                        <div className="control_btns">
                            <button className="control-plus btn control-btn"
                            id="session-increment"
                            onClick={updateLength}
                            >
                                <i class="bi bi-caret-up"></i>
                            </button>
                            <button className="control-minus btn control-btn"
                            id="session-decrement"
                            onClick={updateLength}
                            >
                                <i class="bi bi-caret-down"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}