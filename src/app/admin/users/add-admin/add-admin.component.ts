import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core';
import { UserModel } from '../view-users/user-model';
// import { Center } from '@core/models/center';
// import { CenterService } from '@core/service/center.service';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent {
  registerForm: UntypedFormGroup;
  hide3 = true;
  // file!: File;
  agree3 = false;
  constructor(
    private fb: UntypedFormBuilder,
    private _authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: [''],
      gender: ['', [Validators.required]],
      role: ['admin', [Validators.required]],
      mobile: ['', [Validators.required]],
      whatsApp: [''],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]],
    });
  }
  onSubmit() {
    // console.log('Form Value', this.registerForm.value);
    if (this.registerForm.valid) {
      this.createCenter(this.registerForm.value);
    } else {
      console.log('enter valid data');
    }
  }

  createCenter(body: UserModel) {
    // console.log(this.registerForm.value);

    return this._authService.register(body).subscribe({
      next: (data) => {
        console.log(data);
        this._authService.showNotification(
          'snackbar-success',
          'Added Successfully...!!!',
          'bottom',
          'center'
        );
      },
      error: (err) => {
        console.error(err);
        this._authService.showNotification(
          'snackbar-danger',
          `Something Wrong Happened ${err} ...!!!`,
          'bottom',
          'center'
        );
      },
    });
  }
}
