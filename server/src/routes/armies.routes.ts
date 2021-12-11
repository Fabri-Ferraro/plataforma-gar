import { Router } from "express";
import multer from "multer";
import uploadConfig from '../config/upload';

import { CreateArmyService } from "../services/CreateArmyService";
import { ShowArmiesByOperationIdService } from "../services/ShowArmiesByOperationId";
import { UpdateArmyService } from "../services/UpdateArmyService";
import { UpdateArmyLogoService } from "../services/UpdateArmyLogoService";
import { UpdateArmyLoadoutService } from "../services/UpdateArmyLoadoutService";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const armiesRouter = Router();
const upload = multer(uploadConfig);

armiesRouter.post('/:id_operation', ensureAuthenticated, async (request, response) => {
  const { army, description, loadout_description } = request.body;
  const { id_operation } = request.params;

  const createArmy = new CreateArmyService();

  const armyCreated = await createArmy.execute({
    id_operation,
    army,
    description,
    loadout_description,
  });

  return response.json(armyCreated);

});

armiesRouter.get('/:id_operation', ensureAuthenticated, async (request, response) => {
  const { id_operation } = request.params;

  const showArmiesByOperationId = new ShowArmiesByOperationIdService()

  const armies = await showArmiesByOperationId.execute({ id_operation })

  return response.json(armies);
});

armiesRouter.patch('/:id', ensureAuthenticated, async (request, response) => {
  const { army, description } = request.body;
  const { id } = request.params;

  const updateArmy = new UpdateArmyService();

  await updateArmy.execute({
    id,
    army,
    description,
  });

  return response.json({ message: 'Army updated.' });
});

armiesRouter.patch(
  '/logo/:id',
  ensureAuthenticated,
  upload.single('logo'),
  async (request, response) => {
    const { id } = request.params;

    const updateArmyLogo = new UpdateArmyLogoService();

    const army = await updateArmyLogo.execute({
      id,
      logoFileName: request.file.filename,
    });

    return response.json(army);
  },
);

armiesRouter.patch(
  '/loadout/:id',
  ensureAuthenticated,
  upload.single('loadout'),
  async (request, response) => {
    const { id } = request.params;

    const updateArmyLogo = new UpdateArmyLoadoutService();

    const army = await updateArmyLogo.execute({
      id,
      loadoutFileName: request.file.filename,
    });

    return response.json(army);
  },
);

export { armiesRouter };
