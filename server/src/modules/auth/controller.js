const User = require('./model');
const { StatusCodes } = require('http-status-codes');

const registerController = async (req, res) => {
  console.log('registerController', req.body);
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    res.status(201).json({
      msg: 'User created successfully',
      token: user.createJWT(),
      user: {
        username: user.username,
        email: user.email,
        type: user.type,
        id: user._id
      }
    });

  } catch (error) {
    console.log('registerController error', error);
    res.status(500).json({ msg: error.message || 'Internal server error' });
  }
};

const loginController = async (req, res) => {
  console.log('loginController', req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne(
      { email },
      { __v: 0 },
    );
    console.log('user', user);
    if (!user) {
      return res.status(404).json({
        msg: 'User not found, Please register first',
      });
    }
    const compare = await user.comparePassword(password, user.password);
    if (!compare) {
      return res.status(401).json({
        msg: 'Incorrect Credentials, Please try again',
      });
    }
    res.status(200).send({
      msg: 'User has been logged in successfully',
      token: user.createJWT(),
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
        type: user.type,
      },
    });
  } catch (error) {
    console.log('loginController error', error);
    res
      .status(StatusCodes.BAD_GATEWAY)
      .json({ msg: 'something went wrong please try again later' });
  }
};

module.exports = {
  registerController,
  loginController,
};