const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    payment_id: {
      type: String,
      required: true,
    },
    order_id: {
      type: String,
      required: true,
    },
    payment_provider: {
      type: String,
      required: true,
    },
    amount_subtotal: {
      type: Number,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["cod", "online"],
    },
    datetime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
