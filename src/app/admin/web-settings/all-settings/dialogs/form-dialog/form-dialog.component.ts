import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
// import { HttpErrorResponse } from '@angular/common/http';

import { ServiceService } from '../../service.service';
import { SettingWebModel } from '../../setting-model';
import { SettingService } from '@core/service/setting.service';
// import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  doctors: SettingWebModel;
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
  doctors: SettingWebModel;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public doctorsService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: SettingService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.name;
      this.doctors = data.doctors;
      this.doctorsForm = this.createEditForm();
    } else {
      this.dialogTitle = 'New Web Setting';
      const blankObject = {} as SettingWebModel;
      this.doctors = new SettingWebModel(blankObject);
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
      name: [this.doctors.name, [Validators.required]],
      nameAr: [this.doctors.nameAr, [Validators.required]],
      email: [this.doctors.email, [Validators.required]],
      address: [this.doctors.address, [Validators.required]],
      addressAr: [this.doctors.addressAr, [Validators.required]],
      phone: [this.doctors.phone, [Validators.required]],
      phoneAr: [this.doctors.phoneAr, [Validators.required]],
      whatsApp: [this.doctors.whatsApp, [Validators.required]],
      facebook: [this.doctors.facebook, [Validators.required]],
      instagram: [this.doctors.instagram, [Validators.required]],
      linkedin: [this.doctors.linkedin, [Validators.required]],
      youtube: [this.doctors.youtube, [Validators.required]],
      whatsAppLink: [this.doctors.whatsAppLink, [Validators.required]],
      location: [this.doctors.location, [Validators.required]],
      snapchat: [this.doctors.snapchat, [Validators.required]],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      // id: [this.doctors.id, [Validators.required]],
      name: ['', [Validators.required]],
      nameAr: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      addressAr: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      phoneAr: ['', [Validators.required]],
      whatsApp: [''],
      facebook: [''],
      instagram: [''],
      linkedin: [''],
      favicon: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      footerLogo: ['', [Validators.required]],
      youtube: [''],
      whatsAppLink: [''],
      location: [''],
      snapchat: [''],
    });
  }
  submit() {
    console.log('Form Value', this.doctorsForm.value);
    if (this.doctorsForm.valid) {
      if (this.action === 'edit') {
        this.updateDoctor(this.doctorsForm.value);
      } else {
        const file = this.doctorsForm.get('logo')?.value;
        const file2 = this.doctorsForm.get('footerLogo')?.value;
        const file3 = this.doctorsForm.get('favicon')?.value;
        // console.log(file);
        const formData = new FormData();
        console.log('Before appending:', formData);
        formData.append('name', this.doctorsForm.value.name);
        formData.append('nameAr', this.doctorsForm.value.nameAr);

        formData.append('address', this.doctorsForm.value.address);
        formData.append('addressAr', this.doctorsForm.value.addressAr);
        formData.append('whatsApp', this.doctorsForm.value.whatsApp);
        formData.append('email', this.doctorsForm.value.email);

        formData.append('phone', this.doctorsForm.value.phone);
        formData.append('phoneAr', this.doctorsForm.value.phoneAr);
        formData.append('facebook', this.doctorsForm.value.facebook);
        formData.append('instagram', this.doctorsForm.value.instagram);
        formData.append('whatsAppLink', this.doctorsForm.value.whatsAppLink);
        formData.append('location', this.doctorsForm.value.location);
        formData.append('youtube', this.doctorsForm.value.youtube);
        formData.append('snapchat', this.doctorsForm.value.snapchat);
        formData.append('linkedin', this.doctorsForm.value.linkedin);
        formData.append('logo', file);
        formData.append('favicon', file3);
        formData.append('footerLogo', file2);
        console.log('after appending', formData);

        this.createDoctor(formData);
      }
    } else {
      console.log('enter valid data');
    }
  }

  updateDoctor(body: SettingWebModel) {
    return this._doctorService.updateWebSettings(body).subscribe({
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
    return this._doctorService.createWebSettings(body).subscribe({
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
    this.doctorsService.addDoctors(this.doctorsForm.getRawValue());
  }
}
