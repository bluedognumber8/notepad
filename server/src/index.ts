import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "mongoose";
import { readFileSync } from "fs";
import resolvers from "./resolvers/index.js";
import TrackAPI from "./datasources/track-api.js";
import models from "./models/index.js";
const typeDefs = readFileSync("./src/schema.graphql", {
  encoding: "utf-8",
});

run().catch((err) => console.log(err));
async function run() {
  await connect(process.env.DB);
  console.log(`Connected to mongoDB`);
}

export interface MyContext {
  dataSources: {
    trackAPI: TrackAPI;
    models;
  };
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    const { cache } = server;
    return {
      dataSources: {
        trackAPI: new TrackAPI({ cache }),
        models,
      },
    };
  },
  listen: { port: process.env.PORT || 4000 },
});
console.log(`Apollo server ready at: ${url}`);

// const user = new models.User({
//   name: "11!!345345345345hamurapppiiibill",
//   email: "bihamurapppiiibillll@initech.com",
//   avatar: "https://i.imgur.com/dM7Thhn.png",
// });
// await user.save();

// console.log(user.email);
