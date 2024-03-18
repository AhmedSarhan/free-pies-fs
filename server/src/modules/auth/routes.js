const { registerController, loginController } = require("./controller");

const AuthRouter = require('express').Router();


AuthRouter.post('/register', registerController);
AuthRouter.post('/login', loginController);

module.exports = AuthRouter;