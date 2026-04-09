import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class DocumentActeService {


  url = ConfigService.toApiUrl('etape-visibilites');

  constructor(private http: HttpClient) { }


  /** Récupérer le document produit configuré pour une étape */
getDocProduit(prestationId: any, etapeId: any): any {
  return this.http.get<any>(
    `${ConfigService.toApiUrl('document-actes')}/doc-produit/${prestationId}/${etapeId}`
  );
}
}
