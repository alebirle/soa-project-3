import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private JSON_headers = new HttpHeaders().set('Content-type', 'application/json;charset=UTF-8');
  private authenticationPath = 'http://localhost:44300/identity';

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(this.authenticationPath + "/login?d=frontend", data, {
      headers: this.JSON_headers,
      responseType: 'text'
    });
  }

  register(data) {
    return this.http.post(this.authenticationPath + "/register", data, {
      headers: this.JSON_headers,
      responseType: 'text'
    });
  }
}