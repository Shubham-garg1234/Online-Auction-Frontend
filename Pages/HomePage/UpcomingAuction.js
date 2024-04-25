import { useEffect, useState } from "react";
import '../../assets/css/Upcoming.css'
import formatDate from "../../assets/Utils/FormatDate";
import AuctionCard from "./AuctionCard";
import LiveAuction from "./LiveAuction";

const UpcomingAuction=()=>{
  const searchparams = new URLSearchParams(window.location.search);
  const token = searchparams.get("token");
  const[Upcoming,setUpcoming]=useState(null);
  const[ind,setind]=useState(null);
  const [switcher,setswitcher]=useState("Auction-List")

useEffect(()=>{
    Getupcoming();
},[])

const Auctiondetails=(index)=>{
    setind(index);
    setswitcher("Auction-details");
}

const [liveAuction , setLiveAuction] = useState(null)

const openLiveAuction = (auction) => {
    setLiveAuction(auction)
    setswitcher('Live-Auction')
}

const changeSwitcher = () => {
    setswitcher('Auction-List')
}
 
const Getupcoming=()=>{
    fetch("http://localhost:3003/api/auth/getUpcoming",{
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
            (data) => (
                setUpcoming(data.auctions)
            )
          )
}
    if(switcher=="Auction-List"){
        return <>
        <div className="Auction-table-box">
            <br></br>
                <table className="auction-table">
                    
                    <thead>
                        <tr>
                            <th>Auction Name</th>
                            <th>Starting Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Upcoming && Upcoming.map((auction, index) => (
                            <tr key={index}>
                            <td>
                                {auction.name}
                                {new Date(auction.starting_time).getTime() <= Date.now() && (
                                    <p className="liveLabel">(Live)</p>
                                )}
                            </td>
                            <td>{formatDate(auction.starting_time)}</td>
                            <td>
                                {new Date(auction.starting_time).getTime() <= Date.now() ? (
                                    <button className="button-aution-table" onClick={() => openLiveAuction(auction)}>Join</button>
                                ) : (
                                    <button className="button-aution-table" onClick={() => Auctiondetails(index)}>View</button>
                                )}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    }else if(switcher=="Auction-details"){
        return <AuctionCard changeSwitcher = {changeSwitcher} details={Upcoming[ind]}/>
    }else if(switcher=='Live-Auction'){
        return <LiveAuction changeSwitcher = {changeSwitcher} auction = {liveAuction} />
    }
} 
export default UpcomingAuction;