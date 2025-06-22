import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Config } from "../../app.config";
import {User} from '../_models/user.model';
import {Observable} from 'rxjs';
import { globalName } from '../_utils/utils';

@Injectable({
  providedIn: 'root'
})
export class EServiceService {

  url = Config.toApiUrl('eservice');

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  show(id: any,slug:any,edit:any) {
    return this.http.get(`${this.url}/${id}/${slug}/${edit}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  update(ressource: any) {
    
    return this.http.post(`${this.url}/requete/update`, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  delete(id: number) {
    return this.http.get(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/state`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  storeR(resource: any) {
    return this.http.post(`${this.url}/report/store`,resource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }


  removeFile(ressource:any) {
    return this.http.post(this.url+"/files/deleting", ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
}
