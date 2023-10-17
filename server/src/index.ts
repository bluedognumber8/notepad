import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Schema, model, connect } from "mongoose";
import { readFileSync } from "fs";
import resolvers from "./resolvers/index.js";
const typeDefs = readFileSync("./src/schema.graphql", {
  encoding: "utf-8",
});

// The ApolloServer constructor requires two parameters: your schema

// definition and your set of resolvers.

run().catch((err) => console.log(err));
async function run() {
  await connect(process.env.DB);
  console.log(`Connected to mongoDB :${process.env.DB}`);
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:

//  1. creates an Express app

//  2. installs your ApolloServer instance as middleware

//  3. prepares your app to handle incoming requests

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4400 },
});

console.log(`Apollo server ready at: ${url}`);
