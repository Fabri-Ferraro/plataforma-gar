import { Router } from "express";

import { CreateOperationScheduleService } from "../services/CreateOperationScheduleService";
import { ShowScheduleByOperationIdService } from "../services/ShowScheduleByOperationIdService";
import { UpdateOperationScheduleService } from "../services/UpdateOperationScheduleService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const operationsScheduleRouter = Router();

operationsScheduleRouter.post(
  '/:id_operation',
  ensureAuthenticated,
  async (request, response) => {
    const { id_operation } = request.params;
    const { schedule, value, order } = request.body;

    const createOperationScheduleService = new CreateOperationScheduleService();

    const operationScheduleCreated = await createOperationScheduleService.execute({
      id_operation,
      schedule,
      value,
      order,
    });

    return response.json(operationScheduleCreated);
  });

operationsScheduleRouter.get(
  '/:id_operation',
  ensureAuthenticated,
  async (request, response) => {
    const { id_operation } = request.params;

    const showScheduleByOperationIdService = new ShowScheduleByOperationIdService();

    const operationSchedule = await showScheduleByOperationIdService.execute({ id_operation });

    return response.json(operationSchedule);
  });

operationsScheduleRouter.put(
  ':id',
  ensureAuthenticated,
  async (request, response) => {
    const { id } = request.params;
    const { schedule, value, order } = request.body;

    const updateOperationScheduleService = new UpdateOperationScheduleService();

    const operationSchedule = await updateOperationScheduleService.execute({
      id,
      schedule,
      value,
      order,
    });

    return response.json(operationSchedule);
  });

export { operationsScheduleRouter };
