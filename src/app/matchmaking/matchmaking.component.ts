import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { MatchmakingService } from '../services/matchmaking.service';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.component.html',
  styleUrls: ['./matchmaking.component.scss']
})
export class MatchmakingComponent implements OnInit {

  status: String = 'FINDING MATCH ...';
  message: String = 'Please wait until system finds a match.';
  searchTimer: any;
  matchTimer: any;

  constructor(private matchmakingService: MatchmakingService) {
    matchmakingService.matchFound.subscribe(() => this.matchFound());
    matchmakingService.matchAccepted.subscribe(() => this.matchAccepted());
  }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {

    let start = moment().unix();
    let interval = setInterval(() => {
      this.searchTimer = moment().minute(0).second(moment().unix() - start).format('mm:ss');

      if (!this.matchmakingService.searching) {
        clearInterval(interval)
      }
    }, 1000);
  }


  matchFound() {
    this.status = 'MATCH FOUND!';
    this.message = 'Please confirm your match by clicking the confirm button';

    let deadline = moment().add(40, 's');

    let interval = setInterval(() => {
      this.matchTimer = deadline.unix() - moment().unix();
      if (this.matchTimer <= 0) {
        this.matchmakingService.cancel();
        clearInterval(interval);
      }
    }, 1000);
  }

  matchAccepted() {
    this.status = 'MATCH CONFIRMED!';
    this.message = 'Waiting for other player to confirm match';
  }

  confirmMatch() {
    this.matchmakingService.confirmMatch();
  }
}
