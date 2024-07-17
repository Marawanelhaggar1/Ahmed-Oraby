import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

import { ServiceService } from '../../service.service';
import { BookingModel } from '../../booking-model';
import { BookingService } from '@core/service/booking.service';

export interface DialogData {
  id: number;
  action: string;
  doctors: BookingModel;
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
  doctors: BookingModel;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: BookingService
  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.patient_name;
      this.doctors = data.doctors;
    } else {
      this.dialogTitle = 'New Booking';
      const blankObject = {} as BookingModel;
      this.doctors = new BookingModel(blankObject);
    }
    this.doctorsForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [Validators.required]);
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
      patient_name: [this.doctors.patient_name],
      email: [this.doctors.email],
      phone: [this.doctors.phone],
      // health_center_id: [this.doctors.health_center.id],
      doctor_id: [this.doctors.doctor.id],
      status: [this.doctors.status],
      payment: [this.doctors.payment],
      location: [this.doctors.location],
      user_id: [this.doctors.user_id],
      date: [this.doctors.date],
      description: [this.doctors.description],
      booking_type: ['Clinic Visit'],
      time: [this.doctors.time],
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

  updateDoctor(body: BookingModel) {
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

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.submit();
    this.serviceService.addBookingModel(this.doctorsForm.getRawValue());
  }
}
