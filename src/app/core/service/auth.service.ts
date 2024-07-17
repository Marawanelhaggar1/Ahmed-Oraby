import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
// import { map } from 'rxjs/operators';
import { User } from '../models/user';
// import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from 'app/admin/users/view-users/user-model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject?: BehaviorSubject<User>;
  public currentUser?: Observable<User>;

  constructor(
    private _Http: HttpClient,
    private _Cookie: CookieService,
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
  // this.get().subscribe((data) => {
  //   console.log(data);
  // });

  public get currentUserValue(): User {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    return this.currentUserSubject.value;
  }

  // login(email: string, password: string) {
  //   return this._Http.post<any>(`${environment.apiUrl}auth/login`, {
  //     email,
  //     password,
  //   });
  // }

  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSubject.next(this.currentUserValue);
  //   return of({ success: false });
  // }

  get(): Observable<{ data: User }> {
    return this._Http.get<{ data: User }>(
      'https://hws1.axonbi.com/public/api/user',
      {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._Cookie.get('user')).data.token,
        },
      }
    );
  }

  login(body: any): Observable<User> {
    return this._Http.post<User>(
      'https://hws1.axonbi.com/public/api/auth/login',
      body
    );
  }

  updateUser(body: UserModel): Observable<UserModel> {
    const token = JSON.parse(this._Cookie.get('user'))?.data?.token || '';

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });

    return this._Http.put<UserModel>(
      'https://hws1.axonbi.com/public/api/auth/update/profile',
      body,
      { headers }
    );
  }

  deleteUser(id: number): void {
    console.log(id);

    this._Http
      .delete(`https://hws1.axonbi.com/public/api/doctors/${id}`, {
        headers: {
          Authorization:
            'Bearer ' + JSON.parse(this._Cookie.get('user')).data.token,
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

  logout() {
    return of({ success: false });
  }

  register(body: UserModel): Observable<UserModel> {
    return this._Http.post<UserModel>(
      'https://hws1.axonbi.com/public/api/auth/register',
      body
    );
  }

  // google(body: any): Observable<User> {
  //   return this._Http.post<User>(
  //     'https://hws1.axonbi.com/public/api/auth/google',
  //     body
  //   );
  // }
}
