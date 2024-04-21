
import React , { useEffect, useState } from 'react'
import '../../assets/css/liveAuction.css'
import { io } from "socket.io-client";

const socket = io('http://localhost:3000');

export default function LiveAuction({ auction }) {

  const auctionId=auction._id;
  const searchparams = new URLSearchParams(window.location.search);
  const token = searchparams.get("token");
  const[timerclass,settimerclass]=useState('timer');

  const [completed , setCompleted] = useState(false)

  const[timer,settimer]=useState(10000000000);
  const [biddingItem , setbiddingItem] = useState(null)
  const[bidamount,setbidamount]=useState(null);
  const[nextbid,setNextbid]=useState(null);

  const fetchNextBiddingItem = () => {
    fetch("http://localhost:3003/api/auth/fetchNextBiddingItem",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ auctionId: auction._id }),
    })
    .catch((err)=>{console.log(err)})
    .then(response => {
      return response.json()
    })
    .then(json => {
      console.log(json)
      if(json.success){
        setbiddingItem(json.currentBiddingItem)
      }
      else{
        alert(json.message)
        setCompleted(true)
      }
    })
  }

  useEffect(() => {
    socket.emit("join", token);

    socket.on("detail_to_all", (message) => {
      if(message){
      setbidamount(message.bidamount)
      setNextbid(message.nextbid)
      settimer(message.timer)
      }

    });
    return () => {
      socket.off("message_to_client");
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        settimer((prevTimer) => prevTimer - 1);
        console.log(timer);
      }
      if (timer <= 5) {
        settimerclass('red-timer');
      } else {
        settimerclass('timer');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);
  
  const fetchBiddingItem = () => {
    
    fetch("http://localhost:3003/api/auth/fetchBiddingItem",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },
        body: JSON.stringify({ auctionId: auction._id }),
      })
      .catch((err)=>{console.log(err)})
      .then(response => {
        return response.json()
      })
      .then(json => {
        setbiddingItem(json.currentBiddingItem);
        setNextbid(json.currentBiddingItem.
          starting_price);
        setbidamount(0);
    })
  }

  useEffect(() => {
    fetchBiddingItem()
  }, [])
  

  const make_a_bid = (event) => {
    event.preventDefault()
    let newamount;
    setbidamount(nextbid);
    if(bidamount==0){
      newamount=biddingItem.starting_price+0.1*biddingItem.starting_price;
    }else{
      newamount=0.1*(biddingItem.starting_price)+nextbid;
    }
    const message={timer:10000000000, bidamount:nextbid, nextbid:newamount};
    socket.emit("detail_to_server",message);
    console.log(newamount)
    setNextbid(newamount)
    settimer(10000000000)

    fetch("http://localhost:3003/api/auth/make_a_bid",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ auctionId: auction._id }),
    })
    .catch((err)=>{console.log(err)})
    .then(response => {
      return response.json()
    })
    .then(json => {
      if(!json.success){
        alert(json.error)
      }
    })

  }

  return (
    <div>
        <div className='flex-container'>
          <div>
            <h1 className='heading'>{auction.name}</h1>
            <br/><br/><br/><br/>
            <p className='price'>Starting price:  {biddingItem ? biddingItem.starting_price : ''}</p>
            <p className='name'>Seller Name:  {biddingItem ? biddingItem.sellerName : ''}</p>
            <br></br>
            <p className='price'>Last Bid:  {bidamount ? bidamount : 'No Bid Yet'}</p>
            <p className='name'>Bidder Name:  {biddingItem ? biddingItem.bidderName : ''}</p>
          </div>
          <div id="intersection-line"></div>
          <div>
          <h2 className='itemName'>{biddingItem ? biddingItem.name : ''}</h2>
            <div className='outer-image'>
              <img className='' src = {require('../../assets/images/th.jpeg')} />
              <div className='button-container'>
                <button onClick = {make_a_bid} className='bid-button'>Make a bid of {nextbid}</button>
            </div>
            </div>
          </div>
          <div>
            {!completed ? 
              <div className={timerclass}> {timer} </div>
            :
              <div>Auction Completed</div>
            }
            <p className='description'>{biddingItem ? biddingItem.description : ''}</p>
          </div>
        </div>

    </div>
  )
}


