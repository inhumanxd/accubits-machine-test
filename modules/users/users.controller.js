const usersService = require("./users.service");

const getUsers = async (req, res) => {
  const usersList = await usersService.getUsersList();
  res.send(usersList);
};

const addUser = async (req, res) => {
  const data = req.body;
  const user = await usersService.addUser(data);
  res.send(user);
};

module.exports = { getUsers, addUser };
