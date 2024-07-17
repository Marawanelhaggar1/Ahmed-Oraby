import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DoctorService } from '@core/service/doctor.service';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss'],
})
export class AddDoctorComponent {
  docForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  constructor(
    private fb: UntypedFormBuilder,
    private _doctorService: DoctorService
  ) {
    this.docForm = this.fb.group({
      nameEn: ['Omar Shrief Omar', [Validators.required]],
      nameAr: ['عمر شريف عمر', [Validators.required]],
      titleEn: ['dentist', [Validators.required]],
      titleAr: ['طبيب أسنان', [Validators.required]],
      addressEn: ['cairo egypt', [Validators.required]],
      addressAr: ['القاهرة مصر', [Validators.required]],
      health_center_id: ['1', [Validators.required]],
      specialization_id: ['2', [Validators.required]],
      feeEn: ['300', [Validators.required]],
      feeAr: ['300', [Validators.required]],
      waiting: ['10', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }
  onSubmit() {
    console.log('Form Value', this.docForm.value);
    if (this.docForm.valid) {
      const file = this.docForm.get('image')?.value;
      console.log(file);
      const formData = new FormData();
      console.log('Before appending:', formData);
      formData.append('nameEn', this.docForm.value.nameEn);
      formData.append('nameAr', this.docForm.value.nameAr);
      formData.append('titleEn', this.docForm.value.titleEn);
      formData.append('titleAr', this.docForm.value.titleAr);
      formData.append('ratingEn', '5');
      formData.append('ratingAr', '5');
      formData.append('addressEn', this.docForm.value.addressEn);
      formData.append('addressAr', this.docForm.value.addressAr);
      formData.append('health_center_id', this.docForm.value.health_center_id);
      formData.append(
        'specialization_id',
        this.docForm.value.specialization_id
      );
      formData.append('feeEn', this.docForm.value.feeEn);
      formData.append('feeAr', this.docForm.value.feeAr);
      formData.append('waiting', this.docForm.value.waiting);
      formData.append('image', file);
      console.log('after appending', formData);
      this.createDoctor(formData);
    } else {
      console.log('enter valid data');
    }
  }

  createDoctor(body: FormData) {
    return this._doctorService.postDoctor(body).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error' + err);
      },
    });
  }
}
