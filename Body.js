import React, { useState } from "react";
import "./DialogBox.css";
import Crausel from "./Crausel";
import { Cloudinary } from "@cloudinary/url-gen";

const Body = () => {
  const [itemName, setItemName] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const searchparams = new URLSearchParams(window.location.search);
  const token = searchparams.get("token");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = () => {
    // Check if all form fields are filled
    if (!itemName || !startingPrice || !description || !image) {
      alert("Please fill in all fields.");
      return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mopstpg2");
    data.append("cloud_name", "doheku3wc");

    fetch("https://api.cloudinary.com/v1_1/doheku3wc/image/upload", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url) {
          setImageUrl(data.secure_url);
        }
      })
      .catch((error) => {
        console.error("Error uploading image to Cloudinary:", error);
      }).then(()=>{

      }).then(()=>{
        fetch("http://localhost:3003/api/auth/uploaditems",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token
          },
          body: JSON.stringify({ imageUrl,itemName,description,startingPrice }),
        }).catch((err)=>{console.log(err)})
        .then(response => {
          return response.json()
        })
        .then(json => {
          setDescription("");
          setItemName("");
          setImage("");
          setImageUrl("");
          setStartingPrice("");
          setImagePreview("");
          if(json.message){
            alert(json.message)
          }else{
            alert(json.error)
          }
        })
      })
      ;
  };

  return (
    <div className="HomeBody">
      <div className="crausel">
        <Crausel />
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          id="sellbutton"
        >
          + SELL
        </button>

        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Sell Item
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Item Name
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                Starting Price
                <input
                  type="number"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(e.target.value)}
                />
                Description
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {image && <img src={imagePreview} className="uploaded_item_image" alt="Uploaded" />}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={uploadImageToCloudinary}
                  data-bs-dismiss="modal"
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
