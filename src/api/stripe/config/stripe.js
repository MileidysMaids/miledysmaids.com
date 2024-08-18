import { Stripe } from "stripe";

const config = {
  apiVersion: "2024-06-20",
  appInfo: {
    // For sample support and debugging, not required for production:
    name: "Mileidy's Maids",
    // version: "0.0.2",
    // url: "https://github.com/stripe-samples",
  },
};

export const stripe = Stripe(process.env.STRIPE_SECRET_KEY, config);
