const express = require("express");
const PaymentController = require("../controllers/Payment.controller");
const ValidateToken = require("../middlewares/ValidateToken");
// const bodyParser = require("body-parser");

const router = express.Router();

/**
 * @description
 * Route for user to make payment
 * It handles the case when stripe is not working then it will automatically redirect to razorpay payment gateway
 */
router.route("/create-payment").post(PaymentController.makePayment);
/**
 * @description
 * Using stripe's webhook we can update the payment status in our databse
 * The webhook sends the status to this route and after verifying it updates the user's order payment status
 */
router.route("/webhook").post(PaymentController.getPaymentStatus);

/**
 * @description
 * A developer can save the Stripe's credentials and integrate their stripe account to make payments
 * Added a middleware to validate the user's credentials if it is valid or not
 * If the users credentials are valid then modily the req object
 */
router.route("/stripe").post(ValidateToken, PaymentController.saveStripeData);

/**
 * @description
 * To fetch the saved stripe cards details and configurations
 */
router.route("/stripe").get(ValidateToken, PaymentController.getStripeData);

/**
 * @description
 * To create and confirm the payment from razorpay
 * This works in case stripe is not working then we take the payment from the razorpay
 */
router.route("/save-payment").post(PaymentController.savePayment);

module.exports = router;
