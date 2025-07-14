import { useState, useEffect } from "react";
import UniversityTable from "./components/UniversityTable";
import "./App.css";

const LOCAL_STORAGE_KEY = "universityAppData";

function App() {
  const [country, setCountry] = useState("");
  const [universities, setUniversities] = useState([]);
  const [selected, setSelected] = useState({});
  const [isLoadedFromStorage, setIsLoadedFromStorage] = useState(false);

  // Відновлюємо стан з localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const { country, universities, selected } = JSON.parse(saved);
      setCountry(country);
      setUniversities(universities);
      setSelected(selected);
    }
    setIsLoadedFromStorage(true); //
  }, []);

  // Збереження у localStorage при зміні (але проводимо тільки після завантаження)
  useEffect(() => {
    if (!isLoadedFromStorage) return;
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ country, universities, selected })
    );
  }, [country, universities, selected, isLoadedFromStorage]);

  const handleFetch = async () => {
    if (!country.trim()) return;

    try {
      const res = await fetch(
        `http://universities.hipolabs.com/search?country=${country}`
      );
      const data = await res.json();
      setUniversities(data);
      setSelected({});
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    setCountry("");
    setUniversities([]);
    setSelected({});
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const toggleCheckbox = (index) => {
    setSelected((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div className="container">
      <h1>University Finder</h1>
      <p>Обрано: {selectedCount}</p>

      <div className="form">
        <input
          type="text"
          placeholder="Введіть країну (латиницею, наприклад: ukraine)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={handleFetch}>Відправити</button>
        <button onClick={handleReset}>Скинути</button>
      </div>

      {universities.length > 0 && (
        <UniversityTable
          universities={universities}
          selected={selected}
          onToggle={toggleCheckbox}
        />
      )}
    </div>
  );
}

export default App;
