import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SlidesService } from '@core/service/slides.service';
@Component({
  selector: 'app-add-slides',
  templateUrl: './add-slides.component.html',
  styleUrls: ['./add-slides.component.scss'],
})
export class AddSlidesComponent {
  slidesForm: UntypedFormGroup;
  hide3 = true;
  // file!: File;
  agree3 = false;
  constructor(
    private fb: UntypedFormBuilder,
    private _slideService: SlidesService
  ) {
    this.slidesForm = this.fb.group({
      title: ['', [Validators.required]],
      titleAr: ['', [Validators.required]],
      sub_title: ['  ', [Validators.required]],
      sub_titleAr: ['  ', [Validators.required]],
      description: ['', [Validators.required]],
      descriptionAr: [' ', [Validators.required]],
      image: ['', [Validators.required]],
      imageAr: ['', [Validators.required]],
    });
  }
  onSubmit() {
    // console.log('Form Value', this.slidesForm.value);
    if (this.slidesForm.valid) {
      const file = this.slidesForm.get('image')?.value;
      const file2 = this.slidesForm.get('imageAr')?.value;
      const formData = new FormData();
      // console.log('Before appending:', formData);
      formData.append('title', this.slidesForm.value.title);
      formData.append('titleAr', this.slidesForm.value.titleAr);
      formData.append('sub_title', this.slidesForm.value.sub_title);
      formData.append('sub_titleAr', this.slidesForm.value.sub_titleAr);
      formData.append('description', this.slidesForm.value.description);
      formData.append('descriptionAr', this.slidesForm.value.descriptionAr);
      formData.append('image', file);
      formData.append('imageAr', file2);
      // console.log('after appending', formData);
      this.createArea(formData);
    } else {
      console.log('enter valid data');
    }
  }

  createArea(body: FormData) {
    // console.log(this.slidesForm.value);

    return this._slideService.post(body).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error('Error' + err);
      },
    });
  }
}
