import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import OperationSchedule from "../models/OperationSchedule";

interface RequestDTO {
  id_operation: string;
}

export class ShowScheduleByOperationIdService {
  public async execute({
    id_operation
  }: RequestDTO): Promise<OperationSchedule[]> {
    const operationsScheduleRepository = getRepository(OperationSchedule);

    const operationSchedule = await operationsScheduleRepository.find({
      where: `id_operation = '${id_operation}'`
    });

    return operationSchedule;
  }
}
