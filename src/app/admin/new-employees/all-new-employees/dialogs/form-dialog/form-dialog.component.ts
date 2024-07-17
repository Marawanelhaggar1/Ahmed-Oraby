import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { ServiceService } from '../../service.service';
import { NewEmployees } from '../../new-employees';
import { NewEmployeeService } from '@core/service/new-employee.service';

export interface DialogData {
  id: number;
  action: string;
  doctors: NewEmployees;
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
  doctors: NewEmployees;
  icons?: { id: number; image: string }[];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: NewEmployeeService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.title;
      this.doctors = data.doctors;
      this.doctorsForm = this.createEditForm();
    } else {
      this.dialogTitle = 'New Board Member';
      const blankObject = {} as NewEmployees;
      this.doctors = new NewEmployees(blankObject);
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
  createEditForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      id: [this.doctors.id, [Validators.required]],
      title: [this.doctors.title, [Validators.required]],
      titleAr: [this.doctors.titleAr, [Validators.required]],
      name: [this.doctors.name, [Validators.required]],
      nameAr: [this.doctors.nameAr, [Validators.required]],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      title: ['', [Validators.required]],
      titleAr: ['', [Validators.required]],
      image: ['', [Validators.required]],
      name: ['', [Validators.required]],
      nameAr: ['', [Validators.required]],
    });
  }
  submit() {
    console.log('Form Value', this.doctorsForm.value);
    if (this.doctorsForm.valid) {
      if (this.action === 'edit') {
        this.updateDoctor(this.doctorsForm.value);
      } else {
        const file = this.doctorsForm.get('image')?.value;
        const formData = new FormData();
        // console.log('Before appending:', formData);
        formData.append('title', this.doctorsForm.value.title);
        formData.append('titleAr', this.doctorsForm.value.titleAr);

        formData.append('name', this.doctorsForm.value.name);
        formData.append('nameAr', this.doctorsForm.value.nameAr);
        formData.append('image', file);
        this.createSlide(formData);
      }
    } else {
      console.log('enter valid data');
    }
  }

  updateDoctor(body: NewEmployees) {
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

  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.submit();
    this.serviceService.addDoctors(this.doctorsForm.getRawValue());
  }
}
