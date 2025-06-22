import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Config } from "../../app.config";
import {User} from '../_models/user.model';
import {Observable} from 'rxjs';
import { globalName } from '../_utils/utils';

@Injectable({
  providedIn: 'root'
})
export class RequeteService {

  url = Config.toApiUrl('requete');

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.url, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  get(code:any,slug:any,prestation_code?:any): Observable<any> {
    return this.http.get<any>(`${this.url}/get-one/${code}/${slug}?prestation_code=${prestation_code}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  /*getByPrestationPending(id:any){
    return this.http.get<any>(this.url+'/byPrestationPending/'+id, Config.httpHeader(localStorage.getItem(globalName.token)));

  }*/

  getByPrestationNew(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/new'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  getByPrestationTreated(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/treated'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  getByPrestationToSign(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/to-sign'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  getByPrestationSigned(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/signed'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  getByPrestationToReject(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/to-reject'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  getByPrestationRejected(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/rejected'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  getByPrestationPending(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/pending'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  getForAgenda(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/agenda'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  getByPrestationFinished(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/finished'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  getByPrestationAll(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/all'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  getByPrestationCorrect(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/correct'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  getByPrestationVisa(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/byPrestation/'+slug+'/visa'+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }



  relance(id:any): Observable<any> {
    return this.http.get<any>(this.url+'/relance/'+id, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  getCorrectionByPrestation(slug:any,code?:any): Observable<any> {
    return this.http.get<any>(this.url+'/correction/byPrestation/'+slug+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  store(ressource: any) {
    return this.http.post(this.url, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  confirm(ressource: any,slug:any,code?:any) {
    return this.http.post(this.url+'/confirm/byPrestation/'+slug+'?code='+code, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  concat(ressource: any) {
    return this.http.post(this.url+"/concat", ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  storeResponse(ressource: any) {
    return this.http.post(this.url+"/response/store", ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  show(id: any) {
    return this.http.get(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  getForTreatment(id: any,slug:any,code?:any) {
    return this.http.get(`${this.url}/treatment/${id}/${slug}`+'?code='+code, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  update(id: number,ressource: any) {
    ressource['_method']="patch"
    return this.http.patch(`${this.url}/${id}`, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  geeratePDF(id: number,ressource: any,slug:string,code?:any) {
    
    return this.http.post(`${this.url}/generate/${id}/${slug}`+'?code='+code, ressource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  delete(id: number) {
    return this.http.get(`${this.url}/${id}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  state(id: number) {
    return this.http.get(`${this.url}/${id}/status`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }
  verifyFile(code: any,npi:any,index:any) {
    return this.http.get(`${Config.toApiUrl('requete-verify')}/${code}/${npi}/${index}`, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  requestProof(resource:any) {
    return this.http.post(`${Config.toApiUrl('requete-file-proof-send')}`,resource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

  addContratFile(resource: any) {
    return this.http.post(`${Config.toApiUrl('requete-add-contract-file')}`,resource, Config.httpHeader(localStorage.getItem(globalName.token)));
  }

}
