import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [ticks, setTicks] = useState(0);
  const [contractType, setContractType] = useState("micro");
  const [result, setResult] = useState(0);
  const [points, setPoints] = useState(0);
  const [contracts, setContracts] = useState(1); // New state for contracts

  useEffect(() => {
    // whenever ticks OR contractType OR contracts change, recalculate
    const dollars = parseFloat(ticks) * getTickValue() * contracts;
    const pts = parseFloat(ticks) * 0.25 * contracts;
    setResult(dollars);
    setPoints(pts);
  }, [ticks, contractType, contracts]); // <-- added contracts as a dependency

  const getTickValue = () => {
    return contractType === "micro" ? 1.25 : 12.5;
  };

  const handleCalculate = (tickValue) => {
    const dollars = parseFloat(tickValue) * getTickValue() * contracts;
    setResult(dollars);
  };

  const handleSliderChange = (e) => {
    const value = e.target.value;
    setTicks(value);
  };

  const handleContractChange = (e) => {
    const type = e.target.value;
    setContractType(type);
  };

  const handleContractsChange = (e) => {
    const value = e.target.value;
    setContracts(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1>Tick Calculator</h1>
          <select
            value={contractType}
            onChange={handleContractChange}
            style={{
              padding: "10px",
              marginBottom: "30px",
              borderRadius: "10px",
              border: "none",
              outlineWidth: "0",
              cursor: "pointer",
            }}
          >
            <option value="micro">Micro (MES)</option>
            <option value="mini">Mini (ES)</option>
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
          <div className="inputs" style={{ display: "flex" }}>
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
                onChange={(e) => {
                  setTicks(e.target.value);
                  handleCalculate(e.target.value);
                }}
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
            <h2>Ticks: {ticks}</h2>
            <strong>Points:</strong> {points.toFixed(2)}
            <h2>Result: ${result.toFixed(2)}</h2>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
