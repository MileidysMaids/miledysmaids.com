import { stripe } from "./config/stripe";

export default async (req, res) => {
  const { setupIntentId, additionalCharges, amount } = req.body;

  // Retrieve SetupIntent to get the payment method
  const setupIntent = await stripe.setupIntents.retrieve(setupIntentId);
  const paymentMethodId = setupIntent.payment_method;

  try {
    // Create a PaymentIntent with the total amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount + additionalCharges, // Total amount in cents
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to charge the customer" });
  }
};
