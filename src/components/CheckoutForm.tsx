import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export const CheckoutForm = ({ PaymentComponent }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, setupIntent } = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
      confirmParams: { return_url: "http://localhost:8000/" },
    });

    if (error) return setMessage(error.message);

    // Save setupIntent id to database for future charge
    console.log("setupIntent", setupIntent);

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      {/* <PaymentElement id="payment-element" /> */}
      {PaymentComponent}
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">{isProcessing ? "Processing ... " : "Pay now"}</span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};
