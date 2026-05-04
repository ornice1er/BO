import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class PlanningSlotService {

  url = ConfigService.toApiUrl('planning-slots');

  constructor(private http: HttpClient) {}

  getAll(params: any = {}): any {
    return this.http.get<any>(this.url, { params });
  }

  store(resource: any) {
    return this.http.post(this.url, resource);
  }

  show(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  update(id: number, resource: any) {
    resource['_method'] = 'patch';
    return this.http.patch(`${this.url}/${id}`, resource);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  toggleAvailability(id: number) {
    return this.http.get<any>(`${this.url}/${id}/toggle-availability`);
  }
}
