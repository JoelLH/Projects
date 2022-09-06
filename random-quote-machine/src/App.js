
import './App.css';
import React from 'react';
import Quote from './components/Quote';
import QuoteImg from "./quote.png"

function App() {
    const [data, setData] = React.useState();
    const [quote, setQuote] = React.useState({text: "A thing long expected takes the form of the unexpected when at last it comes.", author: "Mark Twain"});
    const [bgColor, setBgColor] = React.useState({
      backgroundColor: "", color: ""
    })
    
    React.useEffect(() => {
        fetch('https://type.fit/api/quotes')
        .then(response => response.json())
        .then(json => setData(json))
        }, []);

    function handleClick(){
        const randomNum = Math.floor(Math.random() * data.length);
        
        const COLORS = ['#FF6633', '#FFB399', '#FF33FF', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
      const randomBg = Math.floor(Math.random() * COLORS.length);

        setQuote({
            text: data[randomNum].text,
            author: data[randomNum].author
        })
        setBgColor({
          backgroundColor: COLORS[randomBg],
          color: COLORS[randomBg]
        })
        console.log(COLORS[randomBg])
    }

  return (
    <div className="App" style={bgColor}>
      <Quote handleClick={handleClick} quote={quote} bgColor={bgColor.backgroundColor}/>
      <div className='atribution'>
        by <a href="#">Joel WebDev</a>
      </div>
      <img src={QuoteImg} alt=""  className='quoteBg quoteBg1'/>
      <img src={QuoteImg} alt="" className='quoteBg quoteBg2'/>
    </div>
  );
}

export default App;
