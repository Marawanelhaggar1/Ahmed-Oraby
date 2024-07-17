import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

import { ServiceService } from '../../service.service';
import { Center } from '@core/models/center';
import { AreasModel } from '../../areas';
import { AreaService } from '@core/service/area.service';

export interface DialogData {
  id: number;
  action: string;
  doctors: AreasModel;
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
  doctors: AreasModel;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: AreaService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.nameEn;
      this.doctors = data.doctors;
      this.doctorsForm = this.createContactForm();
    } else {
      this.dialogTitle = 'New Area';
      const blankObject = {} as AreasModel;
      this.doctors = new AreasModel(blankObject);
      this.doctorsForm = this.createAddForm();
    }
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
    console.log(this.doctors.id);
    return this.fb.group({
      id: [this.doctors.id, [Validators.required]],
      nameEn: [this.doctors.nameEn, [Validators.required]],
      nameAr: [this.doctors.nameAr, [Validators.required]],
      view: [this.doctors.view, [Validators.required]],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      nameEn: ['', [Validators.required]],
      nameAr: ['', [Validators.required]],
      view: ['', [Validators.required]],
    });
  }
  submit() {
    console.log('Form Value', this.doctorsForm.value);
    if (this.doctorsForm.valid) {
      if (this.action === 'edit') {
        this.updateDoctor(this.doctorsForm.value);
      } else {
        this.createDoctor(this.doctorsForm.value);
      }
    } else {
      console.log('enter valid data');
    }
  }

  updateDoctor(body: Center) {
    return this._doctorService.updateCenter(body).subscribe({
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

  createDoctor(body: Center) {
    return this._doctorService.post(body).subscribe({
      next: (data) => {
        console.log(data);
        this._doctorService.showNotification(
          'snackbar-success',
          'Added Successfully...!!!',
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
    this.submit();
    this.serviceService.addDoctors(this.doctorsForm.getRawValue());
  }
}
