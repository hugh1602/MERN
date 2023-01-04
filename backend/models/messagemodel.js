const mongoose = require("mongoose");

const messagemodel = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    content: { typr: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
  },
  {
    timestamps: true,
  }
);

const message = mongoose.model("Message", messagemodel);
module.exports = message;
