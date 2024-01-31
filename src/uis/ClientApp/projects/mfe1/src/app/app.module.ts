import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { WordGameModule } from './word-game/word-game.module';
import { APP_ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { WordComponent } from './word-game/word/word.component';
import { GameComponent } from './word-game/game/game.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    WordGameModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  declarations: [
    AppComponent,
    WordComponent,
    GameComponent,
  ],
  providers: [],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
