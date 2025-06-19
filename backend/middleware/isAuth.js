import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ message: "User doesn't have a token" }); // ✅ return
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET); // ✅ spelling fix

    if (!verifyToken) {
      return res.status(400).json({ message: "Invalid token" }); // ✅ return
    }

    req.userId = verifyToken.userId;
    next();

  } catch (error) {
    return res.status(500).json({ message: `isAuth error: ${error.message}` }); // ✅ return
  }
};

export default isAuth;
