import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Army from "../models/Army";

interface RequestDTO {
  id: string;
  army: string;
  description: string;
  status: string;
}

export class UpdateArmyService {
  public async execute({
    id,
    army,
    description,
    status,
  }: RequestDTO): Promise<Army> {
    const armiesRepository = getRepository(Army);

    const armyUpdated = await armiesRepository.findOne(id);

    if(!armyUpdated) {
      throw new AppError(`Army doesn't exists.`);
    }

    armyUpdated.army = army;
    armyUpdated.description = description;
    armyUpdated.status = status;

    await armiesRepository.save(armyUpdated);

    return armyUpdated;
  }
}
