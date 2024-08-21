import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const { access_token } = req.cookies;
  console.log(access_token);
  const jwt_secret = process.env.JWT_SECRET;
  if (!access_token) {
    return res.json("not_auth");
  }
  jwt.verify(access_token, jwt_secret, (err, data) => {
    if (err) {
      return res.json("not_auth");
    }
    req.authUser = data;
    next();
  });
};
