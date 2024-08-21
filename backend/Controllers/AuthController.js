import validator from "indicative/validator.js";
import { errorJson, successJson } from "./Utils/JsonRes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import VolunteerModel from "../Models/VolunteerModel.js";

export const login = async (req, res) => {
  const { code, password } = req.body;
  // console.log(req.body);
  //check email
  const findUser = await VolunteerModel.findOne({ code });
  if (!findUser) {
    return res.json(errorJson("user_not_found"));
  }
  //verify password
  const verifyPassword = bcrypt.compareSync(password, findUser.password);
  if (!verifyPassword) {
    return res.json(errorJson("wrong_password"));
  }
  //jwt process
  const jwt_secret = process.env.JWT_SECRET;
  const access_token = jwt.sign(
    { name: findUser.name, id: findUser._id },
    jwt_secret
  );
  res.cookie("access_token", access_token, { httpOnly: true });
  return res.json(
    successJson("success", {
      id: findUser._id,
      name: findUser.name,
      code: findUser.code,
      role: findUser.role,
    })
  );
};

export const register = async (req, res) => {
  //check email already exist
  const { name, password, role } = req.body;
  console.log(req.body);
  validator
    .validateAll(req.body, {
      name: "required",
      password: "required|min:2|max:30",
    })
    .then(async () => {
      //   console.log(name);
      //hash
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      //insert data
      const createUser = await VolunteerModel.create({
        name,
        password: hashPass,
        role,
      });
      //jwt process
      const jwt_secret = process.env.JWT_SECRET;
      const access_token = jwt.sign({ name, id: createUser._id }, jwt_secret);
      res.cookie("access_token", access_token, { httpOnly: true });
      return res.json(
        successJson("success", {
          id: createUser._id,
          name: createUser.name,
          code: createUser.code,
          role: createUser.role,
        })
      );
    })
    .catch((e) => {
      // console.log(e);
      return res.json(errorJson("validate_error", e));
    });
};

// export const checkAuth = (req, res) => {
//   const { access_token } = req.cookies;
//   const jwt_secret = process.env.JWT_SECRET;
//   jwt.verify(access_token, jwt_secret, (err, data) => {
//     if (err) {
//       return res.json("not_auth");
//     }
//     return res.json(data);
//   });
// };

export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.json("success");
};
