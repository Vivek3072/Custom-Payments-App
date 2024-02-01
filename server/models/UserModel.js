const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    profilePic: {
      type: String,
      required: false,
      default: "https://xsgames.co/randomusers/assets/avatars/pixel/3.jpg",
    },
    email: {
      type: String,
      required: [true, "Please add the email"],
      unique: [true, "Username already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = function (userId) {
  const token = jwt.sign(
    {
      _id: userId,
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
