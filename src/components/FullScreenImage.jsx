import React, { useEffect, useState } from "react";
import { useFullImage } from "../context/FullScreenImageContext";
import { IoClose } from "react-icons/io5";

const FullScreenImage = () => {
  const { imageSrc, setShowFullScreenImage, showFullScreenImage } =
    useFullImage();
  if (!showFullScreenImage) return;
  return (
    <div className="full-screen-image">
      <button onClick={_=>setShowFullScreenImage(false)}><IoClose/></button>
      <img src={imageSrc} alt="image" />
    </div>
  );
};

export default FullScreenImage;
