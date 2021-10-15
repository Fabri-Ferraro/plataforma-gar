import { getRepository } from 'typeorm';

// import AppError from '../errors/AppError';

import UserOperation from '../models/UserOperation';

interface RequestDTO {
  id_user: string;
  id_operation: string;
}

class CreateUserOperationService {
  public async execute({
    id_user,
    id_operation,
  }: RequestDTO): Promise<UserOperation> {
    const userOperationsRepository = getRepository(UserOperation);

    const userOperation = userOperationsRepository.create({
      id_user,
      id_operation,
    });

    await userOperationsRepository.save(userOperation);

    return userOperation;
  }
}

export default CreateUserOperationService;
