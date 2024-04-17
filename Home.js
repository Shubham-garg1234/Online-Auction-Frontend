import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import './Home.css';

const Home=()=>{

    return(
    <div>
      <div className="page-container">
        <Header/>
        <Body/>
        <Footer/>
        </div>
    </div>)
}
export default Home;