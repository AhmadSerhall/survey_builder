const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;

  // check if user is available in DB
  const user = await User.findOne({ username });
  if (!user) res.status(400).send({ message: "Invalid username/password" });

  // check if password is correct
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    res.status(400).send({ message: "Invalid username/password" });

  const { password: hashedPassword, _id, ...userDetails } = user.toJSON();

  // generate JWT token
  const token = jwt.sign(
    {
      ...userDetails,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2 days" }
  );

  res.status(200).send({
    user: userDetails,
    token,
  });
};

const register = async (req, res) => {
  const { username, password, firstName, lastName,email,created_at } = req.body;
  if (!username || !password || !firstName || !lastName || !email || !created_at ) {
    res.status(400).send({ message: "all fields are required" });
  }

  try {
    // const user = await User.create({ username, password, firstName, lastName });

    const user = new User({
      username,
      password,
      firstName,
      lastName,
      email,
      created_at
    });

    await user.save();

    res.status(200).send({ user });
  } catch (e) {
    res.status(500).send({ error: e });
  }
};
  
module.exports = {
  login,
  register,
};
