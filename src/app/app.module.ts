import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CountdownComponent } from './shared/countdown/countdown.component';
import { FriendsComponent } from './shared/friends/friends.component';
import { HeaderComponent } from './shared/header/header.component';
import { NewsComponent } from './shared/news/news.component';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { MatchmakingComponent } from './matchmaking/matchmaking.component';
import { MatchEndComponent } from './match-end/match-end.component';

import { RoutingModule } from './routing.module';

import { MatchmakingService } from './services/matchmaking.service';
import { WebsocketService } from './services/websocket.service';


@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    FriendsComponent,
    HeaderComponent,
    NewsComponent,
    GameSelectionComponent,
    MatchmakingComponent,
    MatchEndComponent
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [MatchmakingService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
