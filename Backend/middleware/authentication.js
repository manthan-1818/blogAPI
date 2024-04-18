const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authentication = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res
      .status(401)
      .json({ success: false, message: "Access token is missing" });
  }

  try {
    const decoded = jwt.verify(accessToken, jwtSecretKey);

    req.userData = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Return 419 error if token is expired
      console.log("419 419 419 419 419 419 419");
      return res.status(419).json({ success: false, message: "Token expired" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid access token" });
    }
  }
};

module.exports = authentication;
