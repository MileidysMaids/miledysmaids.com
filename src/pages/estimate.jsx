import React, { useState } from "react";
import { useEstimate } from "../hooks/useEstimate";

const EstimatePage = () => {
  const { estimate, calculate } = useEstimate();

  const handleCalculateEstimate = () => {
    const bedroom_count = document.querySelector("input[name='bedroom_count']").value;
    const bathroom_count = document.querySelector("input[name='bathroom_count']").value;
    const square_feet = document.querySelector("input[name='square_feet']").value;
    const service_frequency = document.querySelector("select[name='service_frequency']").value;
    const window_count = document.querySelector("input[name='window_count']").value;
    const oven_count = document.querySelector("input[name='oven_count']").value;
    const microwave_count = document.querySelector("input[name='microwave_count']").value;
    const refrigerator_count = document.querySelector("input[name='refrigerator_count']").value;
    const has_basement = document.querySelector("input[name='has_basement']").checked;
    const has_pet = document.querySelector("input[name='has_pet']").checked;
    const has_baseboard = document.querySelector("input[name='has_baseboard']").checked;
    const has_kitchen_cabinets = document.querySelector("input[name='has_kitchen_cabinets']").checked;
    const has_bathroom_cabinets = document.querySelector("input[name='has_bathroom_cabinets']").checked;
    const has_change_linens = document.querySelector("input[name='has_change_linens']").checked;

    calculate({
      bedroom_count,
      bathroom_count,
      service_frequency,
      window_count,
      oven_count,
      microwave_count,
      refrigerator_count,
      has_basement,
      has_pet,
      has_baseboard,
      has_kitchen_cabinets,
      has_bathroom_cabinets,
      has_change_linens,
      square_feet,
    });
  };

  return (
    <div>
      {/* Inputs for estimate */}
      <div className="flex flex-col justify-center">
        <div>
          <label>Bedroom count</label>
          <input defaultValue={0} className="input input-bordered w-full max-w-xs" type="number" name="bedroom_count" />
        </div>
        <div>
          <label>Bathroom count</label>
          <input defaultValue={0} className="input input-bordered w-full max-w-xs" type="number" name="bathroom_count" />
        </div>
        <div>
          <label>Square feet</label>
          <input defaultValue={0} className="input input-bordered w-full max-w-xs" type="number" name="square_feet" />
        </div>
        <div>
          <label>Frequency</label>
          <select defaultValue={"one_time"} className="select select-bordered w-full max-w-xs" name="service_frequency">
            <option value="one_time">One time</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label>Window count</label>
          <input defaultValue={0} className="input input-bordered w-full max-w-xs" type="number" name="window_count" />
        </div>
        <div>
          <label>Oven count</label>
          <input defaultValue={0} className="input input-bordered w-full max-w-xs" type="number" name="oven_count" />
        </div>
        <div>
          <label>Microwave count</label>
          <input defaultValue={0} className="input input-bordered w-full max-w-xs" type="number" name="microwave_count" />
        </div>
        <div>
          <label>Refrigerator count</label>
          <input defaultValue={0} className="input input-bordered w-full max-w-xs" type="number" name="refrigerator_count" />
        </div>
        <div>
          <label>Has basement</label>
          <input className="checkbox" type="checkbox" name="has_basement" />
        </div>
        <div>
          <label>Has pet</label>
          <input className="checkbox" type="checkbox" name="has_pet" />
        </div>
        <div>
          <label>Has baseboard</label>
          <input className="checkbox" type="checkbox" name="has_baseboard" />
        </div>
        <div>
          <label>Has kitchen cabinets</label>
          <input className="checkbox" type="checkbox" name="has_kitchen_cabinets" />
        </div>
        <div>
          <label>Has bathroom cabinets</label>
          <input className="checkbox" type="checkbox" name="has_bathroom_cabinets" />
        </div>
        <div>
          <label>Has change linens</label>
          <input className="checkbox" type="checkbox" name="has_change_linens" />
        </div>
      </div>

      <button className="btn" onClick={handleCalculateEstimate}>
        Calculate estimate
      </button>

      {/* Estimate */}
      <div className="mt-10 text-2xl">
        {/* Render each property of estimate */}
        {Object.entries(estimate).map(([key, value]) => (
          <div key={key}>
            <span>{key}</span>: <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstimatePage;
