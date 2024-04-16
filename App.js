import React, { useState } from "react";
import ReactDOM from "react-dom/client"

const App=()=>{
const [text,settext]=useState(0);
const [output,setoutput]=useState(null);
const sharedata=()=>{
    console.log(text);
    fetch("http://localhost:3000/demo",{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    }).then((data)=>{
        return data.json();
    }).then((output)=>{
        setoutput(output.text);
    }).catch((err)=>{
        console.log(err);
    })
}
    return (<>
    <input type="number" onChange={(e)=>{settext(e.target.value)}}></input>
    <button onClick={sharedata}>Submit</button>
    <br></br>
    {output}
    </>);
}
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);