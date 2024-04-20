
import React , { useEffect, useState } from 'react'
import '../../assets/css/liveAuction.css'

export default function LiveAuction({ auction }) {

  const searchparams = new URLSearchParams(window.location.search);
  const token = searchparams.get("token");
  const[timerclass,settimerclass]=useState('timer');

  const[timer,settimer]=useState(20);
  const [biddingItem , setbiddingItem] = useState(null)

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
  },[timer])

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
        setbiddingItem(json.currentBiddingItem)
    })
  }

  useEffect(() => {
    fetchBiddingItem()
  }, [])
  

  const make_a_bid = () => {

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
            <p className='price'>Current Bid:  {biddingItem && biddingItem.current_bid ? biddingItem.current_bid : 'No Bid Yet'}</p>
            <p className='name'>Bidder Name:  {biddingItem ? biddingItem.bidderName : ''}</p>
          </div>
          <div id="intersection-line"></div>
          <div>
          <h2 className='itemName'>{biddingItem ? biddingItem.name : ''}</h2>
            <div className='outer-image'>
              <img className='' src = {require('../../assets/images/th.jpeg')} />
              <div className='button-container'>
                <button className='bid-button'>Make a bid of 5000</button>
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

