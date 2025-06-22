import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from 'src/app/app.config';
import { globalName } from '../_utils/utils';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  url = Config.toApiUrl('billings');

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  storeResponse(ressource: any) {
    return this.http.post(Config.toApiUrl('billings-response-store'), ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  show(id: number) {
    return this.http.get(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  update(ressource: any, id: number) {
    return this.http.patch(`${this.url}/${id}`, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  setStatus(id:any,status:any){
    return this.http.get<any>(`${this.url}/set-status/${id}/${status}`,
    Config.httpHeader(localStorage.getItem(globalName.token),true));
  }
}
