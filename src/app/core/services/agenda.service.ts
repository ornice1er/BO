import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Config } from "../../app.config";
import {Observable} from 'rxjs';
import { globalName } from '../_utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  url = Config.toApiUrl('agenda');

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  
  getByPrestation(slug:any): Observable<any> {
    return this.http.get<any>(this.url+`/get-by-prestation/${slug}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  show(id: number) {
    return this.http.get(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  update(ressource: any, id: number) {
    ressource['_method']="patch"
    return this.http.post(`${this.url}/${id}`, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  SendMail(id: number) {
    return this.http.get(`${this.url}/mail/send/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  transUp(id: number) {
    return this.http.get(`${this.url}/mail/trans-up/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

}
