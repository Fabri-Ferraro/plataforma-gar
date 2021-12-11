import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Operation from '../models/Operation';

interface RequestDTO {
  operation: string;
  description: string;
}

export class CreateOperationService {
  public async execute({
    operation,
    description,
  }: RequestDTO): Promise<Operation> {
    const operationsRepository = getRepository(Operation);

    const checkOperationExists = await operationsRepository.findOne({
      where: { operation },
    });

    if (checkOperationExists) {
      throw new AppError('Operation already exists.');
    }

    const operationCreated = operationsRepository.create({
      operation,
      description,
    });

    await operationsRepository.save(operationCreated);

    return operationCreated;
  }
}
