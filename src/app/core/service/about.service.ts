import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AboutModel } from 'app/admin/about-us/all-about/about-model';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
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

  get(): Observable<{ data: AboutModel[] }> {
    return this._http.get<{ data: AboutModel[] }>(
      'https://hws1.axonbi.com/public/api/about/us'
    );
  }

  post(body: FormData): Observable<AboutModel> {
    return this._http.post<AboutModel>(
      'https://hws1.axonbi.com/public/api/about/us',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

  update(body: AboutModel): Observable<AboutModel> {
    return this._http.put<AboutModel>(
      'https://hws1.axonbi.com/public/api/about/us',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

  delete(id: number): void {
    console.log(id);

    this._http
      .delete(`https://hws1.axonbi.com/public/api/about/us/${id}`, {
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
