import { useEffect, useState } from 'react';
import './Home.css';


const Header = () => {

    useEffect(()=>{
        details();
    },[])

    const searchparams = new URLSearchParams(window.location.search);
    const token = searchparams.get("token");
    const logo = require('./th.jpeg');
    const [user , setUser] = useState(null)


    const details = () => {

        
        fetch("http://localhost:3003/api/auth/getdetails",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
          body: JSON.stringify({ token }),
        })
          .catch((err) => {
            console.log("Error is", err);
          })
          .then(data=>data.json())
          .then(
            (data2) => (
                console.log(data2),
                setUser(data2.user)
            )
          )
      };

    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Logo" style={{width:"20vh"}}/>
                <b style={{fontFamily:"Cambria", fontSize:"24px"}}> &nbsp; FastBid</b>
            </div>
            <nav>
                <ul className="navigation">
                    <li>History</li>
                    <li>Live Auctions</li>
                    <li>Upcoming Auctions</li>
                    <li className="dropdown">
                        <div className="btn-group">
                            <div type="div" data-bs-toggle="dropdown" aria-expanded="false" id="dropdown-box-button">
                                Welcome {user ? user.name : ''}
                            </div>
                            <ul className="dropdown-menu dropdown-menu-start">
                                <li><button className="dropdown-item" type="button">Add Coins</button></li>
                                <li><button className="dropdown-item" type="button">Accounts</button></li>
                                <li><button className="dropdown-item" type="button">Logout</button></li>
                            </ul>
                        </div>
                    </li>
                    <li>🪙 {user ? user.coins : 0}</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;

