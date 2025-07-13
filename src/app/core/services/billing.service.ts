import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  url = ConfigService.toApiUrl('billings');

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get<any>(this.url, );
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, );
  }

  storeResponse(ressource: any) {
    return this.http.post(ConfigService.toApiUrl('billings-response-store'), ressource, );
  }

  show(id: number) {
    return this.http.get(`${this.url}/${id}`, );
  }
  update(ressource: any, id: number) {
    return this.http.patch(`${this.url}/${id}`, ressource, );
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, );
  }

  setStatus(id:any,status:any){
    return this.http.get<any>(`${this.url}/set-status/${id}/${status}`,
    ConfigService.httpHeader(localStorage.getItem(GlobalName.token),true));
  }
  search(resource:any){
    return this.http.post<any>(`${this.url}-search`,resource,
     ConfigService.addAction('status'));
  }
  
}
