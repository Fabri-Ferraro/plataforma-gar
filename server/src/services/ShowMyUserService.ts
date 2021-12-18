import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";

interface RequestDTO {
  id: string;
}

export class ShowMyUserService {
  public async execute({ id }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);

    if(!user) {
      throw new AppError(`User doesn't exists.`)
    };

    return user;
  };
};
