import { getRepository } from "typeorm";

import AppError from "../errors/AppError";

import OperationArmyUser from "../models/OperationArmyUser";
import Army from "../models/Army";

interface RequestDTO {
  id_operation: string;
  id_army: string;
  id_user: string;
}

export class CreateOperationArmyUserService {
  public async execute({
    id_operation,
    id_army,
    id_user,
  }: RequestDTO): Promise<OperationArmyUser> {
    const operatioArmyUserRepository = getRepository(OperationArmyUser);
    const armyRepository = getRepository(Army);

    const checkOperationUserExists = await operatioArmyUserRepository.findOne({
      where: { id_operation, id_user },
    });

    if(checkOperationUserExists) {
      throw new AppError('User already registered in this operation.');
    }

    const checkArmyExistsInOperation = await armyRepository.findOne({
      where: { id_operation, id: id_army },
    });

    if(!checkArmyExistsInOperation) {
      throw new AppError(`This army isn't registered in this operation.`);
    }

    const operationArmyUserCreated = operatioArmyUserRepository.create({
      id_operation,
      id_army,
      id_user,
    });

    await operatioArmyUserRepository.save(operationArmyUserCreated);

    return operationArmyUserCreated;
  }
}
