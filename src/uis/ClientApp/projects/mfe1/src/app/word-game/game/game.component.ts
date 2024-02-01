import { Component, HostListener, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public auth: any;
  public guesses = ['','','','',''];
  public guessNo = 0;
  private lowercaseAlphabet = Array.from({length: 26}, (_, i) => String.fromCharCode('a'.charCodeAt(0) + i));
  public word: string;
  private wordId: string;
  public gameOver: string = '';
  
  constructor(private router: Router,
    private readonly gameService: GameService) {
      this.auth = JSON.parse(localStorage.getItem("auth"));
      
      if (!this.auth) {
        this.router.navigateByUrl("/");
      }
  }
  ngOnInit(): void {
    this.gameService.validateUser(this.auth).subscribe(() => {
      this.gameService.getWord(this.auth.token).subscribe((res: any) => {
        this.word = res.chosenWord;
        this.wordId = res.id;
      });
    })
  }

  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      if(this.gameOver.length == 0) {
        if(this.lowercaseAlphabet.includes(event.key)){
          if(this.guesses[this.guessNo].length < 5) {
            this.guesses[this.guessNo] += event.key;
          }
        }
  
        if (event.key == 'Backspace') {
          if(this.guesses[this.guessNo].length > 0) {
            this.guesses[this.guessNo] = this.guesses[this.guessNo].slice(0, this.guesses[this.guessNo].length - 1);
          }
        }

        if (event.key == 'Enter') {
          this.guess();
        }
      }
  }

  public guess() {
    if (this.guesses[this.guessNo].length == 5) {
      this.gameService.validateUser(this.auth).subscribe((user: any) => {
        this.gameService
          .addGuess(this.auth.token, {
            'guessedWord': this.guesses[this.guessNo], 
            'attemptNo': this.guessNo, 
            'wordId': this.wordId, 
            'userId': user})
          .subscribe((res: any) => {
            if (this.guesses[this.guessNo] == this.word) {
              this.guessNo++;
              this.gameOver = 'You guessed!';
            }
            else {
              this.guessNo++;
              if (this.guessNo > 4) {
                this.gameOver = `The word was: ${this.word}`;
              }
            }
        });
      })
    }
  }

  public logout() {
    localStorage.removeItem("auth");
    this.router.navigateByUrl("/");
  }
}
