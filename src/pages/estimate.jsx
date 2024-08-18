import React from "react";
import { useEstimate } from "../hooks/useEstimate";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { usePayments } from "@/hooks/usePayments";
import { CheckoutForm } from "@/components/CheckoutForm";

export default function EstimatePage() {
  const { Checkout, stripe } = usePayments(CheckoutForm);
  const { estimate, calculate } = useEstimate();
  // On form change, calculate the estimate
  const { register, handleSubmit } = useForm();

  const handleCalculateEstimate = (data) => {
    calculate(data);
  };

  return (
    <>
      <form onChange={handleSubmit(handleCalculateEstimate)}>
        {/* Inputs for estimate */}
        <div className="flex flex-col justify-center">
          <div>
            <label>Bedroom count</label>
            <input
              defaultValue={0}
              {...register("bedroom_count")}
              className="input input-bordered w-full max-w-xs"
              type="number"
              name="bedroom_count"
            />
          </div>
          <div>
            <label>Bathroom count</label>
            <input
              defaultValue={0}
              {...register("bathroom_count")}
              className="input input-bordered w-full max-w-xs"
              type="number"
              name="bathroom_count"
            />
          </div>
          <div>
            <label>Square feet</label>
            <input
              defaultValue={0}
              {...register("square_feet")}
              className="input input-bordered w-full max-w-xs"
              type="number"
              name="square_feet"
            />
          </div>
          <div>
            <label>Frequency</label>
            <select
              defaultValue={"one_time"}
              {...register("service_frequency")}
              className="select select-bordered w-full max-w-xs"
              name="service_frequency">
              <option value="one_time">One time</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label>Window count</label>
            <input
              defaultValue={0}
              {...register("window_count")}
              className="input input-bordered w-full max-w-xs"
              type="number"
              name="window_count"
            />
          </div>
          <div>
            <label>Oven count</label>
            <input
              defaultValue={0}
              {...register("oven_count")}
              className="input input-bordered w-full max-w-xs"
              type="number"
              name="oven_count"
            />
          </div>
          <div>
            <label>Microwave count</label>
            <input
              defaultValue={0}
              {...register("microwave_count")}
              className="input input-bordered w-full max-w-xs"
              type="number"
              name="microwave_count"
            />
          </div>
          <div>
            <label>Refrigerator count</label>
            <input
              defaultValue={0}
              {...register("refrigerator_count")}
              className="input input-bordered w-full max-w-xs"
              type="number"
              name="refrigerator_count"
            />
          </div>
          <div>
            <label>Has basement</label>
            <input {...register("has_basement")} className="checkbox" type="checkbox" name="has_basement" />
          </div>
          <div>
            <label>Has pet</label>
            <input {...register("has_pet")} className="checkbox" type="checkbox" name="has_pet" />
          </div>
          <div>
            <label>Has baseboard</label>
            <input {...register("has_baseboard")} className="checkbox" type="checkbox" name="has_baseboard" />
          </div>
          <div>
            <label>Has kitchen cabinets</label>
            <input {...register("has_kitchen_cabinets")} className="checkbox" type="checkbox" name="has_kitchen_cabinets" />
          </div>
          <div>
            <label>Has bathroom cabinets</label>
            <input {...register("has_bathroom_cabinets")} className="checkbox" type="checkbox" name="has_bathroom_cabinets" />
          </div>
          <div>
            <label>Has change linens</label>
            <input {...register("has_change_linens")} className="checkbox" type="checkbox" name="has_change_linens" />
          </div>
        </div>

        <button className="btn" type="submit">
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
      </form>

      <div className="max-w-3xl">
        <Checkout />
      </div>
    </>
  );
}
