import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private JSON_headers = new HttpHeaders().set('Content-type', 'application/json;charset=UTF-8');
  private wordPath = 'http://localhost:44300/word';
  private guessPath = 'http://localhost:44300/guess';
  private authPath = 'http://localhost:44300/identity';

  constructor(private http: HttpClient) { 
  }

  validateUser(auth: any) {
    return this.http.get(`${this.authPath}/validate?email=${auth.email}&token=${auth.token}`, {
      headers: this.JSON_headers,
      responseType: 'text',
    });
  }

  getWord(token: any) {
    return this.http.get(this.wordPath, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }

  addGuess(token: any, guess: any) {
    return this.http.post(this.guessPath, guess, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    });
  }
}