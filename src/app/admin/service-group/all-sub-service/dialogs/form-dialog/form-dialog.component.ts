import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

import { ServiceService } from '../../service.service';
import { SubService } from '../../sub-service';
import { SubServiceService } from '@core/service/sub-service.service';
import { ServicesService } from '@core/service/service.service';
import { ServiceModel } from 'app/admin/service/all-service/service-model';

export interface DialogData {
  id: number;
  action: string;
  doctors: SubService;
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
  doctors: SubService;
  service?: ServiceModel[];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: SubServiceService,
    private _service: ServicesService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.nameEn;
      this.doctors = data.doctors;
      this.doctorsForm = this.createContactForm();
    } else {
      this.dialogTitle = 'New Sub-Service';
      const blankObject = {} as SubService;
      this.doctors = new SubService(blankObject);
      this.doctorsForm = this.createAddForm();
    }
    this.getService();
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
      nameEn: [this.doctors.name, [Validators.required]],
      nameAr: [this.doctors.nameAr, [Validators.required]],
      services_id: [this.doctors.services_id, [Validators.required]],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      nameEn: ['', [Validators.required]],
      nameAr: ['', [Validators.required]],
      services_id: ['', [Validators.required]],
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

  updateDoctor(body: SubService) {
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

  createDoctor(body: SubService) {
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

  getService() {
    return this._service.get().subscribe({
      next: (data) => {
        this.service = data.data;
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
