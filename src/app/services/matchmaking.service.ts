import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Observer} from "rxjs/Observer";
import { Router } from '@angular/router';

import { WebsocketService } from './websocket.service';

import 'rxjs/add/operator/toPromise';

export interface Message {
	title: string,
	body: any,
	newDate?: string
}

@Injectable()
export class MatchmakingService {

  private apiUrl = 'api/queue/join';
  // private headers = new HttpHeaders({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  
	public searching: Boolean;
  public messages: Subject<Message> = new Subject<Message>();
	public matchFound: Subject<any> = new Subject<any>();
	public matchAccepted: Subject<any> = new Subject<any>();

  constructor(
		private http: HttpClient,
		private wsService: WebsocketService,
		private router: Router
	) { 
    this.messages = <Subject<Message>>this.wsService
      .connect('ws://localhost:3000')
      .map((response: any): Message => {
        let data = JSON.parse(response.data);
        
        return {
          title: data.title,
          body: data.body,
        }
      });
			
		this.messages.subscribe((message) => {
			this.handleServerResponse(message);
		});
  }

    
  callAPI(message): Promise<any> {
		this.messages.next(message);
		return Promise.resolve('success');
  };
	
	joinQueue(): Promise<any> {
		let message: Message = {
			title: 'JOIN_QUEUE_REQ',
			body: {}
		};
		
		return this.callAPI(message).then((resp) => console.log('response', resp));
	};
	
	public confirmMatch(): Promise<any> {
		let message: Message = {
			title: 'MATCH_CONFIRM',
			body: {}
		};
		
		return this.callAPI(message);
	}
	
	public cancel() {
		let message: Message = {
			title: 'CANCEL_MATCH',
			body: {}
		}
		
		this.messages.next(message);
		this.searching = false;
		this.router.navigate(['']);
	}
	
	private handleServerResponse(message) {
		switch (message.title) {
			case 'JOIN_QUEUE_RES':
				if (message.body.success) {
					this.searching = true;
					this.router.navigate(['/matchmaking']);
					break;
				}
				break;
				
			case 'MATCH_FOUND':
				this.searching = false;
				this.matchFound.next();
				break;
				
			case 'MATCH_ACCEPTED':
				this.matchAccepted.next();
				break;
				
			case 'MATCH_STARTING':
				this.router.navigate(['/match-end']);
				break;
			
			case 'MATCH_TIMEOUT':
				this.cancel();
				break;
		}
	}
		
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
