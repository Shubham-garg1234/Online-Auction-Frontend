import React, { useState } from 'react';
import './Auth.css';


  const Forgotpwd = () => {

  const [email,setemail]=useState('');
  const [switcher , setSwitcher] = useState(0)
  const [otp , setOtp] = useState('')
  const [pwd , setpwd] = useState('')
  const [conpwd , setconpwd] = useState('')


  const sendotp=(e)=>{
      e.preventDefault();
      fetch("http://localhost:3003/api/auth/forgot-pass", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
          if (json.success) {       
              setSwitcher(1);
          } else {
              alert(json.error);
          }
      })
      .catch(error => {
          // Handle network errors or other issues
          console.error("Error:", error);
      });
  }

  const verifyotp=(e)=>{
    e.preventDefault();
    fetch("http://localhost:3003/api/auth/verify-otp", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email , otp }),
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
        if (json.success) {       
            setSwitcher(2);
        } else {
            alert(json.error);
        }
    })
    .catch(error => {
        // Handle network errors or other issues
        console.error("Error:", error);
    });
  }
  
  const resetPass=(e)=>{
    e.preventDefault()
    if(pwd != conpwd){
      alert('Both Passwords do not match')
      return;
    }
    e.preventDefault();
    fetch("http://localhost:3003/api/auth/reset-pass", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email , pwd }),
    })
    .then(response => {
      return response.json();
    })
    .then(json => {
        if (json.success) {       
            alert('Password Reset Successful')
        } else {
            alert(json.error);
        }
    })
    .catch(error => {
        // Handle network errors or other issues
        console.error("Error:", error);
    });
  }

 if(switcher == 0){
    return (
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        <form className="AuthForm" onSubmit={sendotp}>
          <h3>Reset Password</h3>

          <label htmlFor="Email" >Email</label>
          <input type="text" placeholder="Email" id="username" onChange={(e)=>{setemail(e.target.value)}} />

          <button className="AuthButton">Send OTP</button>
        </form>
      </div>
    );
 }
 else if(switcher == 1){
    return <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form className="AuthForm">
        <h3>Verify OTP</h3>

        <label htmlFor="OTP" >OTP</label>
        <input type="text" placeholder="OTP" id="otpInput" value={otp} onChange={(e)=>{setOtp(e.target.value)}} />

        <button className="AuthButton" onClick={verifyotp} >Verify OTP</button>
      </form>
    </div>
 }
 else {
    return <div className="background">
    <div className="shape"></div>
    <div className="shape"></div>
    <form className="AuthForm">
      <h3>Set Password</h3>

      <label htmlFor="UserName" >Password</label>
      <input type="password" value = {pwd} placeholder="Password" id="username" onChange={(e)=>{setpwd(e.target.value)}} />

      <label htmlFor="Email" >Confirm Password</label>
      <input type="password" value = {conpwd} placeholder="Confirm Password" id="username" onChange={(e)=>{setconpwd(e.target.value)}} />

      <button className="AuthButton" onClick={resetPass} >Reset</button>
    </form>
  </div>
 }
};

export default Forgotpwd;

