import { getRepository } from "typeorm";

import Operation from "../models/Operation";

export class ShowOperationService {
  public async execute(): Promise<Operation[]> {
    const operationsRepository = getRepository(Operation);

    const operations = await operationsRepository.find();

    return operations;
  }
}
