const User = require("../modals/userModal");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  const getUsers = await User.find();
  if (getUsers) {
    res.status(200).json({ success: true, users: getUsers });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please fill all fields" });
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User Alreay Exists!" });
    }
    const hashPassword = await bycrypt.hash(password, 10);
    const userCreate = await User.create({
      username,
      email,
      password: hashPassword,
    });
    if (userCreate) {
      return res.json({ message: "User Register successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!password || !email) {
      res
        .status(400)
        .json({ success: false, message: "Please provide all data" });
    }
    const user = await User.findOne({ email });
    if (user && (await bycrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15m" }
      );
      if (accessToken) {
        res.status(200).json({
          success: true,
          message: "Logged In Successfully",
          accessToken,
        });
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: "Crendentials are not valid" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internel Server Error" });
  }
};

const currentUser = async (req, res) => {
  res.status(200).json({ message: "Current user is available" });
};

module.exports = { registerUser, loginUser, getUsers, currentUser };
