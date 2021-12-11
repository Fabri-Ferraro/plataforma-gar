import { getRepository } from "typeorm";
import { hash, compare } from 'bcryptjs';

import AppError from "../errors/AppError";

import User from "../models/User";

interface RequestDTO {
  id: string;
  password: string;
  new_password: string;
  confirm_new_password: string;
}

export class UpdatePasswordService {
  public async execute({
    id,
    password,
    new_password,
    confirm_new_password,
  }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    if(new_password === "" || confirm_new_password === "") {
      throw new AppError(`Tip new password and your confirmation.`, 401);
    };

    const user = await usersRepository.findOne(id);

    if(!user) {
      throw new AppError(`User doesn't exists.`);
    };

    const passwordMatched = await compare(password, user.password)

    if(!passwordMatched) {
      throw new AppError('Incorrect password.', 401);
    };

    if(new_password !== confirm_new_password) {
      throw new AppError(`New password and confirmation doesn't match.`, 401);
    };

    const hashedNewPassword = await hash(new_password, 8);

    user.password = hashedNewPassword;

    await usersRepository.save(user);

    return user;




  }
}
