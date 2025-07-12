import { useEffect, useState } from "react";
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
  const [imgList, setImgList] = useState([]);

  // 🟡 Після першого рендеру — фільтруємо видалені картинки
  useEffect(() => {
    const deleted = JSON.parse(localStorage.getItem("deletedImages")) || [];
    const filtered = images.filter((img) => !deleted.includes(img));
    setImgList(filtered);
  }, []);

  //  При видаленні картинки — оновлюємо imgList та записуємо в localStorage
  const deleteImg = (src) => {
    setImgList((prev) => {
      const updated = prev.filter((img) => img !== src);

      const deleted = JSON.parse(localStorage.getItem("deletedImages")) || [];
      if (!deleted.includes(src)) {
        localStorage.setItem(
          "deletedImages",
          JSON.stringify([...deleted, src])
        );
      }

      return updated;
    });

    if (selectedImage === src) {
      setSelectedImage(null); // Закриваємо модалку, якщо видалене зображення — відкрите
    }
  };

  const restoreImages = () => {
    localStorage.removeItem("deletedImages");
    setImgList(images);
  };

  return (
    <>
      <div className="gallery">
        {imgList.map((src, index) => (
          <div key={index} className="gallery-item">
            <img
              src={src}
              alt={`Image ${index + 1}`}
              onClick={() => setSelectedImage(src)}
            />
            <button
              className="delete-btn"
              onClick={() => deleteImg(src)}
              title="Видалити"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {imgList.length < images.length && (
        <button className="restore-btn" onClick={restoreImages}>
          Відновити всі зображення
        </button>
      )}

      {selectedImage && (
        <>
          <div className="overlay" onClick={() => setSelectedImage(null)}></div>
          <div className="modal">
            <img src={selectedImage} alt="Full-size" />
            <button
              className="close-btn"
              onClick={() => setSelectedImage(null)}
            >
              ✖
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default Gallery;
