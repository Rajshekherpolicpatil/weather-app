import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [cityName, setCityName] = useState("bengaluru");
  const [initialValue, setInitialValue] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9dbce31bc50a28edd93f67494db6f926&units=metric`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, [cityName]);

  console.log(cityName);
  console.log(data);

  return (
    <div className="container">
      <div className="inputbox">
        <input
          type="text"
          placeholder="Enter city name"
          value={initialValue}
          onChange={(e) => setInitialValue(e.target.value)}
        />
        <button onClick={() => setCityName(initialValue)}>Submit</button>
      </div>

      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {data && !error ? (
        <table style={{ border: "2px solid black" }}>
          <thead>
            <tr>
              <th>Name of the place:</th>
              <td>{data.name}</td>
            </tr>
            <tr>
              <th>Temperature:</th>
              <td>{data.main?.temp}°C</td>
            </tr>
            <tr>
              <th>Cloud information:</th>
              <td>{data.weather?.[0]?.description}</td>
            </tr>
            <tr>
              <th>WindSpeed:</th>
              <td>{data.wind?.speed} m/s</td>
            </tr>
          </thead>
        </table>
      ) : (
        !error && <div>Loading...</div>
      )}
    </div>
  );
}
