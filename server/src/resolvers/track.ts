import { TrackResolvers } from "../__generated__/resolvers-types";
const track: TrackResolvers = {
  // const track = {
  author: ({ authorId }, _, contextValue) => {
    return contextValue.dataSources.trackAPI.getAuthor(authorId);
  },
};
export default track;
