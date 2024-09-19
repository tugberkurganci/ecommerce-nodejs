const { authService } = require("../services/authService.js");

const authController = {
  register: async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      const result = await authService.register({ firstName, lastName, email, password });

      if (result.success) {
        res.status(201).json(result.user);
      } else {
       
        const error = new Error(result.message || 'Registration failed');
        error.statusCode = 400; 
        next(error);
      }
    } catch (err) {
      next(err); 
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const result = await authService.login(email, password);

      if (result.success) {
        res.status(200).json(result.data);
      } else {
        const error = new Error(result.message || 'Login failed');
        error.statusCode = 401; 
        next(error);
      }
    } catch (err) {
      next(err); 
    }
  }
};

module.exports = authController;
