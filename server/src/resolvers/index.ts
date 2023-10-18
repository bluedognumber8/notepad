import { Resolvers } from "../__generated__/resolvers-types";
import Query from "./queries.js";
import Mutation from "./mutations.js";
import Track from "./track.js";
import User from "./user.js";
import Note from "./note.js";

const resolvers: Resolvers = { Query, Mutation, Track, User, Note };
export default resolvers;
