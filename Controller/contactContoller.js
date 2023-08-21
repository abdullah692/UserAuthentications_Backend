const Contacts = require("../modals/contactModal");
//@desc GET all contacts
//@route GET/api/contacts
//@access private
const getContacts = async (req, res) => {
  const contacts = await Contacts.find({ user_id: req.user.id });
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  try {
    const contactbyId = await Contacts.findById(req.params.id);
    if (contactbyId) {
      res.status(200).json({ messgae: `Successfully found`, contactbyId });
    } else {
      res.status(400).json({ messgae: "The contact is not found" });
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      // Invalid contact ID
      res.status(400).json({ message: "Invalid contact ID" });
    } else {
      // Other server error
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const postContact = async (req, res) => {
  console.log("The req body is", req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({ error: "Please fill all fields" });
  } else {
    try {
      const contactCreated = await Contacts.create({
        name,
        email,
        phone,
        user_id: req.user.id,
      });
      if (contactCreated) {
        res
          .status(200)
          .json({ messgae: `Contact Created Sucfcessfully`, contactCreated });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const updateContact = async (req, res) => {
  const contactById = await Contacts.findById(req.params.id);
  console.log("xxxxxxxxx", contactById);
  try {
    if (!contactById) {
      return res.status(400).json({ messgae: "The contact is not found" });
    } else if (contactById.user_id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Don't have access to update the Contact Data",
        });
    } else {
      const { name, email, phone } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({ error: "Please fill all fields" });
      } else {
        const updateContact = await Contacts.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (updateContact) {
          return res.status(200).json({
            messgae: `Update COntact  of Id ${req.params.id}`,
            updateContact,
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteContact = async (req, res) => {
  const contactById = await Contacts.findById(req.params.id);
  if (!contactById) {
    res.status(400).json({ message: "Contact not found..!!" });
  } 
  else if (contactById.user_id.toString() !== req.user.id) {
    return res
      .status(403)
      .json({
        success: false,
        message: "Don't have access to delete the Contact Data",
      });
  } else {
    await Contacts.deleteOne({ _id: req.params.id });
    console.log("zzzzzzzz", req);
    return res
      .status(200)
      .json({ messgae: `Successfully deleted of Id ${req.params.id}` });
  }
};

module.exports = {
  getContacts,
  getContactById,
  postContact,
  updateContact,
  deleteContact,
};
