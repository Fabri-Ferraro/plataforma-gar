import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import OperationSchedule from "../models/OperationSchedule";

interface RequestDTO {
  id_operation: string;
  schedule: string;
  value: string;
  order: number;
}

export class CreateOperationScheduleService {
  public async execute({
    id_operation,
    schedule,
    value,
    order,
  }: RequestDTO): Promise<OperationSchedule> {
    const operationScheduleRepository = getRepository(OperationSchedule);

    // Notes: Incluir uma validação de ordenação.

    const operationScheduleCreated = operationScheduleRepository.create({
      id_operation,
      schedule,
      value,
      order,
    });

    await operationScheduleRepository.save(operationScheduleCreated);

    return operationScheduleCreated;
  }
}
