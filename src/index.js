import React, { useContext, useReducer, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AlbumContext from "./context";
import albumReducer from "./reducer";
import  "./components/styles.css"
import ImageList from "./components/ImageList";
import ImageUpload from "./components/ImageUpload";
import axios from "axios";

const useAPI = endpoint => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };

  return data;
};
const App = () => {
  const initialState = useContext(AlbumContext);
  const [state, dispatch] = useReducer(albumReducer, initialState);

  const savedImages = useAPI("http://localhost:8080/album");
  console.log(savedImages);
  useEffect(
    () => {
      dispatch({
        type: "GET_IMAGES",
        payload: savedImages
      });
    },
    [savedImages]
  );

  return (
    <AlbumContext.Provider value={{ state, dispatch }}>
      <ImageUpload />
      <ImageList />
    </AlbumContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.accept();
}

