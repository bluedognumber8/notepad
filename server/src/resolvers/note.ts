import { NoteResolvers } from "../__generated__/resolvers-types";

const note: NoteResolvers = {
  author: async (note, _, { models }) => {
    return await models.User.findById(note.author);
  },
  // При запросе разрешается информация favoritedBy для заметки
  favoritedBy: async (note, _, { models }) => {
    return await models.User.find({ _id: { $in: note.favoritedBy } });
  },
};

export default note;
