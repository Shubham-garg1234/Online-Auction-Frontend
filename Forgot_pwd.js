import React, { useState } from 'react';


const Forgotpwd = () => {

const [email,setemail]=useState('');


const sendotp=(e)=>{
    e.preventDefault();
    fetch("http://localhost:3000/send_resetotp",{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,pwd}),
    })
 }

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={sendotp}>
        <h3>Reset Password</h3>

        <label htmlFor="Email" >Email</label>
        <input type="text" placeholder="Email" id="username" onChange={(e)=>{setemail(e.target.value)}} />

        <button>Send OTP</button>
      </form>
    </div>
  );
};

export default Forgotpwd;
