const asynchandler = require("express-async-handler");
const Chat = require("../models/chatmodel");
const User = require("../models/usermodel");

const accessChat = asynchandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("userId param request not sent");
    return res.status(400);
  }

  var isChat = await Chat.find({
    isgroupchat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestmessage");

  isChat = await User.populate(isChat, {
    path: "latestmessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatname: "sender",
      isgroupchat: false,
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChat = asynchandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupadmin", "-password")
      .populate("latestmessage")
      .sort({ updateAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestmessage.sender",
          select: "name pic email",
        });

        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const creatGroupChat = asynchandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .send({ message: "Please fill in all required fields" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send({ message: "More than two users are required" });
  }
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatname: req.body.name,
      users: users,
      isgroupchat: true,
      groupadmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupadmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroupChat = asynchandler(async (req, res) => {
  const { chatId, chatname } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatname },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupadmin", "-password");
  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});

const addMember = asynchandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupadmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("User Not Found");
  } else {
    res.json(added);
  }
});

const removeMember = asynchandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupadmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("User Not Found");
  } else {
    res.json(removed);
  }
});

module.exports = {
  accessChat,
  fetchChat,
  creatGroupChat,
  renameGroupChat,
  addMember,
  removeMember,
};
