import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import { CreateUserService } from '../services/CreateUserService';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';
import { UpdateProfileService } from '../services/UpdateProfileService';
import { UpdatePasswordService } from '../services/UpdatePasswordService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, nickname, email, birth_date, team, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    nickname,
    email,
    birth_date,
    team,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      id_user: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

usersRouter.patch('/profile', ensureAuthenticated, async (request, response) => {
  const {
    name,
    nickname,
    email,
    birth_date,
    team,
    password,
    new_password,
    confirm_new_password
  } = request.body;

  const profile = new UpdateProfileService();

  await profile.execute({
    id: request.user.id,
    name,
    nickname,
    email,
    birth_date,
    team,
  });

  return response.json({ message: 'Profile updated.' });
});

usersRouter.patch('/password', ensureAuthenticated, async (request, response) => {
  const {
    password,
    new_password,
    confirm_new_password
  } = request.body;

  const updatePassword = new UpdatePasswordService();

  await updatePassword.execute({
    id: request.user.id,
    password,
    new_password,
    confirm_new_password,
  });

  return response.json({ message: 'Password updated.' });
});

export { usersRouter };
