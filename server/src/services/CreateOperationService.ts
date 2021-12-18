import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Operation from '../models/Operation';

interface RequestDTO {
  operation: string;
  description: string;
  date: Date;
  price: number;
  field_name: string;
  address: string
  number: string;
  complement: string;
  district: string;
  city: string;
  reference: string;
  zip_code: string;
  state: string;
  mgrs: string;
}

export class CreateOperationService {
  public async execute({
    operation,
    description,
    date,
    price,
    field_name,
    address,
    number,
    complement,
    district,
    city,
    reference,
    zip_code,
    state,
    mgrs,
  }: RequestDTO): Promise<Operation> {
    const operationsRepository = getRepository(Operation);

    const checkOperationExists = await operationsRepository.findOne({
      where: { operation },
    });

    if (checkOperationExists) {
      throw new AppError('Operation already exists.');
    }

    const operationCreated = operationsRepository.create({
      operation,
      description,
      date,
      price,
      field_name,
      address,
      number,
      complement,
      district,
      city,
      reference,
      zip_code,
      state,
      mgrs,
    });

    await operationsRepository.save(operationCreated);

    return operationCreated;
  }
}
