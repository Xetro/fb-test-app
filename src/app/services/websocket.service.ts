import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Observer} from "rxjs/Observer";

@Injectable()
export class WebsocketService {

  private subject: Subject<MessageEvent>;

  constructor() { }

  public connect(url: string): Subject<MessageEvent> {
    console.log('connect url: ', url);
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    console.log('create');
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror   = obs.error.bind(obs);
      ws.onclose   = obs.complete.bind(obs);

      return ws.close.bind(ws);
    });

    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log(data);
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }

}
