import { Routes } from '@angular/router';
import { GameComponent } from './word-game/game/game.component';

export const APP_ROUTES: Routes = [
    { path: '', component: GameComponent, pathMatch: 'full'}
];
