import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://localhost:3000/';

const stripePayment = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: req.body.cart.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name
          },
          unit_amount: item.price * 100
        },
        quantity: item.qty
      };
    }),
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}pay/success/${orderId}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`
  });
  res.json({ url: session.url });
  res.redirect(303, session.url);
});

export { stripePayment };
