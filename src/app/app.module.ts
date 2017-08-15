import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CountdownComponent } from './shared/countdown/countdown.component';
import { FriendsComponent } from './shared/friends/friends.component';
import { HeaderComponent } from './shared/header/header.component';
import { NewsComponent } from './shared/news/news.component';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { FindingMatchComponent } from './finding-match/finding-match.component';
import { MatchFoundComponent } from './match-found/match-found.component';
import { MatchEndComponent } from './match-end/match-end.component';



@NgModule({
  declarations: [
    AppComponent,
    CountdownComponent,
    FriendsComponent,
    HeaderComponent,
    NewsComponent,
    GameSelectionComponent,
    FindingMatchComponent,
    MatchFoundComponent,
    MatchEndComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: GameSelectionComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
