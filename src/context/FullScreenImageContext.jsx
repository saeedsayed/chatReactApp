import React, { useContext, useState } from "react";
import { createContext } from "react";

const FullScreenImageContext = createContext();

const FullScreenImageProvider = ({ children }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [showFullScreenImage, setShowFullScreenImage] = useState(false);
  return (
    <FullScreenImageContext.Provider
      value={{
        setImageSrc,
        imageSrc,
        setShowFullScreenImage,
        showFullScreenImage,
      }}
    >
      {children}
    </FullScreenImageContext.Provider>
  );
};

export default FullScreenImageProvider;

export const useFullImage = () => useContext(FullScreenImageContext);
