import './Home.css';

const Header = () => {
    const logo = require('./th.jpeg');
    const userName = "Shubham Garg";

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
                                Welcome {userName}
                            </div>
                            <ul className="dropdown-menu dropdown-menu-start">
                                <li><button className="dropdown-item" type="button">Add Coins</button></li>
                                <li><button className="dropdown-item" type="button">Accounts</button></li>
                                <li><button className="dropdown-item" type="button">Logout</button></li>
                            </ul>
                        </div>
                    </li>
                    <li>🪙 Coins</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
