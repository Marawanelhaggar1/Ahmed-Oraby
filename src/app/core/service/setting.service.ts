import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SettingModel } from 'app/admin/mobile-settings/all-settings/setting-model';
import { SettingWebModel } from 'app/admin/web-settings/all-settings/setting-model';
// import { SettingModel } from 'app/admin/web-settings/all-settings/setting-model';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
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

  createWebSettings(body: FormData): Observable<SettingWebModel> {
    return this._http.post<SettingWebModel>(
      'https://getmedist.com/public/api/web/setting',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

  createMobileSettings(body: FormData): Observable<SettingModel> {
    return this._http.post<SettingModel>(
      'https://getmedist.com/public/api/mobile/setting',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

  updateWebSettings(body: SettingWebModel): Observable<SettingWebModel> {
    return this._http.put<SettingWebModel>(
      'https://getmedist.com/public/api/web/setting',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

  updateMobileSettings(body: SettingModel): Observable<SettingModel> {
    return this._http.put<SettingModel>(
      'https://getmedist.com/public/api/mobile/setting',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }

  deleteWeb(id: number): void {
    console.log(id);

    this._http
      .delete(`https://getmedist.com/public/api/web/setting/${id}`, {
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

  deleteMobile(id: number): void {
    console.log(id);

    this._http
      .delete(`https://getmedist.com/public/api/mobile/setting/${id}`, {
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

  getCounter(): Observable<any> {
    return this._http.get<any>(
      'https://getmedist.com/public/api/web/setting/count'
    );
  }
}
