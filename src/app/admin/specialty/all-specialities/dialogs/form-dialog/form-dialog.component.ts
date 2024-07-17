import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

import { ServiceService } from '../../service.service';
import { SpecialtyModel } from '../../specialty-model';
import { SpecialtyService } from '@core/service/specialty.service';
import { Specialty } from '@core/models/specialty';
// import { SpecialtyModel } from '../../areas';
// import { AreaService } from '@core/service/area.service';

export interface DialogData {
  id: number;
  action: string;
  doctors: SpecialtyModel;
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
  doctors: SpecialtyModel;
  icons?: { id: number; image: string }[];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: SpecialtyService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.specialtyEn;
      this.doctors = data.doctors;
      this.doctorsForm = this.createContactForm();
    } else {
      this.dialogTitle = 'New Specialty';
      const blankObject = {} as SpecialtyModel;
      this.doctors = new SpecialtyModel(blankObject);
      this.doctorsForm = this.createAddForm();
    }

    this.getIcons();
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
      specialtyEn: [this.doctors.specialtyEn, [Validators.required]],
      specialtyAr: [this.doctors.specialtyAr, [Validators.required]],
      view: [this.doctors.view, [Validators.required]],
      icon: [this.doctors.icon],
      image: [this.doctors.image_id, [Validators.required]],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      // id: [this.doctors.id, [Validators.required]],
      specialtyEn: [this.doctors.specialtyEn, [Validators.required]],
      specialtyAr: [this.doctors.specialtyAr, [Validators.required]],
      icon: [this.doctors.icon],
      view: [this.doctors.view, [Validators.required]],
      image: [this.doctors.image, [Validators.required]],
    });
  }
  submit() {
    console.log('Form Value', this.doctorsForm.value);
    if (this.doctorsForm.valid) {
      if (this.action == 'edit') {
        this.updateDoctor(this.doctorsForm.value);
      } else {
        this.createSpecialty(this.doctorsForm.value);
      }
    } else {
      console.log('enter valid data');
    }
  }

  createSpecialty(body: Specialty) {
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

  updateDoctor(body: SpecialtyModel) {
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

  getIcons() {
    return this._doctorService.getIcons().subscribe({
      next: (data) => {
        console.log(data);
        this.icons = data.data;
      },
      error: (err) => {
        console.error(err);
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
