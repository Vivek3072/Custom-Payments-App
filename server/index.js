const express = require("express");
const cors = require("cors");
const app = express();
require("colors");

const connectDb = require("./config/connectDB");
connectDb();

const port = process.env.PORT || 5000;
const authRouter = require("./routes/main.routes");
const paymentRouter = require("./routes/payment.routes");

const corsOptions = {
  origin: [
    process.env.UI_ROOT_URI,
    "http://localhost:3000",
    "http://localhost:5173",
    "https://payments-frontend.onrender.com",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "" }));
app.use(express.urlencoded({ limit: "", extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/payments", paymentRouter);

app.listen(port, () => {
  console.log(
    "➜".green,
    ` Server running on -`.bold,
    `http://localhost:${port}`.cyan
  );
});
