
import React , { useState , useEffect } from 'react'
import '../../assets/css/Notifications.css'
import formatDate from  '../../assets/Utils/FormatDate';

export default function History() {

  const searchparams = new URLSearchParams(window.location.search);
  const token = searchparams.get("token");
  const [transactions , setTransactions] = useState([])

  const fetchTransactions = async () => {
      try {
          
          const response = await fetch(`http://localhost:3003/api/auth/fetchTransactions`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "auth-token": token
            },
          });
          const json = await response.json();
          if(json.success)    setTransactions(json.transactions)
          console.log(json);
  
      } catch (error) {
          console.error("Error While Fetching Notification" , error)
      }
    }
  
    useEffect(() => {
        //fetchTransactions()
  }, [])

  return (
    <div>
      <div className='flex-container1'>
      <div className='box'>
        <h1 className='heading'>Transactions</h1>

        {transactions.map((item , index) => (
          <div key = {index} className='transactionBox'>
            <div className='row1'>
                <p>{item.name}</p>
                <p>{item.amount} 🪙</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
