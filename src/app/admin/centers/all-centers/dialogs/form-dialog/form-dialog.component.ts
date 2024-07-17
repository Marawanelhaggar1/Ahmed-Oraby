import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
// import { DoctorsService } from '../../doctors.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
// import { DoctorService } from '@core/service/doctor.service';
// import { Doctor } from '@core/models/doctor';
import { ServiceService } from '../../service.service';
import { CenterService } from '@core/service/center.service';
import { Center } from '@core/models/center';
import { CenterModel } from '../../center-model';
import { AreaService } from '@core/service/area.service';
import { Area } from '@core/models/area';
// import { Subscription } from 'rxjs';
// import { formatDate } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  doctors: CenterModel;
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
  doctors: CenterModel;
  area?: Area[];
  // areaIdSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public serviceService: ServiceService,
    private fb: UntypedFormBuilder,
    private _doctorService: CenterService,
    private _areaService: AreaService
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.doctors.name;
      this.doctors = data.doctors;
      this.doctorsForm = this.createContactForm();
    } else {
      this.dialogTitle = 'New Center';
      const blankObject = {} as CenterModel;
      this.doctors = new CenterModel(blankObject);
      this.doctorsForm = this.createAddForm();
    }

    this.getAreas();
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
    console.log(this.doctors.areas);
    return this.fb.group({
      id: [this.doctors.id, [Validators.required]],
      nameEn: [this.doctors.name, [Validators.required]],
      nameAr: [this.doctors.nameAr, [Validators.required]],
      whatsApp: [this.doctors.whatsApp, [Validators.required]],
      phone: [this.doctors.phone, [Validators.required]],
      address: [this.doctors.address, [Validators.required]],
      addressAr: [this.doctors.addressAr, [Validators.required]],
      // health_center_id: [this.doctors.area.id, [Validators.required]],
      lab: [this.doctors.lab, [Validators.required]],
      scan: [this.doctors.scan, [Validators.required]],
      area_id: [[], [Validators.required]],
      description1: [this.doctors.description, [Validators.required]],
      description1Ar: [this.doctors.descriptionAr, [Validators.required]],
      description2: [this.doctors.description2, [Validators.required]],
      description2Ar: [this.doctors.description2Ar, [Validators.required]],
      view: [this.doctors.view, [Validators.required]],
      // image: [, [Validators.required]],
    });
  }

  createAddForm(): UntypedFormGroup {
    // console.log(this.doctors.name);
    // console.log(this.doctors);

    return this.fb.group({
      id: [this.doctors.id, [Validators.required]],
      nameEn: [this.doctors.name, [Validators.required]],
      nameAr: [this.doctors.nameAr, [Validators.required]],
      whatsApp: [this.doctors.whatsApp, [Validators.required]],
      phone: [this.doctors.phone, [Validators.required]],
      address: [this.doctors.address, [Validators.required]],
      addressAr: [this.doctors.addressAr, [Validators.required]],
      // health_center_id: [this.doctors.area.id, [Validators.required]],
      lab: [this.doctors.lab, [Validators.required]],
      scan: [this.doctors.scan, [Validators.required]],
      area_id: [[], [Validators.required]],
      description1: [this.doctors.description1, [Validators.required]],
      description1Ar: [this.doctors.description1Ar, [Validators.required]],
      description2: [this.doctors.description2, [Validators.required]],
      description2Ar: [this.doctors.description2Ar, [Validators.required]],
      view: [this.doctors.view, [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  areaSelected(id: any): boolean {
    if (this.action == 'edit') {
      return this.doctors.areas.some((a) => a.id === id);
    } else {
      return false;
    }
  }

  submit() {
    console.log('Form Value', this.doctorsForm.value);
    console.log(this.doctorsForm.value.areas_id);

    if (this.doctorsForm.valid) {
      if (this.action === 'edit') {
        this.updateDoctor(this.doctorsForm.value);
      } else {
        const file = this.doctorsForm.get('image')?.value;
        console.log(file);
        const formData = new FormData();
        console.log('Before appending:', formData);
        formData.append('nameEn', this.doctorsForm.value.nameEn);
        formData.append('nameAr', this.doctorsForm.value.nameAr);
        formData.append('address', this.doctorsForm.value.address);
        formData.append('addressAr', this.doctorsForm.value.addressAr);
        formData.append('description1', this.doctorsForm.value.description1);
        formData.append(
          'description1Ar',
          this.doctorsForm.value.description1Ar
        );
        formData.append('description2', this.doctorsForm.value.description2);
        formData.append(
          'description2Ar',
          this.doctorsForm.value.description2Ar
        );
        formData.append('scan', this.doctorsForm.value.scan);
        formData.append('lab', this.doctorsForm.value.lab);
        formData.append('view', this.doctorsForm.value.view);
        // const areaIds = ;
        this.doctorsForm.value.area_id.forEach((element: any) => {
          formData.append('area_id[]', element);
        });
        // formData.append('area_id[]', this.doctorsForm.value.area_id);

        formData.append('phone', this.doctorsForm.value.phone);
        formData.append('whatsApp', this.doctorsForm.value.whatsApp);
        formData.append('image', file);
        console.log('after appending', formData.get('area_id[]'));
        this.createCenter(formData);
      }
    } else {
      console.log('enter valid data');
    }
  }

  updateDoctor(body: Center) {
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

  createCenter(body: FormData) {
    // console.log(this.cenForm.value);

    return this._doctorService.postCenter(body).subscribe({
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

  getAreas() {
    return this._areaService.get().subscribe({
      next: (data) => {
        console.log(data);
        this.area = data.data;
      },
      error: (err) => {
        console.error('Error' + err);
      },
    });
  }
}
