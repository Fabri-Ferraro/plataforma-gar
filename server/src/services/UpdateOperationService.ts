import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Operation from "../models/Operation";

interface RequestDTO {
  id: string;
  operation: string;
  description: string;
}

export class UpdateOperationService {
  public async execute({
    id,
    operation,
    description,
  }: RequestDTO): Promise<Operation> {
    const operationsRepository = getRepository(Operation);

    const operationUpdated = await operationsRepository.findOne(id);

    if(!operationUpdated) {
      throw new AppError(`Operation doesn't exists.`);
    }

    operationUpdated.operation = operation;
    operationUpdated.description = description;

    await operationsRepository.save(operationUpdated);

    return operationUpdated;
  }
}
