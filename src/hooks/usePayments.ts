import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

let stripe;

export const getStripe = () => {
  if (!stripe) stripe = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);
  return stripe;
};

const componentWithStripe = ({ CheckoutComponent, clientSecret }) => {
  const stripe = getStripe();
  return (
    <Elements stripe={stripe} options={{ clientSecret, appearance: { theme: "stripe" } }}>
      <CheckoutComponent
        PaymentComponent={
          <PaymentElement
            onReady={console.log}
            options={{
              layout: {
                type: "accordion",
                defaultCollapsed: false,
                radios: true,
                spacedAccordionItems: false,
              },
              paymentMethodOrder: ["apple_pay", "google_pay", "card", "klarna"],
            }}
          />
        }
      />
    </Elements>
  );
};

export const usePayments = (CheckoutComponent, options) => {
  const [Checkout, setCheckout] = React.useState(<div>test</div>);

  React.useEffect(() => {
    const headers = new Headers({ "Content-Type": "application/json" });
    const init = { method: "POST", headers, body: JSON.stringify(options) };

    fetch("/api/stripe/create-payment-intent", init)
      .then((response) => {
        if (response.ok === false) throw new Error(`${response.status} - ${response.statusText}`);
        return response.json();
      })
      .then(({ clientSecret }) => {
        // Create a checkout component with the Elements provider
        const Component = componentWithStripe({ CheckoutComponent, clientSecret });
        setCheckout(Component);
      })
      .catch(console.error);
  }, []);

  return { Checkout: () => Checkout };
};
