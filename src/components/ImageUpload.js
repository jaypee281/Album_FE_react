import React, { useState, useEffect, useContext } from "react";
import AlbumContext from "../context";
import axios from "axios";
import uuidv4 from "uuid/v4";

export default function ImageUpload() {
  const [image, setImage] = useState("");
  const {
    state: { currentImage = {} },
    dispatch
  } = useContext(AlbumContext);

  useEffect(
    () => {
      if (currentImage.image) {
        setImage(currentImage.image);
      } else {
        setImage("");
      }
    },
    [currentImage.id]
  );

  const handleSubmit = async event => {
    event.preventDefault();
    if (currentImage.image) {
        const response = await axios.post(
          "http://localhost:8080/album/update",
          { id:currentImage.id,
            image: image
          }
        );
      dispatch({ type: "UPDATE_IMAGE", payload: image });
    } else {
      const response = await axios.post(
        "http://localhost:8080/album/add",
        {
          id: uuidv4(),
          image: image,
          like: false
        }
      );
     dispatch({ type: "ADD_IMAGE", payload: image });
    }
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit} className="imageUpload">
      <input
        type="text"
        placeholder="Add or Change Image Here"
        className=""
        onChange={event => setImage(event.target.value)}
        value={image}
      />
    </form>
  );
}
