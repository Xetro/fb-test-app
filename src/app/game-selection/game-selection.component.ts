import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { MatchmakingService } from '../services/matchmaking.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export interface Message {
	title: string,
	body: any,
	newDate?: string
}

@Component({
  selector: 'app-game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss']
})
export class GameSelectionComponent implements OnInit {

  constructor(private matchmakingService: MatchmakingService) { }

  public messages: Subject<Message>  = new Subject<Message>();

  ngOnInit() {
  }

  private selectMode(event) {
    let element = event.path[0];
    if (element.classList.contains('option') && !element.classList.contains('option-selected')) {
      let optionElements = document.getElementsByClassName('option');
      for (let i = 0; i < optionElements.length; i++) {
        optionElements[i].classList.remove('option-selected');
      }
      element.classList.add('option-selected');
    }
  }

  private joinQueue() {
    this.matchmakingService.joinQueue();
  }
}
