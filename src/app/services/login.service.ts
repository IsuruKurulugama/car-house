import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class LoginService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(this.apiURL + '/Login?UserName=' + username + '&Password=' + password, {}).pipe(catchError(this.handleError));
    }

}