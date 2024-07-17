import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { ServicesService } from '@core/service/service.service';
import { ServiceService } from '../../service.service';
import { ServiceModel } from '../../service-model';

export interface DialogData {
  id: number;
  action: string;
  doctors: ServiceModel;
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
  doctors: ServiceModel;
  icons?: { id: number; image: string }[];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: ServicesService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.name;
      this.doctors = data.doctors;
      this.doctorsForm = this.createEditForm();
    } else {
      this.dialogTitle = 'New Service';
      const blankObject = {} as ServiceModel;
      this.doctors = new ServiceModel(blankObject);
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
  createEditForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      id: [this.doctors.id, [Validators.required]],
      nameEn: [this.doctors.name, [Validators.required]],
      nameAr: [this.doctors.nameAr, [Validators.required]],
      descriptionEn1: [this.doctors.description, [Validators.required]],
      descriptionAr1: [this.doctors.descriptionAr, [Validators.required]],
      descriptionEn2: [this.doctors.description2],
      descriptionAr2: [this.doctors.descriptionAr2],
      icon: [this.doctors.icon_id, [Validators.required]],
      featured: [this.doctors.featured, [Validators.required]],
      dental: [this.doctors.dental, [Validators.required]],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);
    return this.fb.group({
      nameEn: ['', [Validators.required]],
      nameAr: ['', [Validators.required]],
      image: [''],
      descriptionEn1: ['', [Validators.required]],
      descriptionAr1: ['', [Validators.required]],
      descriptionEn2: [''],
      descriptionAr2: [''],
      icon: ['', [Validators.required]],
      featured: ['', [Validators.required]],
      dental: ['', [Validators.required]],
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
        formData.append('nameEn', this.doctorsForm.value.nameEn);
        formData.append('nameAr', this.doctorsForm.value.nameAr);

        formData.append(
          'descriptionEn1',
          this.doctorsForm.value.descriptionEn1
        );
        formData.append(
          'descriptionAr1',
          this.doctorsForm.value.descriptionAr1
        );
        formData.append(
          'descriptionEn2',
          this.doctorsForm.value.descriptionEn2
        );
        formData.append(
          'descriptionAr2',
          this.doctorsForm.value.descriptionAr2
        );
        formData.append('icon', this.doctorsForm.value.icon);
        formData.append('featured', this.doctorsForm.value.featured);
        formData.append('dental', this.doctorsForm.value.dental);
        formData.append('image', file);
        // console.log('after appending', formData);
        this.createSlide(formData);
      }
    } else {
      console.log('enter valid data');
    }
  }

  updateDoctor(body: ServiceModel) {
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
