import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SpecialtyService } from '@core/service/specialty.service';
@Component({
  selector: 'app-add-specialty',
  templateUrl: './add-specialty.component.html',
  styleUrls: ['./add-specialty.component.scss'],
})
export class AddSpecialtyComponent {
  specialtyForm: UntypedFormGroup;
  hide3 = true;
  // file!: File;
  agree3 = false;
  constructor(
    private fb: UntypedFormBuilder,
    private _specialtyService: SpecialtyService
  ) {
    this.specialtyForm = this.fb.group({
      specialtyEn: ['Cardiology', [Validators.required]],
      specialtyAr: ['القلب', [Validators.required]],
      icon: ['', [Validators.required]],
      image: [],
    });
  }
  onSubmit() {
    // console.log('Form Value', this.specialtyForm.value);
    if (this.specialtyForm.valid) {
      const file = this.specialtyForm.get('image')?.value;
      const formData = new FormData();
      // console.log('Before appending:', formData);
      formData.append('specialtyEn', this.specialtyForm.value.specialtyEn);
      formData.append('specialtyAr', this.specialtyForm.value.specialtyAr);
      formData.append('icon', this.specialtyForm.value.icon);
      formData.append('image', file);
      // console.log('after appending', formData);
      this.createArea(formData);
    } else {
      console.log('enter valid data');
    }
  }

  createArea(body: any) {
    // console.log(this.specialtyForm.value);

    return this._specialtyService.post(body).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error('Error' + err);
      },
    });
  }
}
