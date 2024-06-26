// server/Middlewares/authMiddleware.js
const JWT = require('jsonwebtoken');
const JWT_SECRETKEY = process.env.JWT_SECRETKEY || "hsdbvhjsdbkvjsh";

const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    }
    const decoded = JWT.verify(token, JWT_SECRETKEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = {
  requireSignIn,
};
