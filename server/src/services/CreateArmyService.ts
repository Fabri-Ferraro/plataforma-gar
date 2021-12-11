import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Army from '../models/Army';

interface RequestDTO {
  id_operation: string;
  army: string;
  description: string;
  loadout_description: string;
}

export class CreateArmyService {
  public async execute({
    id_operation,
    army,
    description,
    loadout_description,
  }: RequestDTO): Promise<Army> {
    const armiesRepository = getRepository(Army);

    const checkOperationArmyExists = await armiesRepository.findOne({
      where: { id_operation, army },
    });

    if(checkOperationArmyExists) {
      throw new AppError('Army already created at this operation.')
    };

    const armyCreated = armiesRepository.create({
      id_operation,
      army,
      description,
      loadout_description,
    });

    await armiesRepository.save(armyCreated);

    return armyCreated;
  }
}
