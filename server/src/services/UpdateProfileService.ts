import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import User from "../models/User";

interface RequestDTO {
  id: string;
  name: string;
  nickname: string;
  email: string;
  birth_date: Date;
  team: string;
}

export class UpdateProfileService {
  public async execute({
    id,
    name,
    nickname,
    email,
    birth_date,
    team,
  }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const profile = await usersRepository.findOne(id);

    if(!profile) {
      throw new AppError(`User doesn't exists.`);
    };

    profile.name = name;
    profile.nickname = nickname;
    profile.email = email;
    profile.birth_date = birth_date;
    profile.team = team;

    await usersRepository.save(profile);

    return profile;
  }
}
