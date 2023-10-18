import { UserResolvers } from "../__generated__/resolvers-types";

const user: UserResolvers = {
  notes: async (user, _, { models }) => {
    return await models.Note.find({ author: user.id }).sort({ id: -1 });
  },
  favorites: async (user, _, { models }) => {
    return await models.Note.find({ favoritedBy: user.id }).sort({ id: -1 });
  },
};

export default user;
