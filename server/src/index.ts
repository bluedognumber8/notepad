import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import {
  StandaloneServerContextFunctionArgument,
  startStandaloneServer,
} from "@apollo/server/standalone";
import { connect } from "mongoose";
import { readFileSync } from "fs";
import resolvers from "./resolvers/index.js";
import TrackAPI from "./datasources/track-api.js";
import models from "./models/index.js";
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from "graphql-scalars";
import jwt from "jsonwebtoken";

const getUser = (token) => {
  if (token) {
    try {
      // Возвращаем информацию пользователя из токена
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // Если с токеном возникла проблема, выбрасываем ошибку
      new Error("Session invalid");
    }
  }
};

const typeDefs = readFileSync("./src/schema.graphql", {
  encoding: "utf-8",
});

run().catch((err) => console.log(err));
async function run() {
  await connect(process.env.DB);
  console.log(`Connected to mongoDB`);
}

export interface MyContext {
  user: any;
  models: any;
  dataSources: {
    trackAPI: TrackAPI;
  };
}

const server = new ApolloServer<MyContext>({
  typeDefs: [...scalarTypeDefs, typeDefs],
  resolvers: {
    ...scalarResolvers,
    ...resolvers,
  },
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }: StandaloneServerContextFunctionArgument) => {
    const { cache } = server;
    // Получаем токен пользователя из заголовков
    const token = req.headers.authorization;
    // Пытаемся извлечь пользователя с помощью токена
    const user = getUser(token);
    // Пока что будем выводить информацию о пользователе в консоль:
    console.log(user);
    // Добавляем модели БД и пользователя в контекст
    return {
      dataSources: {
        trackAPI: new TrackAPI({ cache }),
      },
      models,
      user,
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
