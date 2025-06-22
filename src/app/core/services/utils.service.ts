import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private router: Router, private route: ActivatedRoute,private http:HttpClient) { }

  handleError( errorResponse: HttpErrorResponse) {
        switch (errorResponse.status) {
            case 404: {
                this.router.navigate(['/not-found']);
                return of(null);
            }
            case 401: {
                const returnURL: string = '/' + this.route.snapshot.url.map(segment => segment.path).join('/');
                this.router.navigate(['/login'], {queryParams: {returnURL: returnURL}});
                return of(null);
            }
            case 403: {
                this.router.navigate(['/unauthorized']);
                return of(null);
            }
            default: {
                console.error(Error);
                this.router.navigate(['/error']);
                return of(null);
            }
        }
  }

 

}
