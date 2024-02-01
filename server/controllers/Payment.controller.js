const Stripe = require("../models/stripe");
const ErrorRespond = require("../helpers/ErrorRespond");
const Razorpay = require("razorpay");
const Payment = require("../models/payment");
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);
require("dotenv");

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected

/**
 * A function to check on our server if the stripe server is down
 * If the stripe server is down we can redirect the user to proceed with razorpay payment gateway
 * @returns boolean Value
 * @returns true if stripe server is healthy
 * @returns false if stripe server is down
 */
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
  /**
   * ROUTE - POST - /api/payments/create-payment
   * @access - PUBLIC
   * @param {productName, productPrice, quantity} req
   * @returns payments response
   * @returns {session.url} if the stripe server is healthy
   * @returns {order_id, key_id, product_name, productPrice, amount, currency} so that the frontend can create a new razorpay payment instance(When stripe is down)
   */
  static async makePayment(req, res) {
    const { productName, productPrice, quantity } = req.body;
    if (!productName || !productPrice || !quantity)
      return ErrorRespond(res, 404, "Please provide product details!");
    try {
      const isStripe = await isStripeServiceAccessible();

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
        console.log(session, "session");
        if (session.url) {
          const newPayment = await Payment.create({
            payment_id: session.id,
            order_id: session.id,
            amount_subtotal: session.amount_subtotal / 100,
            payment_status: session.payment_status,
            datetime: session.created,
            payment_provider: "stripe",
          });
          await newPayment.save();

          return res.json({
            payment_method: "stripe",
            message: "payment_session_created",
            url: session.url,
          });
        }
      } else {
        // HANDLES THE PAYMENT WITH RAZORPAY IN CASE STRIPE IS NOT WORKING
        const razorpayInstance = new Razorpay({
          key_id: process.env.RAZORPAY_ID_KEY,
          key_secret: process.env.RAZORPAY_SECRET_KEY,
        });

        const options = {
          amount: productPrice * 100,
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
            console.log(err, "err");
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

  /**
   * ROUTE - POST - /api/payments/webhook
   * @access - PUBLIC
   * Webhook implementataion of stripe to update the payments data
   * @param {payload} req
   * the payload sent by stripe's webhook
   * @param {sendStatus} res
   * @returns status code as per the operation's success or failure
   */
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

  /**
   * ROUTE - POST - /api/payments/stripe
   * @access - PRIVATE
   * @param {stripe_live_key, stripe_private_key, currency, amount} req
   * @returns success resposne after saving the users stripe's credentials
   */
  static async saveStripeData(req, res) {
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

  /**
   * ROUTE - GET - /api/payments/stripe
   * @access - PRIVATE
   * Find the user and return his stripe's saved credentials from the database
   * Middleware verifies automatically thet the user is valid
   * @param {user.id} req
   * @returns stripes credentials
   */
  static async getStripeData(req, res) {
    try {
      const data = await Stripe.findOne({ userId: req.user.id });
      res.status(200).send(data);
    } catch (e) {
      return ErrorRespond(res, 500, e.message);
    }
  }

  /**
   * ROUTE - POST - /api/payments/save-payment
   * @access - PUBLIC
   *  This route handles logic for creating successfull payment when its one from razorpay
   * @param {payment_id, order_id, amount, currency, datetime, payment_provider} req
   * @returns Success response
   */
  static async savePayment(req, res) {
    try {
      const {
        payment_id,
        order_id,
        amount,
        payment_status,
        datetime,
        payment_provider,
      } = req.body;

      const payment = new Payment.create({
        payment_id: payment_id,
        order_id: order_id,
        amount_subtotal: amount,
        payment_status: payment_status,
        datetime: datetime,
        payment_provider: payment_provider,
      });
      await payment.save();
      res
        .send(201)
        .json({ message: `Payment completed with ${payment_provider}` });
    } catch (e) {
      return ErrorRespond(res, 500, e.message);
    }
  }
}

module.exports = PaymentController;
