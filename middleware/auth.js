const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  // extract token from header
  let token = req.header("x-auth-token");

  if (!token || token === 'undefined') {
    return res
      .status(401)
      .json({
        error:
          "No token - please send request with header 'x-auth-token' that contain authorization token"
      });
    }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
