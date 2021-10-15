import { getRepository } from 'typeorm';

// import AppError from '../errors/AppError';

import Army from '../models/Army';

interface RequestDTO {
  name: string;
  description: string;
  loadout_description: string;
}

class CreateArmyService {
  public async execute({
    name,
    description,
    loadout_description,
  }: RequestDTO): Promise<Army> {
    const armiesRepository = getRepository(Army);

    const army = armiesRepository.create({
      name,
      description,
      loadout_description,
    });

    await armiesRepository.save(army);

    return army;
  }
}

export default CreateArmyService;
