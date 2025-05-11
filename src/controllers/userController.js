import { models } from "../database.js";

export const CreateUser = async (req, res) => {
  const { id } = req.body;
  const user = await models.User.create({
    id,
  });
  res.status(201).json(user);
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findByPk(id);
  res.status(200).json(user);
};

export const putUser = async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  Object.keys(req.body).forEach((key) => {
    if (req.body[key] !== undefined) {
      user[key] = req.body[key];
    }
  });

  await user.save();
  res.status(200).json(user);
};

export const leavingaTeam = async (req, res) => {
  const { id } = req.params;
  const user = await models.User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await user.update({ teamId: null });
  res.status(200).json(user);
};
