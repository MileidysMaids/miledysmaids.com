import { stripe } from "./config/stripe";

export const calculateTax = async (orderAmount, currency) => {
  const taxCalculation = await stripe.tax.calculations.create({
    currency,
    customer_details: {
      address: {
        line1: "10709 Cleary Blvd",
        city: "Plantation",
        state: "FL",
        postal_code: "33322",
        country: "US",
      },
      address_source: "shipping",
    },
    line_items: [
      {
        amount: orderAmount,
        reference: "ProductRef",
        tax_behavior: "exclusive",
        tax_code: "txcd_30011000",
      },
    ],
  });

  return taxCalculation;
};

// https://stripe.com/docs/api/payment_intents/create
// Create a PaymentIntent with the amount, currency, and a payment method type.
// This endpoint should be POST only
export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).send({ error: "Method not allowed" });

  const { client_secret } = await stripe.setupIntents.create({
    payment_method_types: ["card"],
  });

  res.send({ clientSecret: client_secret });
};
