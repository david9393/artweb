import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Artwork } from '../shared/models/Artwork';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {

  private _proxy: BaseService;

  public get proxy(): BaseService{
    return this._proxy
  }

  constructor(http: HttpClient, protected router: Router) {
    this._proxy = new BaseService(http, router);
  }

  All(): Observable<Artwork[]>{
    return this._proxy.executeGet('/artworks/all');
  };

  Add(artwork:Artwork): Observable<Artwork>{
    return this._proxy.executePost('/artworks/create',artwork);
  };
}
