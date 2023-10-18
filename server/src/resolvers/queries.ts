import { QueryResolvers } from "../__generated__/resolvers-types";

const queries: QueryResolvers = {
  notes: async (_, __, { models }) => {
    return await models.Note.find().limit(100);
  },
  note: async (_, { id }, { models }) => {
    return await models.Note.findById(id);
  },
  noteFeed: async (parent, { cursor }, { models }) => {
    // Жестко кодируем лимит в 10 элементов
    const limit = 10;
    // Устанавливаем значение false по умолчанию для hasNextPage
    let hasNextPage = false;
    // Если курсор передан не будет, то по умолчанию запрос будет пуст
    // В таком случае из БД будут извлечены последние заметки
    let cursorQuery = {};
    // Если курсор задан, запрос будет искать заметки со значением ObjectId
    // меньше этого курсора
    if (cursor) {
      cursorQuery = { _id: { $lt: cursor } };
    }
    // Находим в БД limit + 1 заметок, сортируя их от старых к новым
    let notes = await models.Note.find(cursorQuery)
      .sort({ _id: -1 })
      .limit(limit + 1);
    // Если число найденных заметок превышает limit, устанавливаем
    // hasNextPage как true и обрезаем заметки до лимита
    if (notes.length > limit) {
      hasNextPage = true;
      notes = notes.slice(0, -1);
    }
    // Новым курсором будет ID Mongo-объекта последнего элемента массива списка
    const newCursor = notes[notes.length - 1]._id;
    return {
      notes,
      cursor: newCursor,
      hasNextPage,
    };
  },
  users: async (_, __, { models }) => {
    return await models.User.find();
  },
  user: async (_, { username }, { models }) => {
    console.log(123);
    return await models.User.findById(username);
  },
  me: async (_, __, { models, user }) => {
    return await models.User.findById(user.id);
  },
};

export default queries;
