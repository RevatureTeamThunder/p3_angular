import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    return this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
    
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null);
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password, role: 'user'};
    // let params = new HttpParams();
    // params = params.append("email", email);
    // params = params.append("password", password);
    // params = params.append("firstName", firstName);
    // params = params.append("lastName", lastName);
    // params = params.append("role", "user");
    return this.http.post<any>(`${this.authUrl}/register`, payload,  {headers: environment.headers}).pipe(
      catchError(error => {
        if (error.status == 500)  {
        throwError("Email already in use")
        }
        console.log("Registration error")
        
        return throwError(error);
      })

     
    );
  }
}
