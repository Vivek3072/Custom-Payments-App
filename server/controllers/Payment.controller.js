const Stripe = require("../models/stripe");
const ErrorRespond = require("../helpers/ErrorRespond");
const Razorpay = require("razorpay");
const Payment = require("../models/payment");
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);
require("dotenv");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

async function isStripeServiceAccessible() {
  try {
    const response = await fetch("https://api.stripe.com/v1/products", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_TEST_SECRET_KEY}`,
      },
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}

class PaymentController {
  static async makePayment(req, res) {
    const { productName, productPrice, quantity } = req.body;
    if (!productName || !productPrice || !quantity)
      return ErrorRespond(res, 404, "Please provide product details!");
    try {
      const isStripe = await isStripeServiceAccessible();
      console.log(isStripe, "isStripe");

      //Handles the payment with STRIPE
      if (isStripe) {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency: "INR",
                product_data: {
                  name: productName,
                },
                unit_amount: productPrice * 100,
              },
              quantity: quantity,
            },
          ],

          success_url: `${process.env.UI_ROOT_URI}/#/payments/success`,
          cancel_url: `${process.env.UI_ROOT_URI}/#/payments/cancel`,
        });
        // console.log(session, "session");
        if (session.url) {
          const newPayment = await Payment.create({
            stripe_payment_id: session.id,
            amount_subtotal: session.amount_subtotal / 100,
            payment_status: session.payment_status,
            datetime: session.created,
          });
          await newPayment.save();

          return res.json({
            message: "payment_session_created",
            url: session.url,
          });
        }
      } else {
        // HANDLES THE PAYMENT WITH RAZORPAY IN CASE STRIPE IS NOT WORKING
        const options = {
          currency: "INR",
          receipt: "razorUser@gmail.com",
        };

        razorpayInstance.orders.create(options, (err, order) => {
          if (!err) {
            res.status(200).send({
              success: true,
              msg: "Order Created",
              order_id: order.id,
              amount: productPrice * 100,
              key_id: process.env.RAZORPAY_ID_KEY,
              product_name: productName,
              description: "This is a very nice product!",
              contact: "9191919191",
              name: "Vivek",
              email: "viv@gmail.com",
              ...order,
            });
          } else {
            return ErrorRespond(
              res,
              400,
              "Something went wrong with razorpay!" + err
            );
          }
        });
      }
    } catch (e) {
      return ErrorRespond(res, 500, e.message);
    }
  }

  static async getPaymentStatus(req, res) {
    try {
      const payload = req.body;
      const sig = req.headers["stripe-signature"];

      const event = stripe.webhooks.constructEvent(
        payload,
        sig,
        process.env.WH_ENDPOINT_SECRET
      );

      const paymentId = event.data.object.id;
      const paymentStatus = event.data.object.payment_status;

      const payment = await Payment.findOne({ stripe_payment_id: paymentId });

      if (!payment)
        return res.status(404).json({ message: "No payment record found!" });

      await payment.updateOne({ payment_status: paymentStatus });

      res.sendStatus(200);
    } catch (e) {
      return ErrorRespond(res, 500, e.message);
    }
  }
  static async createPayment(req, res) {
    try {
      if (!req.body.stripe_live_key || !req.body.stripe_private_key)
        return ErrorRespond(
          res,
          400,
          "Please provide complete stripe credentials"
        );
      if (!req.body.currency)
        return ErrorRespond(res, 400, "Please provide currency");
      if (!req.body.payment_method_types)
        return ErrorRespond(res, 400, "Please provide your payment method");

      const date = new Date();
      const stripeData = new Stripe({
        userId: req.user.id,
        stripe_live_key: req.body.stripe_live_key,
        stripe_private_key: req.body.stripe_private_key,
        payment_method_types: req.body.payment_method_types,
        currency: req.body.currency,
        datetime: date,
      });
      await stripeData.save();
      return res.json({
        message: "Stripe credentials Saved Successfully!",
      });
    } catch (e) {
      return ErrorRespond(res, 500, e.message);
    }
  }

  static async getStripeData(req, res) {
    try {
      const data = await Stripe.findOne({ userId: req.user.id });
      res.status(200).send(data);
    } catch (e) {
      return ErrorRespond(res, 500, e.message);
    }
  }
}

module.exports = PaymentController;
