import { getRepository } from "typeorm";
import path from 'path';
import fs from 'fs';

import uploadConfing from '../config/upload';
import AppError from "../errors/AppError";
import Operation from "../models/Operation";

interface Request {
  id: string;
  logoFileName: string;
};

export class UpdateOperationLogoService {
  public async execute({ id, logoFileName }: Request): Promise<Operation> {
    const operationsRepository = getRepository(Operation);

    const operation = await operationsRepository.findOne(id);

    if (!operation) {
      throw new AppError(`Operation doesn't exists.`);
    };

    if (operation.logo) {
      const operationLogoFilePath = path.join(uploadConfing.directory, operation.logo);
      const operationLogoFileExists = await fs.promises.stat(operationLogoFilePath);

      if (operationLogoFileExists) {
        await fs.promises.unlink(operationLogoFilePath);
      };
    };

    operation.logo = logoFileName;

    await operationsRepository.save(operation);

    return operation;
  };
};
