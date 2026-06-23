import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = ConfigService.toApiUrl('projects');

  constructor(private http: HttpClient) { }

  getAll(prestation_codes?:any, excludeClosed:boolean=false): any {
    const params: string[] = [];
    if (prestation_codes) params.push(`prestation_codes=${prestation_codes}`);
    if (excludeClosed)    params.push(`exclude_closed=1`);
    const query = params.length ? `?${params.join('&')}` : '';
    return this.http.get<any>(`${ConfigService.toApiUrl('projects')}${query}`, );
  }



  store(ressource: any) {
    return this.http.post(this.url, ressource, );
  }
  show(id: any) {
    return this.http.get(`${this.url}/${id}`, );
  }

  exportList(id:any,ressource:any){
    return this.http.post<any>(`${ConfigService.toApiUrl('projects-export')}`, ressource,
     ConfigService.addAction('status'));
  }

  

  update(ressource: any, id: number) {
    ressource.append('_method','patch')
    return this.http.post(`${this.url}/${id}`, ressource, );
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, );
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, );
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
