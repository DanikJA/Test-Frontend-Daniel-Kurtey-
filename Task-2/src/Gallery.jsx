import { useState } from "react";
import "./Gallery.css";

import img1 from "./assets/images/1.jpg";
import img2 from "./assets/images/2.jpg";
import img3 from "./assets/images/3.jpg";
import img4 from "./assets/images/4.jpg";
import img5 from "./assets/images/5.jpg";
import img6 from "./assets/images/6.jpg";
import img7 from "./assets/images/7.jpg";
import img8 from "./assets/images/8.jpg";
import img9 from "./assets/images/9.jpg";
import img10 from "./assets/images/10.jpg";
import img11 from "./assets/images/11.jpg";
import img12 from "./assets/images/12.jpg";

export const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
];

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="gallery">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            onClick={() => setSelectedImage(src)}
          />
        ))}
      </div>

      {selectedImage && (
        <>
          <div className="overlay" onClick={() => setSelectedImage(null)}></div>
          <div className="modal">
            <img src={selectedImage} alt="Full-size" />
            <button onClick={() => setSelectedImage(null)}>✖</button>
          </div>
        </>
      )}
    </>
  );
}

export default Gallery;
