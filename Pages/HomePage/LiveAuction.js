
import React , { useEffect, useState } from 'react'
import '../../assets/css/liveAuction.css'

export default function LiveAuction({ auction }) {

  const searchparams = new URLSearchParams(window.location.search);
  const token = searchparams.get("token");

  console.log(auction)
  const [biddingItem , setbiddingItem] = useState(null)

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
  

  const make_a_bid = (event) => {
    event.preventDefault()

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

        <h1 className='heading'>{auction.name}</h1>
        <h2 className='itemName'>{biddingItem ? biddingItem.name : ''}</h2>
        <div className='flex-container'>
          <div>
            <p className='price'>Starting price:  {biddingItem ? biddingItem.starting_price : ''}</p>
            <p className='name'>Seller Name:  {biddingItem ? biddingItem.sellerName : ''}</p>
            <p className='price'>Last Bid:  {biddingItem && biddingItem.current_bid ? biddingItem.current_bid : 'No Bid Yet'}</p>
            <p className='name'>Bidder Name:  {biddingItem ? biddingItem.bidderName : ''}</p>
          </div>
          <div>
            <div className='outer-image'>
              <img className='' src = {require('../../assets/images/th.jpeg')} />
            </div>
          </div>
          <div>
            <p className='description'>{biddingItem ? biddingItem.description : ''}</p>
          </div>
        </div>
        <div className='button-container'>
          <button onClick = {make_a_bid} className='bid-button'>Make a bid of {biddingItem ? biddingItem.current_bid === 0 ? biddingItem.starting_price : biddingItem.current_bid + 0.1 * biddingItem.current_bid : ''}</button>
        </div>

    </div>
  )
}


