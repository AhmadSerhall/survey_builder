// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// const authMiddleware = async (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   if (!token) {
//     res.status(403).send("Forbidden");
//   } else {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ username: decoded.username }).select(
//       "-password"
//     );
//     req.user = user;
//     next();
//   }
// };


// module.exports = {
//   authMiddleware,
// };
// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../jwt'); 

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { authMiddleware };

