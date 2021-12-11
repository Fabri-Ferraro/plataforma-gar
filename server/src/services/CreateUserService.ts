import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface RequestDTO {
  name: string;
  nickname: string;
  email: string;
  birth_date: Date;
  team: string;
  password: string;
}

export class CreateUserService {
  public async execute({
    name,
    nickname,
    email,
    birth_date,
    team,
    password,
  }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email adress already used.');
    };

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      nickname,
      email,
      birth_date,
      team,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
