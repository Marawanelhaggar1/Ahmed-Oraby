import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
// import { DoctorsService } from '../../doctors.service';
// import { CenterModel } from '../../center-model';
// import { CenterService } from '@core/service/center.service';
import { AreasModel } from '../../areas';
// import { ServiceService } from '../../service.service';
import { AreaService } from '@core/service/area.service';

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
  length?: number;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AreasModel,
    public _centerService: AreaService
  ) {
    console.log(data);
    this.centerArea(this.data.id);
  }

  centerArea(id: number) {
    return this._centerService.getCentersByArea(id).subscribe({
      next: (data) => {
        console.log(data.data.length);
        this.length = data.data.length;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this._centerService.deleteCenters(this.data.id);
  }
}
