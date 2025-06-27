import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigService } from '../utils/config-service';

@Injectable({
  providedIn: 'root'
})
export class RequeteService {

  url = ConfigService.toApiUrl('requete');

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get<any>(this.url, );
  }

  get(code:any,slug:any,prestation_code?:any): any {
    return this.http.get<any>(`${this.url}/get-one/${code}/${slug}?prestation_code=${prestation_code}`, );
  }

  /*getByPrestationPending(id:any){
    return this.http.get<any>(this.url+'/byPrestationPending/'+id, );

  }*/

  getByPrestationNew(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/new'+'?code='+code, );
  }
  getByPrestationTreated(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/treated'+'?code='+code, );
  }
  getByPrestationToSign(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/to-sign'+'?code='+code, );
  }
  getByPrestationSigned(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/signed'+'?code='+code, );
  }
  getByPrestationToReject(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/to-reject'+'?code='+code, );
  }
  getByPrestationRejected(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/rejected'+'?code='+code, );
  }
  getByPrestationPending(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/pending'+'?code='+code, );
  }
  getForAgenda(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/agenda'+'?code='+code, );
  }
  getByPrestationFinished(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/finished'+'?code='+code, );
  }
  getByPrestationAll(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/all'+'?code='+code, );
  }

  getByPrestationCorrect(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/correct'+'?code='+code, );
  }

  getByPrestationVisa(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/visa'+'?code='+code, );
  }



  relance(id:any): any {
    return this.http.get<any>(this.url+'/relance/'+id, );
  }

  getCorrectionByPrestation(slug:any,code?:any): any {
    return this.http.get<any>(this.url+'/correction/byPrestation/'+slug+'?code='+code, );
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, );
  }

  confirm(ressource: any,slug:any,code?:any) {
    return this.http.post(this.url+'/confirm/byPrestation/'+slug+'?code='+code, ressource, );
  }

  concat(ressource: any) {
    return this.http.post(this.url+"/concat", ressource, );
  }
  storeResponse(ressource: any) {
    return this.http.post(this.url+"/response/store", ressource, );
  }

  show(id: any) {
    return this.http.get(`${this.url}/${id}`, );
  }
  getForTreatment(id: any,slug:any,code?:any) {
    return this.http.get(`${this.url}/treatment/${id}/${slug}`+'?code='+code, );
  }
  update(id: number,ressource: any) {
    ressource['_method']="patch"
    return this.http.patch(`${this.url}/${id}`, ressource, );
  }

  geeratePDF(id: number,ressource: any,slug:string,code?:any) {
    
    return this.http.post(`${this.url}/generate/${id}/${slug}`+'?code='+code, ressource, );
  }

  delete(id: number) {
    return this.http.get(`${this.url}/${id}`, );
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, );
  }
  verifyFile(code: any,npi:any,index:any) {
    return this.http.get(`${ConfigService.toApiUrl('requete-verify')}/${code}/${npi}/${index}`, );
  }

  requestProof(resource:any) {
    return this.http.post(`${ConfigService.toApiUrl('requete-file-proof-send')}`,resource, );
  }

  addContratFile(resource: any) {
    return this.http.post(`${ConfigService.toApiUrl('requete-add-contract-file')}`,resource, );
  }

}
