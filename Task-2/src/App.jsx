import { useState, useEffect } from "react";
import Gallery from "./Gallery";
import "./Gallery.css";
import { images } from "./Gallery";
import "./App.css";

function App() {
  const [dateNow, setDateNow] = useState("");

  useEffect(() => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");

    const formatted =
      `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()} ` +
      `${pad(now.getHours())}:${pad(now.getMinutes())}`;

    setDateNow(formatted);
  }, []);

  return (
    <div>
      <h1>Галерея</h1>
      <div className="info-bar">
        Кількість зображень:{images.length} | Станом на: {dateNow}
      </div>
      <Gallery />
    </div>
  );
}

export default App;
