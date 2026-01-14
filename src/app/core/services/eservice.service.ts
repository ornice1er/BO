import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class EServiceService {

  url = ConfigService.toApiUrl('eservice');

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get<any>(this.url, );
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, );
  }
  show(id: any,slug:any,edit:any) {
    return this.http.get(`${this.url}/${id}/${slug}/${edit}`, );
  }
  update(ressource: any) {
    
    return this.http.post(`${this.url}/requete/update`, ressource, );
  }
  delete(id: number) {
    return this.http.get(`${this.url}/${id}`, );
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/state`, );
  }
  storeR(resource: any) {
    return this.http.post(`${this.url}/report/store`,resource, );
  }


  removeFile(ressource:any) {
    return this.http.post(this.url+"/files/deleting", ressource, );
  }

  search(resource:any){
    return this.http.post<any>(`${this.url}-search`,resource,
     ConfigService.addAction('status'));
  }
    setStatus(id:any,status:any){
    return this.http.get<any>(`${this.url}/${id}/state/${status}`,
     ConfigService.addAction('status'));
  }
}
