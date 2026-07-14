import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({ providedIn: 'root' })
export class DocumentTemplateService {

  url = ConfigService.toApiUrl('document-templates');

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(this.url);
  }

  store(data: any) {
    return this.http.post<any>(this.url, data);
  }

  show(id: any) {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  update(id: any, data: any) {
    return this.http.patch<any>(`${this.url}/${id}`, data);
  }

  delete(id: any) {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
