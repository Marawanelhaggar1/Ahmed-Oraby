import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { PicsModel } from 'app/admin/hospital-pics/all-pics/pics-model';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PicsServiceService {
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

  post(body: FormData): Observable<PicsModel> {
    return this._http.post<PicsModel>(
      'https://hws1.axonbi.com/public/api/pics',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }
  updateCenter(body: PicsModel): Observable<PicsModel> {
    return this._http.put<PicsModel>(
      'https://hws1.axonbi.com/public/api/pics',
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
      .delete(`https://hws1.axonbi.com/public/api/pics/${id}`, {
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

  get(): Observable<{ data: PicsModel[] }> {
    return this._http.get<{ data: PicsModel[] }>(
      'https://hws1.axonbi.com/public/api/pics'
    );
  }
}
