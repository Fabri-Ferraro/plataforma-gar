import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Operation from '../models/Operation';
import CreateUserOperationService from './CreateUserOperationService';

interface RequestDTO {
  name: string;
  description: string;
  id_user: string;
}

class CreateOperationService {
  public async execute({
    name,
    description,
    id_user,
  }: RequestDTO): Promise<Operation> {
    const operationsRepository = getRepository(Operation);

    const checkOperationExists = await operationsRepository.findOne({
      where: { name },
    });

    if (checkOperationExists) {
      throw new AppError('Operation already exists.');
    }

    const operation = operationsRepository.create({
      name,
      description,
    });

    await operationsRepository.save(operation);

    return operation;
  }
}

export default CreateOperationService;
