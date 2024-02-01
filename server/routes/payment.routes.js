const express = require("express");
const PaymentController = require("../controllers/Payment.controller");
const ValidateToken = require("../middlewares/ValidateToken");

const router = express.Router();

router.route("/create-payment").post(PaymentController.makePayment);
router
  .route("/webhook")
  .post(
    bodyParser.raw({ type: "application/json" }),
    PaymentController.getPaymentStatus
  );

//Creates a stripe details saved
router.route("/stripe").post(ValidateToken, PaymentController.createPayment);
//
router.route("/stripe").get(ValidateToken, PaymentController.getStripeData);

module.exports = router;
