import { QueryResolvers } from "../__generated__/resolvers-types";

const queries: QueryResolvers = {
  books: () => books,
  tracksForHome: (_, __, contextValue) => {
    return contextValue.dataSources.trackAPI.getTracksForHome();
  },
};

let books = [
  {
    title: "The Awakedsnidssdnsdg!",

    author: "Kate Chopind",
  },

  {
    title: "City of Glassfds",

    author: "Paul Auster",
  },
];

export default queries;
