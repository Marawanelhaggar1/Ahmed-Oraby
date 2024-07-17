import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

import { ServiceService } from '../../service.service';
import { BlogsModel } from '@core/models/blogs-model';
import { BlogsService } from '@core/service/blogs.service';
import { Blogs } from '../../blogs';

export interface DialogData {
  id: number;
  action: string;
  doctors: BlogsModel;
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
  doctors: BlogsModel;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: BlogsService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.name;
      this.doctors = data.doctors;
      this.doctorsForm = this.createContactForm();
    } else {
      this.dialogTitle = 'New Blog';
      const blankObject = {} as Blogs;
      this.doctors = new Blogs(blankObject);
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
      name: [this.doctors.name, [Validators.required]],
      nameAr: [this.doctors.nameAr, [Validators.required]],
      title: [this.doctors.title, [Validators.required]],
      titleAr: [this.doctors.titleAr, [Validators.required]],
      body: [this.doctors.body, [Validators.required]],
      bodyAr: [this.doctors.bodyAr, [Validators.required]],
      isFeatured: [this.doctors.isFeatured, [Validators.required]],
      image: [''],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      name: ['', [Validators.required]],
      nameAr: ['', [Validators.required]],
      title: ['', [Validators.required]],
      titleAr: ['', [Validators.required]],
      body: ['', [Validators.required]],
      bodyAr: ['', [Validators.required]],
      isFeatured: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }
  submit() {
    console.log('Form Value', this.doctorsForm.value);
    if (this.doctorsForm.valid) {
      if (this.action === 'edit') {
        const file = this.doctorsForm.get('image')?.value;
        console.log(file);
        const formData = new FormData();
        console.log('Before appending:', formData);
        formData.append('id', this.doctorsForm.value.id);
        formData.append('name', this.doctorsForm.value.name);
        formData.append('nameAr', this.doctorsForm.value.nameAr);
        formData.append('title', this.doctorsForm.value.title);
        formData.append('titleAr', this.doctorsForm.value.titleAr);
        formData.append('body', this.doctorsForm.value.body);
        formData.append('bodyAr', this.doctorsForm.value.bodyAr);
        formData.append('isFeatured', this.doctorsForm.value.isFeatured);
        formData.append('image', file);
        formData.append('_method', 'PUT');
        this.updateDoctor(formData);
      } else {
        const file = this.doctorsForm.get('image')?.value;
        console.log(file);
        const formData = new FormData();
        console.log('Before appending:', formData);
        formData.append('name', this.doctorsForm.value.name);
        formData.append('nameAr', this.doctorsForm.value.nameAr);
        formData.append('title', this.doctorsForm.value.title);
        formData.append('titleAr', this.doctorsForm.value.titleAr);
        formData.append('body', this.doctorsForm.value.body);
        formData.append('bodyAr', this.doctorsForm.value.bodyAr);
        formData.append('isFeatured', this.doctorsForm.value.isFeatured);
        formData.append('image', file);
        this.createDoctor(formData);
      }
    } else {
      console.log('enter valid data');
    }
  }

  updateDoctor(body: FormData) {
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

  createDoctor(body: FormData) {
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
