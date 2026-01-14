import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  url = ConfigService.toApiUrl('affectation');

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get<any>(this.url, );
  }

  getByPrestation(slug:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug, );
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, );
  }
  storeResponse(ressource: any) {
    return this.http.post(this.url+"/response/store", ressource, );
  }

  show(id: number) {
    return this.http.get(`${this.url}/${id}`, );
  }
  update(ressource: any, id: number) {
    return this.http.patch(`${this.url}/${id}`, ressource, );
  }
  delete(id: number) {
    return this.http.get(`${this.url}/${id}`, );
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, );
  }

}
