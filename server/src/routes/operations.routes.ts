import { Router } from 'express';

import { CreateOperationService } from '../services/CreateOperationService';
import { UpdateOperationService } from '../services/UpdateOperationService';
import { ShowOperationService } from '../services/ShowOperationService';
import { CreateOperationArmyUserService } from '../services/CreateOperationArmyUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const operationsRouter = Router();

operationsRouter.get('/show', ensureAuthenticated, async (request, response) => {
  const showOperations = new ShowOperationService();

  const operations = await showOperations.execute();

  return response.json(operations);
});

operationsRouter.post('/', ensureAuthenticated, async (request, response) => {
  const {
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
  } = request.body;

  const createOperation = new CreateOperationService();

  const operationCreated = await createOperation.execute({
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

  return response.json(operationCreated);
});

operationsRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { operation, description } = request.body;
  const { id } = request.params;

  const updateOperation = new UpdateOperationService();

  await updateOperation.execute({
    id,
    operation,
    description,
  });

  return response.json({ message: 'Operation updated.' });
});

operationsRouter.post('/operation_subscription', ensureAuthenticated, async (request, response) => {
  const { id_operation, id_army } = request.query;

  const createOperationArmyUser = new CreateOperationArmyUserService();

  await createOperationArmyUser.execute({
    id_operation: String(id_operation),
    id_army: String(id_army),
    id_user: request.user.id,
  });

  return response.json({ message: 'Subscription successfully.' });
});


export { operationsRouter };
