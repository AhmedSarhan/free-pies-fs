const User = require('../modules/auth/model');
const jwt = require('jsonwebtoken');

const authCheck = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (
    !authHeader ||
    !authHeader.startsWith('Bearer ') ||
    authHeader.includes('null')
  ) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    req.user = {
      username: user.username,
      id,
      email: user.email,
      type: user.type,
    };
  } catch (error) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
  next();
};


module.exports = {
  authCheck,
};