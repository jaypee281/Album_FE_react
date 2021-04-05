import uuidv4 from "uuid/v4";

export default function reducer(state, action) {
  switch (action.type) {
    case "GET_IMAGES":
      return {
        ...state,
        images: action.payload
      };
    case "ADD_IMAGE":
      if (!action.payload) {
        return state;
      }
      if (state.images.findIndex(t => t.image === action.payload) > -1) {
        return state;
      }
      const newImage=  {
        id: uuidv4(),
        image: action.payload,
        like: false
      }
      const addedImages = [...state.images,newImage];
      return {
        ...state,
        images: addedImages
      };
    case "SET_CURRENT_IMAGE":
      return {
        ...state,
        currentImage: action.payload
      };
    case "LIKE_IMAGE":
      const likedImages = state.images.map(t =>
        t.id === action.payload.id ? {...action.payload,like:!action.payload.like} : t
      );
      return {
        ...state,
        images: likedImages
      };
    case "UPDATE_IMAGE":
      if (!action.payload) {
        return state;
      }
      if (state.images.findIndex(t => t.image === action.payload) > -1) {
        return state;
      }
      const updatedImage =   {...state.currentImage,image:action.payload }
      const updatedImageIndex = state.images.findIndex(
        t => t.id === state.currentImage.id
      );
      const updatedImages = [
        ...state.images.slice(0, updatedImageIndex),
        updatedImage,
        ...state.images.slice(updatedImageIndex + 1)
      ];
      console.log(updatedImages)
      return {
        ...state,
        currentImage: {},
        images: updatedImages
      };
    case "REMOVE_IMAGE":
      const filteredImages = state.images.filter(t => t.id !== action.payload.id);
      const isRemovedImage =
        state.currentImage.id === action.payload.id ? {} : state.currentImage;
        window.location.reload();
      return {
        ...state,
        currentImage: isRemovedImage,
        images: filteredImages
      };
    default:
      return state;
  }
}
