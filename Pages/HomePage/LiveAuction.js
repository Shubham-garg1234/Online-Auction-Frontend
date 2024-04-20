
import React , { useEffect, useState } from 'react'
import '../../assets/css/liveAuction.css'
import io from 'socket.io-client';

 const socket = io('http://localhost:3003');

export default function LiveAuction({ auction }) {

  const auctionId=auction._id;
  const searchparams = new URLSearchParams(window.location.search);
  const token = searchparams.get("token");
  const[timerclass,settimerclass]=useState('timer');

  const[timer,settimer]=useState(20);
  const [biddingItem , setbiddingItem] = useState(null)
  const [auctionData, setAuctionData] = useState({  time: 0,  status: 'inactive'});
  const [bidamount, setbidamount]=useState(null);
  const [nextbid,setNextbid]=useState(0);

  useEffect(()=>{
    const clock=setTimeout(()=>{
      if(timer!=0){
        const time=timer-0.1;
        settimer(time.toFixed(1));
      }else if(timer==0){
        settimer(20);
      }
      if(timer<=5){
        settimerclass('red-timer')
      }else{
        settimerclass('timer');
      }
    },100)
    return () => clearTimeout(clock);
  },[timer]);
  
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
        console.log(json)
        setbiddingItem(json.currentBiddingItem);
        console.log(biddingItem);
        setNextbid(biddingItem.starting_price);
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
      newamount=biddingItem.starting_price;
    }else{
      newamount=0.1*(biddingItem.starting_price)+bidamount;
    }
    setNextbid(newamount)

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
      console.log(json)
      
    })

  }

  const fetchNextItem = () => {
    
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
            <div className={timerclass}> {timer} </div>
            <p className='description'>{biddingItem ? biddingItem.description : ''}</p>
          </div>
        </div>

    </div>
  )
}


