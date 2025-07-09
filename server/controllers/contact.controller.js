import { User } from "../models/auth.model.js";

export const searchContacts = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (searchTerm === undefined || searchTerm === null || searchTerm === "") {
      return res.status(400).json({ message: "Search Term is required" });
    }

    const sanitixedSearchTerm = searchTerm.replace(
      /[.*+?^{}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(sanitixedSearchTerm, "i");

    const contacts = await User.find({
      $and: [
        { _id: { $ne: req.user._id } },
        {
          $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
        },
      ],
    });

    return res.status(200).json({
      message: "Contacts Found",
      contacts,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something Went wrong while deleting the image" });
  }
};
