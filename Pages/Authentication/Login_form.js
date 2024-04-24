import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Auth.css';

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
    .then(response => {
      return response.json()
    })
    .then(json => {
      if(json.success){
        const token=json.authToken;
        window.location.href = "http://localhost:1234/Home?token=" + token;
      }
      else{
        alert(json.error)
      }
    })
 }

 const handleGoogleSignin = (event) => {
  window.open("http://localhost:3003/auth/google-login" , "_self");
 }

  return (
    <div className="background" >
      <div className="shape"></div>
      <div className="shape"></div>
      <form className="AuthForm" onSubmit={Login}>
        <h3>Login Here</h3>

        <label htmlFor="Email" >Email</label>
        <input type="text" placeholder="Email" id="username" onChange={(e)=>{setemail(e.target.value)}} />

        <label htmlFor="password" >Password</label>
        <input type="password" placeholder="Password" id="password" onChange={(e)=>{setpwd(e.target.value)}}/>
        <button className="AuthButton">Log In</button>
        <div className="social">
            <div className="go"><i className="fab fa-google"></i> <Link to="/Forgot_password"> Forgot Password</Link> </div>
            <div className="fb"><i className="fab fa-facebook"></i>  <Link to="/Create_Account"> Create Account </Link></div>
        </div>
        <button onClick = {handleGoogleSignin} class="google-signin-button">Sign in with Google</button>
      </form>
    </div>
  );
};

export default LoginForm;
