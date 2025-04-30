import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [ticks, setTicks] = useState(0);
  const [instrument, setInstrument] = useState("MES");
  const [result, setResult] = useState(0);
  const [points, setPoints] = useState(0);
  const [contracts, setContracts] = useState(1);

  const instrumentMap = {
    ES: { name: "E-mini S&P 500", tickSize: 0.25, tickValue: 12.5 },
    MES: { name: "Micro E-mini S&P 500", tickSize: 0.25, tickValue: 1.25 },
    NQ: { name: "E-mini Nasdaq 100", tickSize: 0.25, tickValue: 5 },
    MNQ: { name: "Micro E-mini Nasdaq 100", tickSize: 0.25, tickValue: 0.5 },
    YM: { name: "E-mini Dow Jones", tickSize: 1.0, tickValue: 5 },
    MYM: { name: "Micro E-mini Dow Jones", tickSize: 1.0, tickValue: 0.5 },
    RTY: { name: "E-mini Russell 2000", tickSize: 0.1, tickValue: 5 },
    M2K: { name: "Micro E-mini Russell 2000", tickSize: 0.1, tickValue: 0.5 },
    GC: { name: "Gold Futures", tickSize: 0.1, tickValue: 10 },
    XAUUSD: { name: "Spot Gold (XAU/USD)", tickSize: 0.01, tickValue: 0.01 },
    CL: { name: "Crude Oil Futures", tickSize: 0.01, tickValue: 10 },
    "6E": { name: "Euro FX Futures", tickSize: 0.00005, tickValue: 6.25 },
  };
  useEffect(() => {
    const config = instrumentMap[instrument];
    const dollars = parseFloat(ticks) * config.tickValue * contracts;
    const pts = parseFloat(ticks) * config.tickSize * contracts;
    setResult(dollars);
    setPoints(pts);
  }, [ticks, instrument, contracts]);

  const handleInstrumentChange = (e) => {
    setInstrument(e.target.value);
  };

  const handleSliderChange = (e) => {
    setTicks(e.target.value);
  };

  const handleContractsChange = (e) => {
    setContracts(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ padding: "0px", textAlign: "center" }}>
          <h1>Tick Calculator</h1>

          <select
            value={instrument}
            onChange={handleInstrumentChange}
            style={{
              padding: "10px",
              marginBottom: "30px",
              borderRadius: "10px",
              border: "none",
              outlineWidth: "0",
              cursor: "pointer",
            }}
          >
            {Object.keys(instrumentMap).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>

          <input
            type="range"
            min="0"
            max="1000"
            value={ticks}
            onChange={handleSliderChange}
            step="1"
            style={{ width: "90%", cursor: "pointer" }}
          />

          <div
            className="inputs"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="box1"
              style={{ margin: "20px", marginTop: "30px" }}
            >
              <p
                style={{
                  margin: "0",
                  textAlign: "left",
                  fontSize: "1rem",
                  marginTop: "30px",
                }}
              >
                Ticks
              </p>
              <input
                type="number"
                value={ticks}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  outlineWidth: "0",
                  cursor: "pointer",
                }}
                onChange={(e) => setTicks(e.target.value)}
                placeholder="Enter ticks"
              />
            </span>
            <span
              className="box2"
              style={{ margin: "20px", marginTop: "30px" }}
            >
              <p
                style={{
                  margin: "0",
                  textAlign: "left",
                  fontSize: "1rem",
                  marginTop: "30px",
                }}
              >
                Contracts
              </p>
              <input
                type="number"
                value={contracts}
                onChange={handleContractsChange}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  outlineWidth: "0",
                  cursor: "pointer",
                }}
                placeholder="Enter number of contracts"
              />
            </span>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h2>Instrument: {instrumentMap[instrument].name}</h2>
            <h2 style={{ marginBottom: "0" }}>Ticks: {ticks}</h2>
            <div
              style={{
                marginBottom: "20px",
                fontStyle: "italic",
                opacity: "0.8",
                fontSize: "25px",
              }}
            >
              <span>
                Tick Size: {instrumentMap[instrument].tickSize}
                {", "}
              </span>
              <span>Tick Value: ${instrumentMap[instrument].tickValue}</span>
            </div>
            <strong>Points:</strong> {points.toFixed(2)}
            <h2>
              Result: ${" "}
              {Number(result).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
