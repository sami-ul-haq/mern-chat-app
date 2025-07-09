import Message from "../models/messagesModel.model.js";

export const getMessages = async (req, res) => {
  try {
    const user1 = req.user._id;
    const user2 = req.body.id;

    if (!user1 || !user2) {
      return res.status(400).json({ message: "Both users are required" });
    }

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });

    return res.status(200).json({
      message: "Messages fetched successfully",
      messages,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something Went wrong while fetching messages" });
  }
};
