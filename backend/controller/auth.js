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
    console.log('Received Request Body:', req.body);
  
    try {
      const { username, password, firstName, lastName, email, created_at } = req.body;
  
      // Check if required fields are missing
    //   if (!username || !password || !firstName || !lastName || !email || !created_at) {
    //     return res.status(400).json({ message: "All fields are required" });
    //   }
  
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
  
      // Create a new user
      const user = new User({
        username,
        password,
        firstName,
        lastName,
        email,
        created_at
      });
  
      // Save the user to the database
      await user.save();
  
      // Respond with a success message and user details
      res.status(200).json({ message: "User registered successfully", user });
    } catch (error) {
      // Handle unexpected errors
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  
  
module.exports = {
  login,
  register,
};
