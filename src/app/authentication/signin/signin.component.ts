import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthService, Role } from '@core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private _cookieService: CookieService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('email')?.setValue('');
    this.authForm.get('password')?.setValue('');
  }
  // doctorSet() {
  //   this.authForm.get('username')?.setValue('doctor@hospital.org');
  //   this.authForm.get('password')?.setValue('doctor@123');
  // }
  // patientSet() {
  //   this.authForm.get('username')?.setValue('patient@hospital.org');
  //   this.authForm.get('password')?.setValue('patient@123');
  // }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.subs.sink = this.authService.login(this.authForm.value).subscribe({
        next: (res) => {
          console.log(this.authForm.value);
          if (res) {
            this._cookieService.set('user', JSON.stringify(res));
            // console.log(res);
            this.authService.get().subscribe((user) => {
              // console.log(user);
              localStorage.setItem('currentUser', JSON.stringify(user));
            });
            setTimeout(() => {
              const role = this.authService.currentUserValue.role;
              console.log(role);
              if (role === Role.All || role === Role.Admin) {
                this.router.navigate(['/admin/dashboard/main']);
                // } else if (role === Role.Doctor) {
                //   this.router.navigate(['/doctor/dashboard']);
                // } else if (role === Role.Patient) {
                //   this.router.navigate(['/patient/dashboard']);
                // }
              } else {
                this.router.navigate(['/authentication/signin']);
              }
              this.loading = false;
            }, 1000);
          } else {
            this.error = 'Invalid Login';
          }
        },
        error: (error) => {
          console.log('Error:', error);

          // console.log(this.f['email'].value, this.f['password'].value);

          this.error = error;
          this.submitted = false;
          this.loading = false;
        },
      });
    }
  }
}
