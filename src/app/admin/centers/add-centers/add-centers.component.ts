import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
// import { Center } from '@core/models/center';
import { CenterService } from '@core/service/center.service';
@Component({
  selector: 'app-add-centers',
  templateUrl: './add-centers.component.html',
  styleUrls: ['./add-centers.component.scss'],
})
export class AddCentersComponent {
  cenForm: UntypedFormGroup;
  hide3 = true;
  // file!: File;
  agree3 = false;
  constructor(
    private fb: UntypedFormBuilder,
    private _centerService: CenterService
  ) {
    this.cenForm = this.fb.group({
      nameEn: ['ABC', [Validators.required]],
      nameAr: ['أيه بي سي'],
      address: ['cairo egypt', [Validators.required]],
      addressAr: ['القاهرة مصر', [Validators.required]],
      description1: [
        'ABC provides state of the art comprehensive multidisciplinary cancer care focusing on early detection, prevention & cancer treatment',
        [Validators.required],
      ],
      description1Ar: [
        'توفر ABC أحدث رعاية شاملة ومتعددة التخصصات لمرضى السرطان مع التركيز على الكشف المبكر والوقاية وعلاج السرطان',
        [Validators.required],
      ],
      area_id: ['1', [Validators.required]],
      description2: [
        'ABC provides state of the art comprehensive multidisciplinary cancer care focusing on early detection, prevention & cancer treatment ',
      ],
      description2Ar: [
        'توفر ABC أحدث رعاية شاملة ومتعددة التخصصات لمرضى السرطان مع التركيز على الكشف المبكر والوقاية وعلاج السرطان',
      ],
      phone: ['01016563039', [Validators.required]],
      whatsApp: ['dcsdscdscds', [Validators.required]],
      scan: [1, [Validators.required]],
      lab: [1, [Validators.required]],
      image: ['', [Validators.required]],
    });
  }
  onSubmit() {
    // console.log('Form Value', this.cenForm.value);
    if (this.cenForm.valid) {
      const file = this.cenForm.get('image')?.value;
      console.log(file);
      const formData = new FormData();
      console.log('Before appending:', formData);
      formData.append('nameEn', this.cenForm.value.nameEn);
      formData.append('nameAr', this.cenForm.value.nameAr);
      formData.append('address', this.cenForm.value.address);
      formData.append('addressAr', this.cenForm.value.addressAr);
      formData.append('description1', this.cenForm.value.description1);
      formData.append('description1Ar', this.cenForm.value.description1Ar);
      formData.append('description2', this.cenForm.value.description2);
      formData.append('description2Ar', this.cenForm.value.description2Ar);
      formData.append('scan', this.cenForm.value.scan);
      formData.append('lab', this.cenForm.value.lab);
      formData.append('area_id', this.cenForm.value.area_id);
      formData.append('phone', this.cenForm.value.phone);
      formData.append('whatsApp', this.cenForm.value.whatsApp);
      formData.append('image', file);
      console.log('after appending', formData);
      this.createCenter(formData);
    } else {
      console.log('enter valid data');
    }
  }

  createCenter(body: FormData) {
    // console.log(this.cenForm.value);

    return this._centerService.postCenter(body).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error('Error' + err);
      },
    });
  }
}
