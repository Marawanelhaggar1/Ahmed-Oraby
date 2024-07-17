import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Area } from '@core/models/area';
import { AreaService } from '@core/service/area.service';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss'],
})
export class AddAreaComponent {
  areaForm: UntypedFormGroup;
  hide3 = true;
  // file!: File;
  agree3 = false;
  constructor(
    private fb: UntypedFormBuilder,
    private _areaService: AreaService
  ) {
    this.areaForm = this.fb.group({
      nameEn: ['Cairo', [Validators.required]],
      nameAr: ['القاهرة', [Validators.required]],
    });
  }
  onSubmit() {
    // console.log('Form Value', this.areaForm.value);
    if (this.areaForm.valid) {
      // const formData = new FormData();
      // console.log('Before appending:', formData);
      // formData.append('nameEn', this.areaForm.value.nameEn);
      // formData.append('nameAr', this.areaForm.value.nameAr);
      // console.log('after appending', formData);
      this.createArea(this.areaForm.value);
    } else {
      console.log('enter valid data');
    }
  }

  createArea(body: Area) {
    // console.log(this.areaForm.value);

    return this._areaService.post(body).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error('Error' + err);
      },
    });
  }
}
