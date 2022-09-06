
import React from "react";
import Twitter from "../twitter.png"
export default function Quote(props) {

    

    return(
        <div className="card" id="quote-box">
            <div className="card-body">
                <blockquote className="blockquote">
                    <p className="card-text"
                    id="text">{props.quote.text}</p>
                    <footer className="blockquote-footer " id="author">
                        {props.quote.author}
                    </footer>
                </blockquote>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <div className="social-wrapper">
                    <a href="twitter.com/intent/tweet" className="btn  btn-social" id="tweet-quote"><img src={Twitter} alt="twitter logo" className="twitter-logo"/></a>
                </div>
                <a href="#" className="btn" id="new-quote" onClick={props.handleClick}>New Quote</a>
            </div>
        </div>
    )
        
    
}