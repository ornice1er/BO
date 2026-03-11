import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
 url = ConfigService.toApiUrl('workflows');

  constructor(private http: HttpClient) { }

  getAll(prestationId?:any,etapeId?:any): any {
    if (prestationId!=null && etapeId!=null) {
          return this.http.get<any>(this.url+`?prestation_id=${prestationId}&etape_id=${etapeId}`, );
    }
    return this.http.get<any>(this.url );
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, );
  }
  show(id: any) {
    return this.http.get(`${this.url}/${id}`, );
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
