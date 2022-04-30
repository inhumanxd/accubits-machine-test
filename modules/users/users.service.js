const User = require("../../models/User");

const getUsersList = async () => {
  return await User.find({}, { __v: 0 });
};

const getUser = async (object) => {
  return await User.findOne(object, { __v: 0 });
};

const addUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

module.exports = { addUser, getUsersList, getUser };
