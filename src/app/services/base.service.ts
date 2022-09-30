import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected _baseUrl: string;
  public _http: HttpClient;
  protected _onUnauthorizedRequest: EventEmitter<any>;
 
  constructor(protected http: HttpClient, protected router: Router) {
    this._http = http;
    this._baseUrl = environment.ApiUrl;
    this._onUnauthorizedRequest = new EventEmitter<any>();
  }

  executePost(relativeUrl: string, data?: any): any {
    const url = `${ this._baseUrl+relativeUrl }`;
    return this.http.post( url,data,{headers: this.headers}).pipe()
  }

  executeGet(relativeUrl: string,params?:HttpParams): any {
    const url = `${ this._baseUrl+relativeUrl }`;
    return this.http.get(url, {headers: this.headers, params: params}).pipe()
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.token);
    return headers;
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            alert("sss")
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}
}

