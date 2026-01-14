import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class ContratPService {

  url = ConfigService.toApiUrl('contrat-p');

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get<any>(this.url, );
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, );
  }
  storeFile(ressource: any) {
    return this.http.post(this.url+"/file/upload", ressource, );
  }
  show(id: any) {
    return this.http.get(`${this.url}/${id}`, );
  }
  update(ressource: any, id: number) {
    ressource.append('_method','patch')
    return this.http.post(`${this.url}/${id}`, ressource, );
  }
  delete(id: number) {
    return this.http.get(`${this.url}/${id}`, );
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, );
  }

}
