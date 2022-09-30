import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SalesArtwork } from '../shared/models/SalesArtwork';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private _proxy: BaseService;

  public get proxy(): BaseService{
    return this._proxy
  }

  constructor(http: HttpClient, protected router: Router) {
    this._proxy = new BaseService(http, router);
  }

  
  Add(salesArtwork:SalesArtwork): Observable<SalesArtwork>{
    return this._proxy.executePost('/sales/create',salesArtwork);
  };

  GetUser(userId:number): Observable<SalesArtwork[]>{
    let params= new HttpParams().set("userId",userId);
    return this._proxy.executeGet('/sales/user',params);
  }
}
