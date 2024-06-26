// server/Controllers/authController.js
const { hashPassword, comparePassword } = require("../Helpers/authHelper");
const User = require("../Models/User");
const JWT = require("jsonwebtoken");
const JWT_SECRETKEY = process.env.JWT_SECRETKEY || "hsdbvhjsdbkvjsh";

// Signup Controller
const signupController = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);

    const existingUser = await User.findOne({ username: formData.username });
    console.log(existingUser);

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered, Please Login",
      });
    }

    const hashedPassword = await hashPassword(formData.password);

    const newUser = new User({
      name: formData.name,
      email: formData.email,
      phoneno: formData.phoneno,
      username: formData.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send({
      success: true,
      message: "User Registered successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      success: false,
      message: "Error in signup",
      error: e,
    });
  }
};


// Login Controller
const loginController = async (req, res) => {
  try {
    const formData = req.body;
    if (!formData.username || !formData.password) {
      return res.status(404).send({
        success: false,
        message: "Invalid password or Username!!",
      });
    }
    const user = await User.findOne({ username: formData.username });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Username is not Registered!!",
      });
    }
    const match = await comparePassword(formData.password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid Password!!",
      });
    }
    const token = JWT.sign({ _id: user._id, name: user.name, role: user.role }, JWT_SECRETKEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phoneno: user.phoneno,
        username: user.username,
        role: user.role,
      },
      token,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error: e,
    });
  }
};

module.exports = { signupController, loginController };


module.exports = { signupController, loginController };