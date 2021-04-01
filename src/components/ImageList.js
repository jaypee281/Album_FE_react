import React, { useContext } from "react";
import axios from "axios";
import AlbumContext from "../context";

export default function ImageList() {
  const { state, dispatch } = useContext(AlbumContext);
  const title =
    state.images.length > 0 ? `${state.images.length} Images` : "No Images In Album!";

  return (
    <div className="container">
      <h1 className="text-bold">{title}</h1>
      <ul className="photoList" >
        {state.images.map(i => (
          <li
            key={i.id}
            className=""
          > 
          <div>
            <span
              onDoubleClick={async () => {
                const response = await axios.post(
                  `http://localhost:8080/album/images/${i.id}`,
                  {
                    like: !i.like
                  }
                );
                dispatch({ type: "LIKE_IMAGE", payload:i });
              }}
              
            >
             <img class="photo" src={i.image}></img>

            </span>
            </div>
            <div className="image-buttons">
            <button className={i.like?"like-button":"unlike-button"} >{i.like?"Liked":"Not Liked"} </button>
            <button className="delete-button"
              onClick={() =>
                dispatch({ type: "SET_CURRENT_IMAGE", payload: i })
              }
            >
              Change Image
            </button>
            <button className="delete-button"
              onClick={async () => {
                await axios.delete(
                  `http://localhost:8080/album/images/${i.id}`
                );
                dispatch({ type: "REMOVE_IMAGE", payload: i });
              }}
            >
              Delete Image
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}