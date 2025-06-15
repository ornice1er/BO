import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
url = ConfigService.toApiUrl('documents');

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url, ConfigService.addAction('list'));
  }

  store(ressource: object) {
    return this.http.post(this.url, ressource,ConfigService.addAction('add'));
  }

  getDocumentTree() {
    return this.http.get(this.url+'-tree',ConfigService.addAction('add'));
  }

  copyStore(ressource: object) {
    return this.http.post(this.url+'-copy', ressource,ConfigService.addAction('add'));
  }
  show(id: number) {
    return this.http.get(`${this.url}/${id}`, ConfigService.addAction('show'));
  }
  update( id: number,ressource: any) {
    ressource.append('_method', 'patch');
    return this.http.post(`${this.url}/${id}`, ressource, ConfigService.addAction('edit'));
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, ConfigService.addAction('delete'));
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, ConfigService.addAction('status'));
  }
  setStatus(id:any,status:any){
      return this.http.get<any>(`${this.url}${id}/state/${status}`,
       ConfigService.addAction('status'));
    }
}
