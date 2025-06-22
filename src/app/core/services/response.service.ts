import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Config } from "../../app.config";
import {User} from '../_models/user.model';
import {Observable} from 'rxjs';
import { globalName } from '../_utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  url = Config.toApiUrl('response');

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  getByPrestation(slug:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug, Config.httpHeader(localStorage.getItem(globalName.token)));
  }


  getCorrectionByPrestation(slug:any): Observable<any> {
    return this.http.get<any>(this.url+'/correction/byPrestation/'+slug, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  authorized(ressource: any) {
    return this.http.post(this.url+'/sign-authorized', ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  
  correction(ressource: any) {
    return this.http.post(this.url+'/need-correction', ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  reachedAgreement(ressource: any) {
    return this.http.post(this.url+'/reached-agreement', ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }


  decline(ressource: any) {
    return this.http.post(this.url+"/decline/store", ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  validate(ressource: any) {
    return this.http.post(this.url+"/validated/store", ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }


  storeResponse(ressource: any) {
    return this.http.post(this.url+"/response/store", ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  show(id: number) {
    return this.http.get(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  update(id: number,ressource: any) {
    ressource['_method']="patch"
    return this.http.patch(`${this.url}/${id}`, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  delete(id: number) {
    return this.http.get(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  storeContent(ressource: any) {
    
    return this.http.post(`${this.url}/store/content`, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

}
