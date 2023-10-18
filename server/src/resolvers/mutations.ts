import { MutationResolvers } from "../__generated__/resolvers-types";

const mutations: MutationResolvers = {
  newUser: async (_, { name, email, avatar }, { models }) => {
    return await models.User.create({
      name: name,
      email: email,
      avatar: avatar,
    });
  },
  newNote: async (_, { content, author }, { models }) => {
    return await models.Note.create({
      content: content,
      author: author,
    });
  },
  deleteNote: async (_, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (_, { id, content }, { models }) => {
    return await models.Note.findOneAndUpdate(
      { _id: id },
      { $set: { content: content } },
      {
        new: true,
      }
    );
  },
};

export default mutations;
