import { useEffect, useState } from "react";

const AuctionCard = ({ details }) => {
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
            {items && items.map((item, index) => (
                <div key={index}>
                    <p>{item.name}</p>
                    <p>{item.description}</p>
                    <p>{item.starting_price}</p>
                    <p>{item.image}</p>
                </div>
            ))}
        </>
    );
}

export default AuctionCard;
