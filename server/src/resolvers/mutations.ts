import { MutationResolvers } from "../__generated__/resolvers-types";

const mutations: MutationResolvers = {
  user: async (_, { name, email, avatar }, contextValue) => {
    const user = new contextValue.dataSources.models.User({
      name: name,
      email: email,
      avatar: avatar,
    });

    return await user.save();
  },
  note: async (_, { content, author }, contextValue) => {
    const user = new contextValue.dataSources.models.Note({
      content: content,
      author: author,
    });

    return await user.save();
  },
};

export default mutations;
