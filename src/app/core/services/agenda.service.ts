import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  url = ConfigService.toApiUrl('agenda');

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get<any>(this.url, );
  }
  
  getByPrestation(slug:any): any {
    return this.http.get<any>(this.url+`/get-by-prestation/${slug}`, );
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, );
  }
  show(id: number) {
    return this.http.get(`${this.url}/${id}`, );
  }
  update(ressource: any, id: number) {
    ressource['_method']="patch"
    return this.http.post(`${this.url}/${id}`, ressource, );
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, );
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, );
  }

  SendMail(id: number) {
    return this.http.get(`${this.url}/mail/send/${id}`, );
  }
  transUp(id: number) {
    return this.http.get(`${this.url}/mail/trans-up/${id}`, );
  }

}
