import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import { CreateUserService } from '../services/CreateUserService';
import { UpdateUserAvatarService } from '../services/UpdateUserAvatarService';
import { UpdateProfileService } from '../services/UpdateProfileService';
import { UpdatePasswordService } from '../services/UpdatePasswordService';
import { ShowMyUserService } from '../services/ShowMyUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const {
    name,
    nickname,
    email,
    birth_date,
    team,
    contact_phone,
    emergency_contact_name,
    emergency_contact_phone,
    blood_type,
    password
  } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    nickname,
    email,
    birth_date,
    team,
    password,
    contact_phone,
    emergency_contact_name,
    emergency_contact_phone,
    blood_type,
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

usersRouter.get('/profile', ensureAuthenticated, async (request, response) => {
  const showMyUser = new ShowMyUserService();

  const user = await showMyUser.execute({
    id: request.user.id,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/profile', ensureAuthenticated, async (request, response) => {
  const {
    name,
    nickname,
    email,
    birth_date,
    team,
    tel_contato,
    contato_emergencia_nome,
    contato_emergencia_tel,
    tipo_sanguineo,
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
