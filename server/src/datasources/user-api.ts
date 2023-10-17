import User from "../models/User";

class MongoDatasource {
  async getUser() {
    const user = new User({
      name: "ARTAM",
      email: "arararararar@initech.com",
      avatar: "https://ya.ru/asdasd.jpg",
    });
    return user.save();
  }
}

export default MongoDatasource;
