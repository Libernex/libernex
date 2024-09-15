import UserModel from "../models/user.schema.ts";
import { TUser } from "@repo/types/src/User";

const UserRepository = (): TUserRepository => {
  const create = async (
    username: string,
    password: string,
    nickname: string,
    avatar?: string,
  ): Promise<void> => {
    const user = new UserModel({
      username,
      password,
      nickname,
      avatar,
    });

    await user.save();
  };

  const findByUsernameWithPassword = async (
    username: string,
  ): Promise<TUser & { password: string }> => {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    return {
      id: user._id.toString(),
      username: user.username,
      nickname: user.nickname,
      avatar: user.avatar,
      password: user.password,
    };
  };

  return {
    create,
    findByUsernameWithPassword,
  };
};

export default UserRepository;

type TUserRepository = {
  create: (
    username: string,
    password: string,
    nickname: string,
    avatar?: string,
  ) => Promise<void>;

  findByUsernameWithPassword: (
    username: string,
  ) => Promise<TUser & { password: string }>;
};
