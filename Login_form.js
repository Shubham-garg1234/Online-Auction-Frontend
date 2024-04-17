import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {

const [email,setemail]=useState('');
const[pwd,setpwd]=useState('')



const Login=(e)=>{
    e.preventDefault();
    fetch("http://localhost:3003/api/auth/login",{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,pwd}),
    }).catch((err)=>{console.log(err)})
    .then((response)=>{
      if(response.ok){
        console.log(response.json());
      }
    })
 }

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form onSubmit={Login}>
        <h3>Login Here</h3>

        <label htmlFor="Email" >Email</label>
        <input type="text" placeholder="Email" id="username" onChange={(e)=>{setemail(e.target.value)}} />

        <label htmlFor="password" >Password</label>
        <input type="password" placeholder="Password" id="password" onChange={(e)=>{setpwd(e.target.value)}}/>
        <button>Log In</button>
        <div className="social">
            <div className="go"><i className="fab fa-google"></i> <Link to="/Forgot_password"> Forgot Password</Link> </div>
            <div className="fb"><i className="fab fa-facebook"></i>  <Link to="/Create_Account"> Create Account </Link></div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
