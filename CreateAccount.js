import React, { useState } from 'react';

const Create_Account = () => {

const [email,setemail]=useState('');
const [username,setusername]=useState('');
const[switcher,setswitcher]=useState(0);
const[pwd,setpwd]=useState('');
const[conpwd,setconpwd]=useState('');


const sendotp=(e)=>{
  e.preventDefault();
  if(pwd!=conpwd){
    window.alert("Password doesnot match");
  }else{
    fetch("http://localhost:3000/api/auth/send-otp",{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username,email,pwd}),
    })
  }
 }

const ChangePage=()=>{
  setswitcher(1)
}
const ChangePage2=()=>{
  setswitcher(0)
}

  if(switcher==0){return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <div>
      <form >
        <h3>Create Account</h3>

        <label htmlFor="UserName" >Username</label>
        <input type="text" placeholder="Username" id="username" onChange={(e)=>{setusername(e.target.value)}} />

        <label htmlFor="Email" >Email</label>
        <input type="text" placeholder="Email" id="username" onChange={(e)=>{setemail(e.target.value)}} />

        <button onClick={ChangePage}>Next</button>
      </form>
      </div>
    </div>
  );}else if(switcher==1){
    return <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form>
        <h3>Set Password</h3>

        <label htmlFor="UserName" >Password</label>
        <input type="text" placeholder="Password" id="username" onChange={(e)=>{setpwd(e.target.value)}} />

        <label htmlFor="Email" >Confirm Password</label>
        <input type="text" placeholder="Confirm Password" id="username" onChange={(e)=>{setconpwd(e.target.value)}} />

        <button onClick={sendotp} >Send OTP</button>
        <button style={{width:"30%"}} onClick={ChangePage2}>Back</button>
      </form>
    </div>
  }
};

export default Create_Account;
