import { Resolvers } from "../__generated__/resolvers-types";
import Query from "./queries.js";
import Mutation from "./mutations.js";
import Track from "./track.js";

// const resolvers = { Query, Mutation, Track };
const resolvers: Resolvers = { Query, Mutation, Track };
export default resolvers;
