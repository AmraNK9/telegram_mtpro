
const asyncHandler = require("express-async-handler");
const { getAllMessages } = require("../../Telegram_Api/get_all_message");

exports.getTeleMessages = asyncHandler(async (req, res, next) => {
    const channelName = req.body.channelName;
    let messageList = await getAllMessages(channelName)
    res.json({ success: true,messageList});
  });
  