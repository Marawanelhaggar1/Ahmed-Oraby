import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { ServiceService } from '../../service.service';
import { CareerModel } from '../../career-model';
import { CareerService } from '@core/service/career.service';
// import { CareerModel } from '../../promotion-model';
// import { CareerService } from '@core/service/promotion.service';

export interface DialogData {
  id: number;
  action: string;
  doctors: CareerModel;
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
  doctors: CareerModel;
  icons?: { id: number; image: string }[];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: CareerService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.name;
      this.doctors = data.doctors;
      this.doctorsForm = this.createEditForm();
    } else {
      this.dialogTitle = 'New Career';
      const blankObject = {} as CareerModel;
      this.doctors = new CareerModel(blankObject);
      this.doctorsForm = this.createAddForm();
    }
    // this.getIcons();
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
  createEditForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      id: [this.doctors.id, [Validators.required]],
      name: [this.doctors.name, [Validators.required]],
      email: [this.doctors.email, [Validators.required]],
      phone: [this.doctors.phone, [Validators.required]],
      job: [this.doctors.job, [Validators.required]],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      job: ['', [Validators.required]],
      cv: ['', [Validators.required]],
    });
  }
  submit() {
    console.log('Form Value', this.doctorsForm.value);
    if (this.doctorsForm.valid) {
      if (this.action === 'edit') {
        this.updateDoctor(this.doctorsForm.value);
      } else {
        const file = this.doctorsForm.get('job')?.value;
        const formData = new FormData();
        // console.log('Before appending:', formData);
        formData.append('name', this.doctorsForm.value.name);
        formData.append('email', this.doctorsForm.value.email);

        formData.append('job', this.doctorsForm.value.job);
        formData.append('phone', this.doctorsForm.value.phone);
        formData.append('cv', file);
        this.createSlide(formData);
      }
    } else {
      console.log('enter valid data');
    }
  }

  updateDoctor(body: CareerModel) {
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

  createSlide(body: FormData) {
    // console.log(this.slidesForm.value);

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
  // getIcons() {
  //   return this._doctorService.getIcons().subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.icons = data.data;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //   });
  // }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.submit();
    this.serviceService.addDoctors(this.doctorsForm.getRawValue());
  }
}
