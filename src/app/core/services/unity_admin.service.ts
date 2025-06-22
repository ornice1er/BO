import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Config } from "../../app.config";
import {User} from '../_models/user.model';
import {Observable} from 'rxjs';
import { globalName } from '../_utils/utils';

@Injectable({
  providedIn: 'root'
})
export class UnityAdminService {

  url = Config.toApiUrl('unity-admin');

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url, Config.httpHeader(localStorage.getItem(globalName.token)));
  }


  getPrincipal(): Observable<any> {
    return this.http.get<any>(this.url+"/principal/all", Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  getUaCollabs(): Observable<any> {
    return this.http.get<any>(this.url+"/collabs/all", Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }


  show(id: number) {
    return this.http.get(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  update(ressource: any, id: number) {
   
    return this.http.put(`${this.url}/${id}`, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

}
