import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  id_user: string;
  avatarFilename: string;
};

export class UpdateUserAvatarService {
  public async execute({ id_user, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id_user);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    };

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      };
    };

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  };
};
