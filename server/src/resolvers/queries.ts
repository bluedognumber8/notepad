import { QueryResolvers } from "../__generated__/resolvers-types";

const queries: QueryResolvers = {
  tracksForHome: (_, __, contextValue) => {
    return contextValue.dataSources.trackAPI.getTracksForHome();
  },
  notes: async (_, {}, contextValue) => {
    return await contextValue.dataSources.models.Note.find();
  },
};

export default queries;
