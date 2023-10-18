import { QueryResolvers } from "../__generated__/resolvers-types";

const queries: QueryResolvers = {
  notes: async (_, __, { models }) => {
    return await models.Note.find();
  },
  note: async (_, { id }, { models }) => {
    return await models.Note.findById(id);
  },
  users: async (_, {}, { models }) => {
    return await models.User.find();
  },
  user: async (_, { id }, { models }) => {
    return await models.User.findById(id);
  },
};

export default queries;
