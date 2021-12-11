import { getRepository } from "typeorm";
import path from 'path';
import fs from 'fs';

import uploadConfing from '../config/upload';
import AppError from "../errors/AppError";
import Army from "../models/Army";

interface Request {
  id: string;
  logoFileName: string;
};

export class UpdateArmyLogoService {
  public async execute({ id, logoFileName }: Request): Promise<Army> {
    const armiesRepository = getRepository(Army);

    const army = await armiesRepository.findOne(id);

    if (!army) {
      throw new AppError(`Army doesn't exists.`);
    };

    if (army.logo) {
      const armyLogoFilePath = path.join(uploadConfing.directory, army.logo);
      const armyLogoFileExists = await fs.promises.stat(armyLogoFilePath);

      if (armyLogoFileExists) {
        await fs.promises.unlink(armyLogoFilePath);
      };
    };

    army.logo = logoFileName;

    await armiesRepository.save(army);

    return army;
  };
};
