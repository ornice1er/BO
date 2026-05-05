import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  url = ConfigService.toApiUrl('municipalities');

  constructor(private http: HttpClient) {}

  getAll(params?: any): any {
    return this.http.get<any>(this.url, { params });
  }

  getByDepartment(departmentId: number): any {
    return this.http.get<any>(this.url, { params: { department_id: departmentId } });
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource);
  }

  show(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  update(ressource: any, id: number) {
    ressource['_method'] = 'patch';
    return this.http.post(`${this.url}/${id}`, ressource);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  setStatus(id: any, status: any) {
    return this.http.get<any>(`${this.url}/${id}/state/${status}`);
  }
}
