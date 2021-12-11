import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import Army from "../models/Army";

interface RequestDTO {
  id: string;
  army: string;
  description: string;
}

export class UpdateArmyService {
  public async execute({
    id,
    army,
    description,
  }: RequestDTO): Promise<Army> {
    const armiesRepository = getRepository(Army);

    const armyUpdated = await armiesRepository.findOne(id);

    if(!armyUpdated) {
      throw new AppError(`Army doesn't exists.`);
    }

    armyUpdated.army = army;
    armyUpdated.description = description;

    await armiesRepository.save(armyUpdated);

    return armyUpdated;
  }
}
