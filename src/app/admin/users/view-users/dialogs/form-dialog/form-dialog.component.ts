import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

import { ServiceService } from '../../service.service';
import { UserModel } from '../../user-model';
import { AuthService } from '@core';

export interface DialogData {
  id: number;
  action: string;
  doctors: UserModel;
}

@Component({
  selector: 'app-form-dialog:not(f)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  doctorsForm: UntypedFormGroup;
  doctors: UserModel;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: AuthService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.first_name;
      this.doctors = data.doctors;
    } else {
      this.dialogTitle = 'New User';
      const blankObject = {} as UserModel;
      this.doctors = new UserModel(blankObject);
    }
    this.doctorsForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      id: [this.doctors.id, [Validators.required]],
      first_name: [this.doctors.first_name, [Validators.required]],
      last_name: [this.doctors.last_name, [Validators.required]],
      mobile: [this.doctors.mobile, [Validators.required]],
      whatsApp: [this.doctors.whatsApp, [Validators.required]],
    });
  }
  submit() {
    console.log('Form Value', this.doctorsForm.value);
    if (this.doctorsForm.valid) {
      this.updateDoctor(this.doctorsForm.value);
    } else {
      console.log('enter valid data');
    }
  }

  updateDoctor(body: UserModel) {
    return this._doctorService.updateUser(body).subscribe({
      next: (data) => {
        console.log(data);
        this._doctorService.showNotification(
          'black',
          'Updated Successfully...!!!',
          'bottom',
          'center'
        );
      },
      error: (err) => {
        console.error(err);
        this._doctorService.showNotification(
          'snackbar-danger',
          `Something Wrong Happened ${err} ...!!!`,
          'bottom',
          'center'
        );
      },
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    // this.submit();
    this.serviceService.addDoctors(this.doctorsForm.getRawValue());
  }
}
