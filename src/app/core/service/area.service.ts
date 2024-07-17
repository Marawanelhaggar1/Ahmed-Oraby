import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Area } from '@core/models/area';
import { CenterModel } from 'app/admin/centers/all-centers/center-model';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
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

  get(): Observable<{ data: Area[] }> {
    return this._http.get<{ data: Area[] }>(
      'https://getmedist.com/public/api/area/admin'
    );
  }

  getCentersByArea(areaId: number): Observable<{ data: CenterModel[] }> {
    return this._http.get<{ data: CenterModel[] }>(
      `https://getmedist.com/public/api/center/area/${areaId}`
    );
  }

  post(body: Area): Observable<Area> {
    return this._http.post<Area>(
      'https://getmedist.com/public/api/area',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

  updateCenter(body: Area): Observable<Area> {
    return this._http.put<Area>('https://getmedist.com/public/api/area', body, {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
      },
    });
  }

  deleteCenters(id: number): void {
    console.log(id);

    this._http
      .delete(`https://getmedist.com/public/api/area/${id}`, {
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
