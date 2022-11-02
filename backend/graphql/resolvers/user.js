const userSchema = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  validationRegisterInput,
  validationLoginInput,
} = require("../../utils/validation");
const { UserInputError } = require("apollo-server");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  Mutation: {
    async register(_, { registerInput: { username, email, password } }) {
      const { valid, errors } = validationRegisterInput(
        username,
        email,
        password
      );
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }
      const userExist = await userSchema.findOne({ email: email });
      if (userExist) {
        throw new Error("User already exists");
      }
      const salt = await bcrypt.genSaltSync(10);
      const newPassword = await bcrypt.hash(password, salt);
      const newUser = new userSchema({
        email,
        username,
        password: newPassword,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = jwt.sign(
        {
          id: res._id,
          email: res.email,
          username: res.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async login(_, { loginInput: { email, password } }) {
      const { valid, errors } = validationLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Error", { errors });
      }
      const user = await userSchema.findOne({ email: email });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
