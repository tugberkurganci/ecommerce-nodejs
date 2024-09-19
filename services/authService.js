const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const userDao = require("../dao/userDao.js");

const authService = {
  register: async (userData) => {
    try {
      const encryptedPassword = CryptoJS.AES.encrypt(
        userData.password,
        process.env.PASS_SEC
      ).toString();

      const newUser = await userDao.createUser({ 
        ...userData, 
        password: encryptedPassword 
      });
      
      return { success: true, user: newUser };
    } catch (err) {
      return { success: false, error: err };
    }
  },

  login: async (email, password) => {
    try {
      const user = await userDao.findUserByEmail(email);

      if (!user) {
        return { success: false, message: "Wrong Email" };
      }

      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== password) {
        return { success: false, message: "Wrong Password" };
      }

      const accessToken = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      const { password: userPassword, ...userData } = user.dataValues;
      return { success: true, data: { ...userData, accessToken } };

    } catch (err) {
      return { success: false, error: err };
    }
  }
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.params.id)
    console.log(req.user.id)
    if (req.user.id== req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = {
  authService,
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
};
