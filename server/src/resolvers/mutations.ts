import { MutationResolvers } from "../__generated__/resolvers-types";
import models from "../models/index.js";

const mutations: MutationResolvers = {
  user: async (_, { name, email, avatar }, contextValue) => {
    const user = new models.User({
      name: name,
      email: email,
      avatar: avatar,
    });
    console.log(contextValue.dataSources);
    console.log(user);
    return await user.save();
  },
};

export default mutations;
