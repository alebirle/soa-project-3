import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public email: string;
  public password: string;
  
  constructor(private router: Router, 
    private readonly authenticationService: AuthenticationService) { }

  ngOnInit() {
    localStorage.removeItem("auth");
  }

  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      if (event.key == 'Enter') {
        this.login();
      }
  }

  public login() {
    if(this.email && this.password) {
      this.authenticationService.login({email: this.email, password: this.password}).subscribe((res) => {
        const auth = { "email": this.email, "token": res };

        localStorage.setItem("auth", JSON.stringify(auth));
        this.router.navigateByUrl('/game/game');
      });
    }
  }

  public register() {
    if(this.email && this.password) {
      this.authenticationService.register({email: this.email, password: this.password}).subscribe(() => {
        this.authenticationService.login({email: this.email, password: this.password}).subscribe((res) => {
          const auth = { "email": this.email, "token": res };

          localStorage.setItem("auth", JSON.stringify(auth));
          this.router.navigateByUrl('/game/game');
        });
      });
    }
  }
}
