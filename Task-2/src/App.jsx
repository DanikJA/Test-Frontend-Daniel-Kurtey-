import { useState, useEffect } from "react";
import Gallery from "./Gallery";
import "./Gallery.css";
import "./App.css";

function App() {
  const [dateNow, setDateNow] = useState("");
  const [ImageCount, setImageCount] = useState(0);

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
      <h1 className="main-title">Галерея</h1>
      <div className="info-bar">
        Кількість зображень:{ImageCount} | Станом на: {dateNow}
      </div>
      <Gallery onAmountChange={setImageCount} />
    </div>
  );
}

export default App;
