import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import OperationSchedule from "../models/OperationSchedule";

interface RequestDTO {
  id: string;
  schedule: string;
  value: string;
  order: number;
}

export class UpdateOperationScheduleService {
  public async execute({
    id,
    schedule,
    value,
    order,
  }: RequestDTO): Promise<OperationSchedule> {
    const operationsSchedulRepository = getRepository(OperationSchedule);

    const operationSchedule = await operationsSchedulRepository.findOne(id);

    if(!operationSchedule) {
      throw new AppError(`Operation Schedule doesn't exists.`);
    };

    operationSchedule.schedule = schedule;
    operationSchedule.value = value;
    operationSchedule.order = order;

    await operationsSchedulRepository.save(operationSchedule);

    return operationSchedule;
  }
}
