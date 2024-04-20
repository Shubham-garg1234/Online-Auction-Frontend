import { useEffect, useState } from "react";
import '../../assets/css/AuctionCard.css'

const AuctionCard = ({ details }) => {
    const AuctionName=details.name;
    const itemsArray = details.items.map(data => data.id); 
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    const [items, setItems] = useState(null);

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = () => {
        fetch("http://localhost:3003/api/auth/getItemsDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
            body: JSON.stringify({ token, itemsArray }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.items);
            setItems(data.items);
        })
        .catch(error => {
            console.error("Error fetching items:", error);
        });
    }

    return (
        <>
            <div className="AuctionCard-container">
            <h1 className="auction-card-heading">{AuctionName}</h1>
            {items && items.map((item, index) => (
                <div className="AuctionCard-box" key={index}>
                    <div>
                    <h3>{index+1}. {item.name}</h3>
                    <br></br>
                    <br></br>
                    <p><b>Description:</b> {item.description}</p>
                    <p><b>Starting Price:</b> {item.starting_price} coins</p>
                    </div>
                    <div>
                    <img src={item.image} />
                    </div>
                </div>
            ))}
            </div>
        </>
    );
}

export default AuctionCard;
