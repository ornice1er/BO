import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';
import { GlobalName } from '../utils/global-name';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  url=ConfigService.toApiUrl("dash/");

  constructor(private http:HttpClient) { }

  
  getDash(){
    return this.http.get<any>(`${this.url}`,
     ConfigService.addAction('list'));
  }

    statsForMenu(){
    return this.http.get<any>(ConfigService.toApiUrl("stats-for-menu"), ConfigService.addAction('list'));
  }

   getAll(){
    return this.http.get<any[]>(`${this.url}`,ConfigService.addAction('list'));
  }

  show(ressource:any){
    return this.http.post<any>(`${this.url}`, ressource,
     ConfigService.addAction('add'));
  }
  store(ressource:any){
    return this.http.post<any>(`${this.url}`, ressource,
     ConfigService.addAction('add'));
  }

  update(id:any,ressource:any){
    //ressource['method']='_patch';

    return this.http.put<any>(`${this.url}${id}/`, ressource,  ConfigService.addAction('list'));
  }
  delete(id:any){
   // ressource['method']='delete';
    return this.http.delete<any>(`${this.url}${id}`,
     ConfigService.addAction('delete'));
  }

  get(id:any){
    return this.http.get<any>(`${this.url}${id}`,
     ConfigService.addAction('show'));
  }
  copy(resource:any){
    return this.http.post<any>(`${ConfigService.toApiUrl("roles-windows-copy")}`,resource,
     ConfigService.addAction('show'));
  }
   setStatus(id:any,status:any){
      return this.http.get<any>(`${this.url}${id}/state/${status}`,
       ConfigService.addAction('status'));
    }
}
