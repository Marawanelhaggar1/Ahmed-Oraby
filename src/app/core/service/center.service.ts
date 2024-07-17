import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Center } from '@core/models/center';
import { Doctor } from '@core/models/doctor';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CenterService {
  constructor(
    private _http: HttpClient,
    private _cookie: CookieService,
    private snackBar: MatSnackBar
  ) {}

  postCenter(body: FormData): Observable<Center> {
    return this._http.post<Center>(
      'https://hws1.axonbi.com/public/api/center',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

  get(): Observable<{ data: Center[] }> {
    return this._http.get<{ data: Center[] }>(
      'https://hws1.axonbi.com/public/api/center/admin'
    );
  }

  updateCenter(body: Center): Observable<Center> {
    return this._http.put<Center>(
      'https://hws1.axonbi.com/public/api/center',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

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

  deleteCenters(id: number): void {
    console.log(id);

    this._http
      .delete(`https://hws1.axonbi.com/public/api/center/${id}`, {
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
            'Something Wrong Happened check if their is doctors attached with this center...!!!',
            'bottom',
            'center'
          );
        },
      });
  }

  getByCenter(centerId: number): Observable<{ data: Doctor[] }> {
    return this._http.get<{ data: Doctor[] }>(
      `https://hws1.axonbi.com/public/api/doctors/center/${centerId}`
    );
  }
}
