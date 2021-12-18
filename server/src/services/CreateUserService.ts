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
  contact_phone: number
  emergency_contact_name: string
  emergency_contact_phone: number
  blood_type: string
}

export class CreateUserService {
  public async execute({
    name,
    nickname,
    email,
    birth_date,
    team,
    contact_phone,
    emergency_contact_name,
    emergency_contact_phone,
    blood_type,
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
      contact_phone,
      emergency_contact_name,
      emergency_contact_phone,
      blood_type,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}
