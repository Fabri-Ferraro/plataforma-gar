import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Army from "../models/Army";

interface RequestDTO {
  id_operation: string;
}

export class ShowArmiesByOperationIdService {
  public async execute({
    id_operation
  }: RequestDTO): Promise<Army[]> {
    const armiesRepository = getRepository(Army);

    const armies = await armiesRepository.find({ where: `id_operation = '${id_operation}'` });

    return armies;
  }
}
