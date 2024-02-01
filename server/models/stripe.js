const mongoose = require("mongoose");

const stripeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "User",
    },
    stripe_live_key: {
      type: String,
      required: true,
    },
    stripe_private_key: {
      type: String,
      required: true,
    },
    payment_method_types: {
      type: String,
      enum: ["card", "upi"],
    },
    currency: {
      type: String,
      enum: ["INR", "USD", "EURO"],
    },
    datetime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Stripe = mongoose.model("stripe", stripeSchema);

module.exports = Stripe;
