import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseOut } from '../shared/BaseOut';
import { User } from '../shared/models/User';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _proxy: BaseService;

  public get proxy(): BaseService{
    return this._proxy
  }

  constructor(http: HttpClient, protected router: Router) {
    this._proxy = new BaseService(http, router);
  }

  Login(user:User): Observable<BaseOut>{
    return this._proxy.executePost('/users/login',user);
  };

  Add(user:User): Observable<BaseOut> {
    return this._proxy.executePost('/users/create', user);
  };

  Update(user:User): Observable<BaseOut> {
    return this._proxy.executePost('/users/update', user);
  };
}
