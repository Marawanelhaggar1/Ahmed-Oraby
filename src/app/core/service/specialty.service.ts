import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Doctor } from '@core/models/doctor';
import { Specialty } from '@core/models/specialty';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  constructor(
    private _cookie: CookieService,
    private _http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  post(body: Specialty): Observable<Specialty> {
    return this._http.post<Specialty>(
      'https://hws1.axonbi.com/public/api/specialization',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

  get(): Observable<{ data: Specialty[] }> {
    return this._http.get<{ data: Specialty[] }>(
      'https://hws1.axonbi.com/public/api/specialization/admin'
    );
  }

  getIcons(): Observable<{ data: { id: number; image: string }[] }> {
    return this._http.get<{ data: { id: number; image: string }[] }>(
      'https://hws1.axonbi.com/public/api/icons'
    );
  }

  updateCenter(body: Specialty): Observable<Specialty> {
    return this._http.put<Specialty>(
      'https://hws1.axonbi.com/public/api/specialization',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

  getBySpecialty(specialtyId: number): Observable<{ data: Doctor[] }> {
    return this._http.get<{ data: Doctor[] }>(
      `https://hws1.axonbi.com/public/api/doctors/specialty/${specialtyId}`
    );
  }

  deleteCenters(id: number): void {
    console.log(id);

    this._http
      .delete(`https://hws1.axonbi.com/public/api/specialization/${id}`, {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.showNotification(
            'snackbar-danger',
            'Deleted Successfully...!!!',
            'bottom',
            'center'
          );
        },
        error: (error: HttpErrorResponse) => {
          // error code here
          console.error(error);
          this.showNotification(
            'snackbar-danger',
            'Something Wrong Happened...!!!',
            'bottom',
            'center'
          );
        },
      });
  }
}
