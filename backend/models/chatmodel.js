const mongoose = require("mongoose");

const chatmodel = mongoose.Schema(
  {
    chatname: { type: String, trim: true },
    isgroupchat: { type: Boolean, default: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    latestmessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
    groupadmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const chat = mongoose.model("Chat", chatmodel);
module.exports = chat;
