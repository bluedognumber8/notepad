import { MutationResolvers } from "../__generated__/resolvers-types";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import { GraphQLError } from "graphql";
import mongoose from "mongoose";

function error(err, code) {
  return new GraphQLError(err, {
    extensions: {
      code,
    },
  });
}

const mutations: MutationResolvers = {
  signUp: async (_, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    const avatar = gravatar.url(email);
    try {
      const user = await models.User.create({
        username: username,
        email,
        password: hashed,
        avatar,
      });
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      // Если при регистрации возникла проблема, выбрасываем ошибку
      throw new Error("Error creating account");
    }
  },
  signIn: async (_, { username, email, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      throw error("Error signing in", "UNAUTHENTICATED");
    }
    // Если пароли не совпадают, выбрасываем ошибку аутентификации
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw error("Error signing in", "UNAUTHENTICATED");
    }
    // Создаем и возвращаем json web token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
  newNote: async (_, { content }, { user, models }) => {
    if (!user) {
      throw error(
        "You need to be signed in for adding notes",
        "UNAUTHENTICATED"
      );
    }
    return await models.Note.create({
      content,
      author: new mongoose.Types.ObjectId(user.id),
    });
  },
  deleteNote: async (_, { id }, { user, models }) => {
    if (!user) {
      throw error("You must be signed in to delete a note", "UNAUTHENTICATED");
    }
    const note = await models.Note.findById(id);

    if (note && String(note.author) !== user.id) {
      throw error("You don't have permissions to delete the note", "FORBIDDEN");
    }
    try {
      await note.deleteOne();
      return true;
    } catch (err) {
      return err;
    }
  },
  updateNote: async (_, { id, content }, { user, models }) => {
    if (!user) {
      throw error("You must be signed in to delete a note", "UNAUTHENTICATED");
    }
    const note = await models.Note.findById(id);
    if (note && String(note.author) !== user.id) {
      throw error("You don't have permissions to delete the note", "FORBIDDEN");
    }
    return await models.Note.findOneAndUpdate(
      { _id: id },
      { $set: { content: content } },
      {
        new: true,
      }
    );
  },
  toggleFavorite: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw error("You must be signed in to delete a note", "UNAUTHENTICATED");
    }
    // Проверяем, отмечал ли пользователь заметку как избранную
    let noteCheck = await models.Note.findById(id);
    const hasUser = noteCheck.favoritedBy.indexOf(user.id);
    // Если пользователь есть в списке, удаляем его оттуда и уменьшаем значение
    // favoriteCount на 1
    if (hasUser >= 0) {
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: new mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: -1,
          },
        },
        {
          // Устанавливаем new как true, чтобы вернуть обновленный документ
          new: true,
        }
      );
    } else {
      // Если пользователя в списке нет, добавляем его туда и увеличиваем
      // значение favoriteCount на 1
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $push: {
            favoritedBy: new mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: 1,
          },
        },
        {
          new: true,
        }
      );
    }
  },
};

export default mutations;
