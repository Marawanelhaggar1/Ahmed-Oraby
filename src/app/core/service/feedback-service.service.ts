import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FeedbackModel } from 'app/admin/feedback/all-feedback/feedback-model';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackServiceService {
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

  post(body: FormData): Observable<FeedbackModel> {
    return this._http.post<FeedbackModel>(
      'https://getmedist.com/public/api/feedback',
      body,
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._cookie.get('user')).data.token,
        },
      }
    );
  }
  updateCenter(body: FeedbackModel): Observable<FeedbackModel> {
    return this._http.put<FeedbackModel>(
      'https://getmedist.com/public/api/feedback',
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
      .delete(`https://getmedist.com/public/api/feedback/${id}`, {
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

  get(): Observable<{ data: FeedbackModel[] }> {
    return this._http.get<{ data: FeedbackModel[] }>(
      'https://getmedist.com/public/api/feedback'
    );
  }
}
