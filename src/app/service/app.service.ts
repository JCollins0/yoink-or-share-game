import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Login, SignUp, User } from "../models/user";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class AppService {
    url_prefix: string;
    constructor (private http: HttpClient) {
        if(environment.production){
            this.url_prefix = '';
        }else{
            this.url_prefix = 'http://localhost:8080';
        }
    }
  
    login(payload : Login) : Observable<User>{ 
      return this.http.post<User>(this.url_prefix+'/api/user/login',payload);
    }

    signUp(payload : SignUp) : Observable<User> {
      return this.http.post<User>(this.url_prefix+'/api/user/new',payload);
    }
  }