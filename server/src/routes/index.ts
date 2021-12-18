import { Router } from 'express';

import { usersRouter } from './users.routes';
import { operationsRouter } from './operations.routes';
import { sessionsRouter } from './sessions.routes';
import { armiesRouter } from './armies.routes';
import { operationsScheduleRouter } from './operationsSchedule.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/operations', operationsRouter);
routes.use('/armies', armiesRouter);
routes.use('/operationSchedule', operationsScheduleRouter)

export { routes };
