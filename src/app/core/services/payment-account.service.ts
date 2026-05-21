import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({ providedIn: 'root' })
export class PaymentAccountService {
  url = ConfigService.toApiUrl('payment-accounts');

  constructor(private http: HttpClient) {}

  getAll()                        { return this.http.get<any>(this.url); }
  store(data: any)                { return this.http.post<any>(this.url, data); }
  update(id: number, data: any)   { return this.http.put<any>(`${this.url}/${id}`, data); }
  delete(id: number)              { return this.http.delete<any>(`${this.url}/${id}`); }
  setStatus(id: number, s: 0|1)  { return this.http.get<any>(`${this.url}/${id}/state/${s}`); }
}
