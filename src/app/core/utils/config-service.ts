import {  HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.pprod-memp';

export const ConfigService: any = {
  apiVersion: environment.API_VERSION,
  apiScheme: environment.API_SCHEME,
  apiFile: environment.API_FILE,
  apiDomain: environment.API_DOMAIN,
  toApiUrl(path:any) {

    return `${this.apiScheme}://${this.apiDomain}/${path}`;
  },
  toFile(path:any) {
    if (path) {
          return `${this.apiScheme}://${this.apiFile}/${path}`;

    }else{
          return `${this.apiScheme}://${this.apiFile}`;

    }
  },
  getOrigin() {
    return `${this.apiScheme}://${this.apiFile}`;
  },
  httpHeader(token=null,isJson=true){
      
      if(token!=null){
        return {
            headers: new HttpHeaders({
            'Authorization': 'Bearer ' + token,
              'Access-Control-Allow-Origin':'*',
              'Accept':'application/json'
          })
          };
      }
      return {
        headers: new HttpHeaders({})
      };
    
    
  },
  addAction(action:string){
      
      return {headers: new HttpHeaders({'action': action}) };
      },
  toWsUrl(path:any){
    return `wss://${this.apiDomain}/${path}`
  }
}
