import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

import { ServiceService } from '../../service.service';
import { SlidesModel } from '../../slides-model';
import { SlidesService } from '@core/service/slides.service';
// import { SlidesModel } from '../../specialty-model';
// import { SlidesModel } from '@core/service/specialty.service';
// import { SlidesModel } from '../../areas';
// import { AreaService } from '@core/service/area.service';

export interface DialogData {
  id: number;
  action: string;
  doctors: SlidesModel;
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
  doctors: SlidesModel;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: SlidesService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.sub_title;
      this.doctors = data.doctors;
      this.doctorsForm = this.createEditForm();
    } else {
      this.dialogTitle = 'New Slide';
      const blankObject = {} as SlidesModel;
      this.doctors = new SlidesModel(blankObject);
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
      sub_title: [this.doctors.sub_title],
      sub_titleAr: [this.doctors.sub_titleAr],
      description: [this.doctors.description],
      descriptionAr: [this.doctors.descriptionAr],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      title: ['', [Validators.required]],
      titleAr: ['', [Validators.required]],
      sub_title: [''],
      sub_titleAr: [''],
      description: [''],
      descriptionAr: [''],
      image: ['', [Validators.required]],
      imageAr: ['', [Validators.required]],
    });
  }
  submit() {
    console.log('Form Value', this.doctorsForm.value);
    if (this.doctorsForm.valid) {
      if (this.action === 'edit') {
        this.updateDoctor(this.doctorsForm.value);
      } else {
        const file = this.doctorsForm.get('image')?.value;
        const file2 = this.doctorsForm.get('imageAr')?.value;
        const formData = new FormData();
        // console.log('Before appending:', formData);
        formData.append('title', this.doctorsForm.value.title);
        formData.append('titleAr', this.doctorsForm.value.titleAr);
        formData.append('sub_title', this.doctorsForm.value.sub_title);
        formData.append('sub_titleAr', this.doctorsForm.value.sub_titleAr);
        formData.append('description', this.doctorsForm.value.description);
        formData.append('descriptionAr', this.doctorsForm.value.descriptionAr);
        formData.append('image', file);
        formData.append('imageAr', file2);
        // console.log('after appending', formData);
        this.createSlide(formData);
      }
    } else {
      console.log('enter valid data');
    }
  }

  updateDoctor(body: SlidesModel) {
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
