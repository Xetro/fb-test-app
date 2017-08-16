import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { MatchmakingComponent } from './matchmaking/matchmaking.component';
import { MatchEndComponent } from './match-end/match-end.component';
import { GameSelectionComponent } from './game-selection/game-selection.component';


// import { AuthGuardLogin } from './services/auth-guard-login.service';
// import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  { path: '', component: GameSelectionComponent },
  { path: 'matchmaking', component: MatchmakingComponent },
  { path: 'match-end', component: MatchEndComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'logout', component: LogoutComponent },
  // { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
  // { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
