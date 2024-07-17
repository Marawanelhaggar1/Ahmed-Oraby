import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DentalServices } from 'app/admin/dental-service/all-dental-service/dental-service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DentalService {
  constructor(
    private _http: HttpClient,
    private _cookie: CookieService,
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

  post(body: FormData): Observable<DentalServices> {
    return this._http.post<DentalServices>(
      'https://hws1.axonbi.com/public/api/dental',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }
  updateCenter(body: DentalServices): Observable<DentalServices> {
    return this._http.put<DentalServices>(
      'https://hws1.axonbi.com/public/api/dental',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

  deleteCenters(id: number): void {
    console.log(id);

    this._http
      .delete(`https://hws1.axonbi.com/public/api/dental/${id}`, {
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

  get(): Observable<{ data: DentalServices[] }> {
    return this._http.get<{ data: DentalServices[] }>(
      'https://hws1.axonbi.com/public/api/dental'
    );
  }
}
