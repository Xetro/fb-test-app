import * as express from 'express';

import MatchmakingCtrl from './controllers/matchmaking-controller';


export default function setRoutes(app) {

  const router = express.Router();

  const matchmakingCtrl = new MatchmakingCtrl();

  router.route('/queue/join').post(matchmakingCtrl.joinQueue);
  router.route('/nextBattle').get(matchmakingCtrl.joinQueue);


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
