import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DoctorsService } from '../../doctors.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Doctors } from '../../doctors.model';
import { DoctorService } from '@core/service/doctor.service';
import { Doctor } from '@core/models/doctor';
import { HttpErrorResponse } from '@angular/common/http';
import { SpecialtyService } from '@core/service/specialty.service';
import { CenterService } from '@core/service/center.service';
import { Specialty } from '@core/models/specialty';
import { Center } from '@core/models/center';
// import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  doctors: Doctors;
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
  doctors: Doctors;
  specialties!: Specialty[];
  centers!: Center[];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public doctorsService: DoctorsService,
    private fb: UntypedFormBuilder,
    private _doctorService: DoctorService,
    private _specialtyService: SpecialtyService,
    private _centerService: CenterService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.name;
      this.doctors = data.doctors;
      this.doctorsForm = this.createEditForm();
    } else {
      this.dialogTitle = 'New Doctors';
      const blankObject = {} as Doctors;
      this.doctors = new Doctors(blankObject);
      this.doctorsForm = this.createAddForm();
    }

    this.getCenters();
    this.getSpecialty();
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
    // const selectedCenterIds = this.doctors.health_center.map((doc) => doc.id);
    // const selectedHealthCenters = this.centers.filter((cen) =>
    //   selectedCenterIds.includes(cen.id)
    // );
    // console.log(selectedHealthCenters);
    return this.fb.group({
      id: [this.doctors.id, [Validators.required]],
      nameEn: [this.doctors.name, [Validators.required]],
      nameAr: [this.doctors.nameAr, [Validators.required]],
      titleEn: [this.doctors.title, [Validators.required]],
      titleAr: [this.doctors.titleAr, [Validators.required]],
      addressEn: [this.doctors.address, [Validators.required]],
      addressAr: [this.doctors.addressAr, [Validators.required]],
      // health_center_id: [selectedCenterIds, [Validators.required]],
      specialization_id: [this.doctors.specialty.id, [Validators.required]],
      feeEn: [this.doctors.fee],
      feeAr: [this.doctors.feeAr],
      waiting: [this.doctors.waiting, [Validators.required]],
      view: [this.doctors.view, [Validators.required]],
      appointment: [this.doctors.appointment, [Validators.required]],
      featured: [this.doctors.featured, [Validators.required]],
      // image: [, [Validators.required]],
    });
  }

  createAddForm(): UntypedFormGroup {
    console.log(this.doctors);

    return this.fb.group({
      // id: [this.doctors.id, [Validators.required]],
      nameEn: ['', [Validators.required]],
      nameAr: ['', [Validators.required]],
      titleEn: ['', [Validators.required]],
      titleAr: ['', [Validators.required]],
      addressEn: ['', [Validators.required]],
      addressAr: ['', [Validators.required]],
      appointment: ['', [Validators.required]],
      featured: ['', [Validators.required]],
      // health_center_id: [[], [Validators.required]],
      specialization_id: ['', [Validators.required]],
      view: ['', [Validators.required]],
      feeEn: [''],
      feeAr: [''],
      waiting: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }
  submit() {
    console.log('Form Value', this.doctorsForm.value);

    if (this.doctorsForm.valid) {
      if (this.action === 'edit') {
        console.log();
        this.updateDoctor(this.doctorsForm.value);
      } else {
        const file = this.doctorsForm.get('image')?.value;
        console.log(file);
        const formData = new FormData();
        console.log('Before appending:', formData);
        formData.append('id', this.doctorsForm.value.id);
        formData.append('nameEn', this.doctorsForm.value.nameEn);
        formData.append('nameAr', this.doctorsForm.value.nameAr);
        formData.append('titleEn', this.doctorsForm.value.titleEn);
        formData.append('titleAr', this.doctorsForm.value.titleAr);
        formData.append('ratingEn', '5');
        formData.append('ratingAr', '5');
        formData.append('addressEn', this.doctorsForm.value.addressEn);
        formData.append('addressAr', this.doctorsForm.value.addressAr);
        formData.append('featured', this.doctorsForm.value.featured);
        formData.append('view', this.doctorsForm.value.view);
        formData.append('appointment', this.doctorsForm.value.appointment);
        // this.doctorsForm.value.health_center_id.forEach((element: any) => {
        //   formData.append('health_center_id[]', element);
        // });
        formData.append(
          'specialization_id',
          this.doctorsForm.value.specialization_id
        );
        formData.append('feeEn', this.doctorsForm.value.feeEn);
        formData.append('feeAr', this.doctorsForm.value.feeAr);
        formData.append('waiting', this.doctorsForm.value.waiting);
        formData.append('image', file);
        console.log('after appending', formData);

        this.createDoctor(formData);
      }
    } else {
      console.log('enter valid data');
    }
  }

  updateDoctor(body: Doctor) {
    return this._doctorService.updateDoctor(body).subscribe({
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
    return this._doctorService.postDoctor(body).subscribe({
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

  getSpecialty() {
    return this._specialtyService.get().subscribe({
      next: (data) => {
        console.log(data);
        this.specialties = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error' + err);
      },
    });
  }

  // areaSelected(id: any): boolean {
  //   if (this.action == 'edit') {
  //     return;
  //   } else {
  //     return false;
  //   }
  // }

  getCenters() {
    return this._centerService.get().subscribe({
      next: (data) => {
        console.log(data);
        this.centers = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error' + err);
      },
    });
  }
}
