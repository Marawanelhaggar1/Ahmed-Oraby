import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

import { ServiceService } from '../../service.service';
// import { Center } from '@core/models/center';
// import { ScheduleModel } from '../../areas';
// import { ScheduleService } from '@core/service/area.service';
import { ScheduleModel } from '../../schedule-model';
import { ScheduleService } from '@core/service/schedule.service';
import { DoctorService } from '@core/service/doctor.service';
// import { Doctor } from '@core/models/doctor';
import { Doctors } from 'app/admin/doctors/alldoctors/doctors.model';

export interface DialogData {
  id: number;
  action: string;
  doctors: ScheduleModel;
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
  doctors: ScheduleModel;
  doctor!: Doctors[];
  daysOfTheWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  daysOfTheWeekAr = [
    'الأحد',
    'الأثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعه',
    'السبت',
  ];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _scheduleService: ScheduleService,
    private _doctorService: DoctorService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.doctor.name;
      this.doctors = data.doctors;
      this.doctorsForm = this.createContactForm();
    } else {
      this.dialogTitle = 'New Doctor Schedule';
      const blankObject = {} as ScheduleModel;
      this.doctors = new ScheduleModel(blankObject);
      this.doctorsForm = this.createAddForm();
    }
    this.getDoctors();
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
      doctor_id: [this.doctors.doctor_id, [Validators.required]],
      date: [this.doctors.date, [Validators.required]],
      dateAr: [this.doctors.dateAr, [Validators.required]],
      start_time: [this.doctors.start_time, [Validators.required]],
      start_timeAr: [this.doctors.start_timeAr, [Validators.required]],
      end_time: [this.doctors.end_time, [Validators.required]],
      end_timeAr: [this.doctors.end_timeAr, [Validators.required]],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      doctor_id: [this.doctors.doctor_id, [Validators.required]],
      date: [this.doctors.date, [Validators.required]],
      dateAr: [this.doctors.dateAr, [Validators.required]],
      start_time: [this.doctors.start_time, [Validators.required]],
      start_timeAr: [this.doctors.start_timeAr, [Validators.required]],
      end_time: [this.doctors.end_time, [Validators.required]],
      end_timeAr: [this.doctors.end_timeAr, [Validators.required]],
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

  updateDoctor(body: ScheduleModel) {
    return this._scheduleService.updateCenter(body).subscribe({
      next: (data) => {
        console.log(data);
        this._scheduleService.showNotification(
          'black',
          'Updated Successfully...!!!',
          'bottom',
          'center'
        );
      },
      error: (err) => {
        console.error(err);
        this._scheduleService.showNotification(
          'snackbar-danger',
          `Something Wrong Happened ${err} ...!!!`,
          'bottom',
          'center'
        );
      },
    });
  }

  createDoctor(body: ScheduleModel) {
    return this._scheduleService.post(body).subscribe({
      next: (data) => {
        console.log(data);
        this._scheduleService.showNotification(
          'snackbar-success',
          'Added Successfully...!!!',
          'bottom',
          'center'
        );
      },
      error: (err) => {
        console.error(err);
        this._scheduleService.showNotification(
          'snackbar-danger',
          `Something Wrong Happened ${err} ...!!!`,
          'bottom',
          'center'
        );
      },
    });
  }

  getDoctors() {
    return this._doctorService.get().subscribe({
      next: (data) => {
        console.log(data);
        this.doctor = data.data;
      },
      error: (err) => {
        console.error('Error' + err);
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
