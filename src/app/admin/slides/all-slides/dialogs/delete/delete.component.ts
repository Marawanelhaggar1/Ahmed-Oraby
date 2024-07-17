import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SlidesModel } from '../../slides-model';
import { SlidesService } from '@core/service/slides.service';
// import { SpecialtyModel } from '../../specialty-model';
// import { SpecialtyService } from '@core/service/specialty.service';
// import { DoctorsService } from '../../doctors.service';
// import { CenterModel } from '../../center-model';
// import { CenterService } from '@core/service/center.service';
// import { SpecialtyModel } from '../../areas';
// import { ServiceService } from '../../service.service';
// import { AreaService } from '@core/service/area.service';

export interface DialogData {
  id: number;
  name: string;
  department: string;
  mobile: string;
}

@Component({
  selector: 'app-delete:not(f)',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SlidesModel,
    public _centerService: SlidesService
  ) {
    console.log(data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this._centerService.deleteCenters(this.data.id);
  }
}
