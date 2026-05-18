import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class EtapeVisibiliteService {

  url = ConfigService.toApiUrl('etape-visibilites');

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get<any>(this.url);
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource);
  }

  show(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  update(ressource: any, id: number) {
    ressource['_method'] = 'patch';
    return this.http.patch(`${this.url}/${id}`, ressource);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  search(resource: any) {
    return this.http.post<any>(`${this.url}-search`, resource, ConfigService.addAction('status'));
  }

  deleteByPrestation(prestationId: number) {
    return this.http.delete(`${this.url}/by-prestation/${prestationId}`);
  }

  copyFromPrestation(fromPrestationId: number, toPrestationId: number) {
    return this.http.post(`${this.url}/copy-from-prestation`, {
      from_prestation_id: fromPrestationId,
      to_prestation_id:   toPrestationId,
    });
  }
}
