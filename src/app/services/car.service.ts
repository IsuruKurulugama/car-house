import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AuthState } from '../login/auth.state';
import { Car } from '../models/car.model';

@Injectable({ providedIn: 'root' })
export class CarService extends BaseService {
  authToken$: string | undefined;

  constructor(private http: HttpClient, private store: Store) {
    super();
    this.authToken$ = this.store.selectSnapshot(AuthState.token);
  }

  getCars(): Observable<Car[]> {
    const headers = new HttpHeaders({
      'Authorization-Token': `${this.authToken$}`
    });
    return this.http.get<Car[]>(this.apiURL + '/GetCars', { headers: headers }).pipe(catchError(this.handleError));
  }

  createCar(car: Car): Observable<Car> {
    const headers = new HttpHeaders({
      'Authorization-Token': `${this.authToken$}`
    });
    console.log('save car', car);
    return this.http.post<Car>(this.apiURL + '/AddCar', car, { headers: headers }).pipe(catchError(this.handleError));
  }

}