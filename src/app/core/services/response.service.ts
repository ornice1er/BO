import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  url = ConfigService.toApiUrl('response');

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get<any>(this.url, );
  }

  getByPrestation(slug:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug, );
  }


  getCorrectionByPrestation(slug:any): any {
    return this.http.get<any>(this.url+'/correction/byPrestation/'+slug, );
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, );
  }
  authorized(ressource: any) {
    return this.http.post(this.url+'/sign-authorized', ressource, );
  }
  
  correction(ressource: any) {
    return this.http.post(this.url+'/need-correction', ressource, );
  }

  reachedAgreement(ressource: any) {
    return this.http.post(this.url+'/reached-agreement', ressource, );
  }


  decline(ressource: any) {
    return this.http.post(this.url+"/decline/store", ressource, );
  }

  validate(ressource: any) {
    return this.http.post(this.url+"/validated/store", ressource, );
  }


  storeResponse(ressource: any) {
    return this.http.post(this.url+"/response/store", ressource, );
  }

  show(id: number) {
    return this.http.get(`${this.url}/${id}`, );
  }
  update(id: number,ressource: any) {
    ressource['_method']="patch"
    return this.http.patch(`${this.url}/${id}`, ressource, );
  }
  delete(id: number) {
    return this.http.get(`${this.url}/${id}`, );
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, );
  }

  storeContent(ressource: any) {
    
    return this.http.post(`${this.url}/store/content`, ressource, );
  }

}
