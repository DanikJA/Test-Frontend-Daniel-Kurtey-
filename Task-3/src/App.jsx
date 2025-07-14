import { useState, useEffect } from "react";
import UniversityTable from "./components/UniversityTable";
import "./App.css";

function App() {
  const [country, setCountry] = useState("");
  const [universities, setUniversities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://universities.hipolabs.com/search?country=${country}`
      );
      const data = await res.json();
      setUniversities(data);
      setSelectedCountry(country);
    } catch (error) {
      console.error(error);
    }
  };

  const resetData = () => {
    setCountry("");
    setUniversities([]);
    setSelectedCountry("");
  };

  return (
    <div className="container">
      <h1>University Finder</h1>
      <p>Selected:{selectedCountry}</p>
      <div className="formInput">
        <input
          type="text"
          placeholder="Введіть країну латиницею( наприклад: united states)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        ></input>
        <button className="SendBtn" onClick={fetchData}>
          Send
        </button>
        <button className="SendBtn" onClick={resetData}>
          Reset
        </button>
      </div>

      <div className="list">
        {universities.length > 0 ? (
          <ul>
            {universities.map((university, index) => (
              <li key={index}>
                <strong>{university.name}</strong>
                <br />
                <a
                  href={university.web_pages[0]}
                  target="_blank"
                  rel="noreferrer"
                >
                  Перейти
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Немає результатів</p>
        )}
      </div>
    </div>
  );
}

export default App;
