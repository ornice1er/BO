import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Config } from "../../app.config";
import {User} from '../_models/user.model';
import {Observable} from 'rxjs';
import { globalName } from '../_utils/utils';

@Injectable({
  providedIn: 'root'
})
export class FonctionAgentService {

  url = Config.toApiUrl('fonction-agent');

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  show(id: number) {
    return this.http.get(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  update(ressource: any, id: number) {
    ressource['_method']="patch"
    return this.http.patch(`${this.url}/${id}`, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

}
