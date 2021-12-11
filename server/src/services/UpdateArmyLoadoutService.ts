import { getRepository } from "typeorm";
import path from 'path';
import fs from 'fs';

import uploadConfing from '../config/upload';
import AppError from "../errors/AppError";
import Army from "../models/Army";

interface Request {
  id: string;
  loadoutFileName: string;
};

export class UpdateArmyLoadoutService {
  public async execute({ id, loadoutFileName }: Request): Promise<Army> {
    const armiesRepository = getRepository(Army);

    const army = await armiesRepository.findOne(id);

    if (!army) {
      throw new AppError(`Army doesn't exists.`);
    };

    if (army.loadout) {
      const armyLoadoutFilePath = path.join(uploadConfing.directory, army.loadout);
      const armyLoadoutFileExists = await fs.promises.stat(armyLoadoutFilePath);

      if (armyLoadoutFileExists) {
        await fs.promises.unlink(armyLoadoutFilePath);
      };
    };

    army.loadout = loadoutFileName;

    await armiesRepository.save(army);

    return army;
  };
};
