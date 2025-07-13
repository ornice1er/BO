import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  url = ConfigService.toApiUrl('files');

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get<any>(this.url, );
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, );
  }
  show(id: any) {
    return this.http.get(`${this.url}/${id}`, );
  }
  update(ressource: any, id: number) {
    ressource['_method']="patch"
    return this.http.patch(`${this.url}/${id}`, ressource, );
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, );
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, );
  }

  getFromPrestationName(name:any): any {
    return this.http.get<any>(`${this.url}/by-prestation/${name}`);
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
