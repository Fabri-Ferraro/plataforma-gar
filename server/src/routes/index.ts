import { Router } from 'express';

import { usersRouter } from './users.routes';
import { operationsRouter } from './operations.routes';
import { sessionsRouter } from './sessions.routes';
import { armiesRouter } from './armies.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/operations', operationsRouter);
routes.use('/armies', armiesRouter);

export { routes };
