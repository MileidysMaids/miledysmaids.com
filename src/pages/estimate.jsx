import React, { useState } from "react";

const EstimatePage = () => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [result, setResult] = useState(0);

  const calculate = () => {
    // Perform your calculation based on the selected options
    const total = option1 + option2;
    setResult(total);
  };

  return (
    <div>
      <h1>Estimate Page</h1>
      <div>
        <label>Option 1:</label>
        <input type="number" value={option1} onChange={(e) => setOption1(e.target.value)} />
      </div>
      <div>
        <label>Option 2:</label>
        <input type="number" value={option2} onChange={(e) => setOption2(e.target.value)} />
      </div>
      <button onClick={calculate}>Calculate</button>

      <div>
        <h2>Result: {result}</h2>
      </div>
    </div>
  );
};

export default EstimatePage;
