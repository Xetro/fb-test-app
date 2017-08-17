import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as WebSocket from 'ws';
import * as http from 'http';
import * as _ from 'lodash';
import * as moment from 'moment';

import setRoutes from './routes';


const app = express();
app.set('port', (process.env.PORT || 3000));


app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

setRoutes(app);

// app.listen(app.get('port'), () => {
//   console.log('Api listening on port ' + app.get('port'));
// });

const server = http.createServer(app);
const wsServer = new WebSocket.Server({server});

let playersSearching = [];
let playersWaiting = [];

wsServer.on('connection', (ws, request) => {

  ws.on('message', (message) => {
    console.log('MESSAGE RECEIVED');
    message = JSON.parse(message);

    switch (message.title) {

      case 'JOIN_QUEUE_REQ':
        message.ws = ws;
        playersSearching.push(message);

        ws.send(JSON.stringify(
          {
            title: 'JOIN_QUEUE_RES',
            body: {
              success: true
            }
          }
        ));
        break;

      case 'MATCH_CONFIRM':
        console.log('CONFIRM MATCH');
        confirmMatch(ws);
        break;

      case 'CANCEL_MATCH':
        cancelMatch(ws);
    }

  });

  ws.on('close', (connection) => {
    console.log('SOCKET DISCONNECTED');
    _.remove(playersSearching, (player) => player.ws === ws);
  });

});

server.listen(app.get('port'), () => {
  console.log('Api listening on port ' + app.get('port'));
});

setInterval(() => {
	if (wsServer.clients.size > 1 && playersSearching.length > 1) {
    _.each(playersSearching, (player) => {
      let otherPlayers = _.without(playersSearching, player);
      let opponent = _.find(otherPlayers, (match) => match.skill === player.skill)

      if (opponent) {
        _.pull(playersSearching, player, opponent);
        opponent.ws.send(JSON.stringify({title: 'MATCH_FOUND'}));
        player.ws.send(JSON.stringify({title: 'MATCH_FOUND'}));

        let timestamp = moment().unix();

        playersWaiting.push({ player, opponent, timestamp });
      }
    })
	}

  _.each(playersWaiting, (match) => {
    console.log('looking through matches');
    console.log((moment().unix() - match.timestamp) >= 40);
    if ((moment().unix() - match.timestamp) >= 40) {

      match.player.ws.send(JSON.stringify({title: 'MATCH_TIMEOUT'}));
      match.opponent.ws.send(JSON.stringify({title: 'MATCH_TIMEOUT'}));

      _.pull(playersWaiting, match);
    }
  })

}, 1000);

function confirmMatch(ws) {
  let match = _.find(playersWaiting, (_match) => _match.player.ws === ws || _match.opponent.ws === ws);

  if (match) {
    let player = _.find(match, (_player) => _player.ws === ws);
    player.confirmed = true;
    player.ws.send(JSON.stringify({title: 'MATCH_ACCEPTED'}))

    if (match.player.confirmed && match.opponent.confirmed) {
      console.log('WINNER WINNNER CHIKEN DINNER');
      match.player.ws.send(JSON.stringify({title: 'MATCH_STARTING'}))
      match.opponent.ws.send(JSON.stringify({title: 'MATCH_STARTING'}))

      delete match.player.confirmed;
      delete match.opponent.confirmed;

      _.pull(playersWaiting, match);
    }
  }
}

function cancelMatch(ws) {

  let match = _.find(playersWaiting, (_match) => _match.player.ws === ws || _match.opponent.ws === ws);
  if (match) {
    match.player.ws.send(JSON.stringify({title: 'MATCH_TIMEOUT'}));
    match.opponent.ws.send(JSON.stringify({title: 'MATCH_TIMEOUT'}));
    _.pull(playersWaiting, match);
  }

  let player = _.find(playersSearching, (_player) => _player.ws === ws);

  if (player)
    _.pull(playersSearching, player);
}

export { app };
