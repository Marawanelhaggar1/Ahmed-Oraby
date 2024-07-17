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
import { AboutModel } from '../../about-model';
import { AboutService } from '@core/service/about.service';
// import { AboutModel } from '../../areas';
// import { AreaService } from '@core/service/area.service';

export interface DialogData {
  id: number;
  action: string;
  doctors: AboutModel;
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
  doctors: AboutModel;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: AboutService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.title;
      this.doctors = data.doctors;
      this.doctorsForm = this.createContactForm();
    } else {
      this.dialogTitle = 'New About Us';
      const blankObject = {} as AboutModel;
      this.doctors = new AboutModel(blankObject);
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
      title: [this.doctors.title, [Validators.required]],
      titleAr: [this.doctors.titleAr, [Validators.required]],
      paragraph: [this.doctors.paragraph, [Validators.required]],
      paragraphAr: [this.doctors.paragraphAr, [Validators.required]],
      mission: [this.doctors.mission, [Validators.required]],
      missionAr: [this.doctors.missionAr, [Validators.required]],
      vision: [this.doctors.vision, [Validators.required]],
      visionAr: [this.doctors.visionAr, [Validators.required]],
      values: [this.doctors.values, [Validators.required]],
      valuesAr: [this.doctors.valuesAr, [Validators.required]],
      videoLink: [this.doctors.videoLink],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      title: ['', [Validators.required]],
      titleAr: ['', [Validators.required]],
      paragraph: ['', [Validators.required]],
      paragraphAr: ['', [Validators.required]],
      mission: ['', [Validators.required]],
      missionAr: ['', [Validators.required]],
      vision: ['', [Validators.required]],
      visionAr: ['', [Validators.required]],
      values: ['', [Validators.required]],
      valuesAr: ['', [Validators.required]],
      image: ['', [Validators.required]],
      videoLink: [''],
    });
  }
  submit() {
    console.log('Form Value', this.doctorsForm.value);
    if (this.doctorsForm.valid) {
      if (this.action === 'edit') {
        this.updateDoctor(this.doctorsForm.value);
      } else {
        const file = this.doctorsForm.get('image')?.value;
        console.log(file);
        const formData = new FormData();
        console.log('Before appending:', formData);
        formData.append('paragraph', this.doctorsForm.value.paragraph);
        formData.append('paragraphAr', this.doctorsForm.value.paragraphAr);
        formData.append('title', this.doctorsForm.value.title);
        formData.append('titleAr', this.doctorsForm.value.titleAr);

        formData.append('mission', this.doctorsForm.value.mission);
        formData.append('missionAr', this.doctorsForm.value.missionAr);
        formData.append('videoLink', this.doctorsForm.value.videoLink);

        formData.append('vision', this.doctorsForm.value.vision);
        formData.append('visionAr', this.doctorsForm.value.visionAr);

        formData.append('values', this.doctorsForm.value.values);
        formData.append('valuesAr', this.doctorsForm.value.valuesAr);
        formData.append('image', file);
        console.log('after appending', formData);

        this.createDoctor(formData);
      }
    } else {
      console.log('enter valid data');
    }
  }

  updateDoctor(body: AboutModel) {
    return this._doctorService.update(body).subscribe({
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
